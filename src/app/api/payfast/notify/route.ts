import { NextResponse } from "next/server";
import crypto from "crypto";
import { PAYFAST } from "../env";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const ddb = new DynamoDBClient({});
const PAY_TABLE   = process.env.DDB_PAYMENTS_TABLE || "sheen.bot-payments";
const STASH_TABLE = process.env.DDB_PAYFAST_STASH_TABLE || "sheen.bot-payfast-stash";

/* ---- types ---- */
interface PaymentRecord {
  paymentId: string;
  mode: string; // 'once' | 'sub'
  status: string;
  amount: string;
  item?: unknown;
  customer?: unknown;
  meta?: unknown; // 可能是 {stashId} 或其他业务对象
  returnPath?: string;
  cancelPath?: string;
  callbackPath?: string;
  subscription?: unknown;
  createdAt?: number;
  updatedAt?: number;
}

/* ---- signature (no passphrase) ---- */
function buildSignature(obj: Record<string, string>): string {
  const s = Object.keys(obj)
    .filter((k) => k !== "signature")
    .sort()
    .map(
      (k) =>
        `${encodeURIComponent(k)}=${encodeURIComponent(obj[k]).replace(
          /%20/g,
          "+"
        )}`
    )
    .join("&");
  return crypto.createHash("md5").update(s).digest("hex");
}

/* ---- ddb helpers ---- */
async function getPayment(paymentId: string): Promise<PaymentRecord | null> {
  const res = await ddb.send(
    new GetCommand({
      TableName: PAY_TABLE,
      Key: { paymentId },
    })
  );
  return (res.Item as PaymentRecord | undefined) ?? null;
}

async function setStatus(paymentId: string, status: string): Promise<void> {
  await ddb.send(
    new UpdateCommand({
      TableName: PAY_TABLE,
      Key: { paymentId },
      UpdateExpression: "SET #s = :s, updatedAt = :t",
      ExpressionAttributeNames: { "#s": "status" },
      ExpressionAttributeValues: { ":s": status, ":t": Date.now() },
    })
  );
}

async function getStashPayload(stashId: string): Promise<unknown | null> {
  const res = await ddb.send(
    new GetCommand({
      TableName: STASH_TABLE,
      Key: { stashId },
    })
  );
  const item = res.Item as { payload?: unknown } | undefined;
  return item?.payload ?? null;
}

async function callCallback(callbackPath: string, payload: unknown): Promise<void> {
  if (!callbackPath) return;
  const url = `${PAYFAST.BASE_URL}${callbackPath}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    throw new Error(`Callback failed ${resp.status}`);
  }
}

/* ---- ITN ---- */
export async function POST(req: Request) {
  try {
    // PayFast ITN is x-www-form-urlencoded
    const raw = await req.text();
    const pairs = new URLSearchParams(raw);
    const pf: Record<string, string> = {};
    pairs.forEach((v, k) => {
      pf[k] = v;
    });

    const paymentId = pf["m_payment_id"];
    if (!paymentId) return NextResponse.json({ ok: true });

    // signature check
    const sig = buildSignature(pf);
    if (!pf.signature || pf.signature !== sig) {
      console.warn("[payfast] signature mismatch", { pf, sig });
      return NextResponse.json({ ok: true }); // avoid retry storm
    }

    const status = pf["payment_status"]; // COMPLETE / ACTIVE
    const isSuccess = status === "COMPLETE" || status === "ACTIVE";
    const payment = await getPayment(paymentId);
    if (!payment) return NextResponse.json({ ok: true });

    if (!isSuccess) {
      await setStatus(paymentId, "failed");
      return NextResponse.json({ ok: true });
    }

    // mark paid
    await setStatus(paymentId, "paid");

    // resolve callback payload (support meta = { stashId })
    try {
      if (payment.callbackPath) {
        let callbackPayload: unknown = payment.meta ?? null;

        if (
          callbackPayload &&
          typeof callbackPayload === "object" &&
          "stashId" in (callbackPayload as Record<string, unknown>)
        ) {
          const sid = String((callbackPayload as Record<string, unknown>).stashId ?? "");
          if (sid) {
            const stashed = await getStashPayload(sid);
            if (stashed != null) callbackPayload = stashed;
          }
        }

        await callCallback(payment.callbackPath, {
          ...payment,
          paymentId,
          payfast: pf,
          payload: callbackPayload,
        });
      }
    } catch (err) {
      console.error("[notify] callback error:", err);
      // still 200 to avoid PayFast retries
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error("[payfast notify] error:", e);
    return NextResponse.json({ ok: true });
  }
}
