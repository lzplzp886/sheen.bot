// src/app/api/payfast/notify/route.ts
// Ensure Node runtime & no caching for ITN
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import crypto from "crypto";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  UpdateCommand,
  type GetCommandOutput,
} from "@aws-sdk/lib-dynamodb";

/** ====== ENV & Clients ====== */
const ddb = new DynamoDBClient({});
const PAY_TABLE = process.env.DDB_PAYMENTS_TABLE!;
const STASH_TABLE = process.env.DDB_PAYFAST_STASH_TABLE!;
const APP_BASE_URL =
  process.env.NEXT_PAYFAST_BASE_URL || "https://www.sheen.bot";
const PASS_PHRASE = process.env.NEXT_PAYFAST_PASSPHRASE || "";

/** ====== Type helpers (no `any`) ====== */
function isObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object";
}

type PfMap = Record<string, string>;

type PaymentRecord = {
  paymentId: string;
  status?: string;
  meta?: unknown;
  callbackPath?: string;
  updatedAt?: string;
};

type StashItem = {
  stashId: string;
  value?: unknown;
};

type NotifyDebug = {
  rid: string;
  timestamp: string;
  parsedKeys?: string[];   // from structured parsing (URLSearchParams)
  includedKeys?: string[]; // actually used for signature, in original raw order
  m_payment_id?: string | null;
  payment_status?: string | null;
  signature?: {
    posted: string;
    matchTag: string | null; // e.g., "orig-noPass+plus" | "sorted-withPass%20"
  };
  statusBefore?: string | null;
  pfStatus?: string;
  statusUpdated?: boolean;
  callbackUrl?: string;
  callbackOk?: boolean;
  callbackStatus?: number | null;
};

/** ====== DB helpers ====== */
async function getPayment(paymentId: string): Promise<PaymentRecord | null> {
  const out: GetCommandOutput = await ddb.send(
    new GetCommand({
      TableName: PAY_TABLE,
      Key: { paymentId },
    })
  );
  const item: unknown = out.Item ?? null;
  if (!isObject(item)) return null;

  const pid = typeof item["paymentId"] === "string" ? item["paymentId"] : "";
  if (!pid) return null;

  const rec: PaymentRecord = {
    paymentId: pid,
    status: typeof item["status"] === "string" ? item["status"] : undefined,
    meta: item["meta"],
    callbackPath:
      typeof item["callbackPath"] === "string"
        ? item["callbackPath"]
        : undefined,
    updatedAt:
      typeof item["updatedAt"] === "string"
        ? item["updatedAt"]
        : undefined,
  };
  return rec;
}

async function setStatusPaid(paymentId: string): Promise<void> {
  const now = new Date().toISOString();
  await ddb.send(
    new UpdateCommand({
      TableName: PAY_TABLE,
      Key: { paymentId },
      UpdateExpression: "SET #s = :paid, #u = :now",
      ExpressionAttributeNames: {
        "#s": "status",
        "#u": "updatedAt",
      },
      ExpressionAttributeValues: {
        ":paid": "paid",
        ":now": now,
      },
    })
  );
}

async function getStashValueById(stashId: string): Promise<unknown | null> {
  const out: GetCommandOutput = await ddb.send(
    new GetCommand({
      TableName: STASH_TABLE,
      Key: { stashId },
    })
  );
  const item: unknown = out.Item ?? null;
  if (!isObject(item)) return null;
  if (!("value" in item)) return null;
  return (item as StashItem).value ?? null;
}

/** Save notify debug snapshot to the payment record (overwrites for simplicity). */
async function saveNotifyDebug(
  paymentId: string,
  debug: NotifyDebug
): Promise<void> {
  if (!paymentId) return; // avoid writing with empty key
  await ddb.send(
    new UpdateCommand({
      TableName: PAY_TABLE,
      Key: { paymentId },
      UpdateExpression: "SET #nd = :d",
      ExpressionAttributeNames: { "#nd": "notifyDebug" },
      ExpressionAttributeValues: { ":d": debug },
    })
  );
}

/** ====== Signature helpers (RAW-BASED) ======
 * We compute signatures directly from the raw x-www-form-urlencoded body,
 * removing the `signature` pair AS-IS (no decoding), preserving key order and encoding.
 * Then try combinations:
 *  - orig (raw order)  × with/without passphrase × ('+' vs '%20' for passphrase encoding)
 *  - sorted (by key)   × with/without passphrase × ('+' vs '%20')
 */
type RawPair = { key: string; valueEnc: string; rawPair: string };

function md5Hex(s: string): string {
  return crypto.createHash("md5").update(s, "utf8").digest("hex");
}

function encodePass(s: string, plus: boolean): string {
  const enc = encodeURIComponent(s);
  return plus ? enc.replace(/%20/g, "+") : enc;
}

/** Split raw body into raw pairs, preserving order and original encoding */
function splitRawPairs(raw: string): RawPair[] {
  const segments = raw.length ? raw.split("&") : [];
  const out: RawPair[] = [];
  for (const seg of segments) {
    const eq = seg.indexOf("=");
    const key = eq >= 0 ? seg.slice(0, eq) : seg;
    const valueEnc = eq >= 0 ? seg.slice(eq + 1) : "";
    out.push({ key, valueEnc, rawPair: seg });
  }
  return out;
}

function stripSignaturePair(pairs: RawPair[]): { base: string; usedKeys: string[]; kept: RawPair[] } {
  const kept: RawPair[] = [];
  const usedKeys: string[] = [];
  for (const p of pairs) {
    if (p.key === "signature") continue; // exclude only signature
    kept.push(p);
    usedKeys.push(p.key);
  }
  const base = kept.map((p) => p.rawPair).join("&");
  return { base, usedKeys, kept };
}

function joinPairs(pairs: RawPair[]): string {
  return pairs.map((p) => `${p.key}=${p.valueEnc}`).join("&");
}

function computeCandidateSigsFromRawBase(
  base: string,
  kept: RawPair[],
  passphrase: string
) {
  const variants: { tag: string; sig: string }[] = [];

  // orig/noPass
  variants.push({ tag: "orig-noPass+plus", sig: md5Hex(base) });
  variants.push({ tag: "orig-noPass%20", sig: md5Hex(base) });

  // orig/withPass
  if (passphrase) {
    const withPlus = `${base}&passphrase=${encodePass(passphrase, true)}`;
    const with20 = `${base}&passphrase=${encodePass(passphrase, false)}`;
    variants.push({ tag: "orig-withPass+plus", sig: md5Hex(withPlus) });
    variants.push({ tag: "orig-withPass%20", sig: md5Hex(with20) });
  }

  // sorted: sort by key but keep encoded values AS-IS
  const sorted = [...kept].sort((a, b) => a.key.localeCompare(b.key));
  const sortedBase = joinPairs(sorted);

  variants.push({ tag: "sorted-noPass+plus", sig: md5Hex(sortedBase) });
  variants.push({ tag: "sorted-noPass%20", sig: md5Hex(sortedBase) });

  if (passphrase) {
    const sWithPlus = `${sortedBase}&passphrase=${encodePass(passphrase, true)}`;
    const sWith20 = `${sortedBase}&passphrase=${encodePass(passphrase, false)}`;
    variants.push({ tag: "sorted-withPass+plus", sig: md5Hex(sWithPlus) });
    variants.push({ tag: "sorted-withPass%20", sig: md5Hex(sWith20) });
  }

  return variants;
}

/** ====== Utils ====== */
function normalizeStatus(v: unknown): string {
  return String(v ?? "").trim().toUpperCase();
}

function toAbsoluteUrl(pathOrUrl: string): string {
  try {
    return new URL(pathOrUrl).toString();
  } catch {
    return new URL(pathOrUrl, APP_BASE_URL).toString();
  }
}

/** ====== Handler ====== */
export async function POST(request: Request) {
  const rid = crypto.randomUUID(); // unified request id
  const nowIso = new Date().toISOString();

  try {
    const ct = request.headers.get("content-type") ?? "";
    console.info("[notify] start", { rid, ct });

    // 1) Read RAW body (x-www-form-urlencoded)
    const raw = await request.text();
    console.info("[notify] raw", { rid, len: raw.length });

    // For display/debug via URLSearchParams (not used for signature)
    const params = new URLSearchParams(raw);
    const pf: PfMap = Object.fromEntries(params.entries());
    const paymentId = pf.m_payment_id ?? "";

    const parsedKeys = Array.from(params.keys());
    console.info("[notify] parsed", {
      rid,
      keys: parsedKeys,
      m_payment_id: pf.m_payment_id ?? null,
      payment_status: pf.payment_status ?? null,
    });

    // 2) Build signature candidates DIRECTLY from raw (preserve order & encoding)
    const rawPairs = splitRawPairs(raw);
    const { base, usedKeys, kept } = stripSignaturePair(rawPairs);
    const posted = pf.signature ?? "";
    const candidates = computeCandidateSigsFromRawBase(base, kept, PASS_PHRASE);
    const matched = candidates.find((c) => c.sig === posted);

    console.info("[notify] signature", {
      rid,
      posted,
      matchTag: matched?.tag ?? null,
    });

    // First snapshot for browser polling (only if we have paymentId)
    await saveNotifyDebug(paymentId, {
      rid,
      timestamp: nowIso,
      parsedKeys,
      includedKeys: usedKeys, // raw order
      m_payment_id: pf.m_payment_id ?? null,
      payment_status: pf.payment_status ?? null,
      signature: { posted, matchTag: matched?.tag ?? null },
    });

    if (!matched) {
      console.warn("[notify] signature mismatch", { rid });
      return NextResponse.json({ ok: true });
    }

    // 3) Load payment
    if (!paymentId) {
      await saveNotifyDebug(paymentId, {
        rid,
        timestamp: new Date().toISOString(),
        parsedKeys,
        includedKeys: usedKeys,
        signature: { posted, matchTag: matched.tag },
        m_payment_id: null,
        payment_status: pf.payment_status ?? null,
      });
      console.warn("[notify] missing m_payment_id", { rid });
      return NextResponse.json({ ok: true });
    }

    const payment = await getPayment(paymentId);
    console.info("[notify] paymentLoaded", {
      rid,
      paymentId,
      found: Boolean(payment),
      statusBefore: payment?.status ?? null,
      hasMeta: Boolean(payment?.meta),
      callbackPath: payment?.callbackPath ?? null,
    });

    await saveNotifyDebug(paymentId, {
      rid,
      timestamp: new Date().toISOString(),
      parsedKeys,
      includedKeys: usedKeys,
      signature: { posted, matchTag: matched.tag },
      m_payment_id: paymentId,
      payment_status: pf.payment_status ?? null,
      statusBefore: payment?.status ?? null,
    });

    if (!payment) {
      return NextResponse.json({ ok: true });
    }

    // 4) Status transition
    const pfStatus = normalizeStatus(pf.payment_status);
    if (pfStatus === "COMPLETE" && payment.status !== "paid") {
      await setStatusPaid(paymentId);
      console.info("[notify] statusUpdated", { rid, paymentId, to: "paid" });

      await saveNotifyDebug(paymentId, {
        rid,
        timestamp: new Date().toISOString(),
        parsedKeys,
        includedKeys: usedKeys,
        signature: { posted, matchTag: matched.tag },
        m_payment_id: paymentId,
        payment_status: pf.payment_status ?? null,
        statusBefore: payment.status ?? null,
        pfStatus,
        statusUpdated: true,
      });

      // 5) Prepare callback body (prefer full form from stash)
      let bodyForCallback: unknown = isObject(payment.meta) ? payment.meta : {};
      const stashId =
        isObject(payment.meta) && typeof payment.meta["stashId"] === "string"
          ? (payment.meta["stashId"] as string)
          : "";

      if (stashId) {
        const fullForm = await getStashValueById(stashId);
        if (fullForm) bodyForCallback = fullForm;
      }

      const callbackPath =
        typeof payment.callbackPath === "string" && payment.callbackPath
          ? payment.callbackPath
          : "/api/workshop-registration";
      const callbackUrl = toAbsoluteUrl(callbackPath);

      console.info("[notify] callback", {
        rid,
        url: callbackUrl,
        hasForm: Boolean(bodyForCallback),
      });

      const resp = await fetch(callbackUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bodyForCallback),
      });

      console.info("[notify] callbackResp", {
        rid,
        ok: resp.ok,
        status: resp.status,
      });

      await saveNotifyDebug(paymentId, {
        rid,
        timestamp: new Date().toISOString(),
        parsedKeys,
        includedKeys: usedKeys,
        signature: { posted, matchTag: matched.tag },
        m_payment_id: paymentId,
        payment_status: pf.payment_status ?? null,
        statusBefore: payment.status ?? null,
        pfStatus,
        statusUpdated: true,
        callbackUrl,
        callbackOk: resp.ok,
        callbackStatus: resp.status,
      });

      if (!resp.ok) {
        console.error("[notify] callback failed", { rid, status: resp.status });
      }
    } else {
      console.info("[notify] skipUpdate", {
        rid,
        paymentId,
        pfStatus,
        status: payment.status ?? null,
      });

      await saveNotifyDebug(paymentId, {
        rid,
        timestamp: new Date().toISOString(),
        parsedKeys,
        includedKeys: usedKeys,
        signature: { posted, matchTag: matched.tag },
        m_payment_id: paymentId,
        payment_status: pf.payment_status ?? null,
        statusBefore: payment.status ?? null,
        pfStatus,
        statusUpdated: false,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[notify] error", { rid, err });
    return NextResponse.json({ ok: true });
  }
}
