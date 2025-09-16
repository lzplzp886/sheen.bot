// src/app/api/payfast/notify/route.ts

import { NextResponse } from "next/server";
import { PAYFAST } from "../env";
import { buildSignatureBase } from "../_utils/sign";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const ddb = new DynamoDBClient({});
const PAY_TABLE = process.env.DDB_PAYMENTS_TABLE || "sheen.bot-payments";

/* ============ types ============ */
type Status = "COMPLETE" | "FAILED" | "CANCELLED" | "PENDING" | "ACTIVE" | string;

interface PaymentRow {
  paymentId: string;
  callbackPath?: string;
  [k: string]: unknown;
}

async function getPayment(paymentId: string): Promise<PaymentRow | null> {
  const r = await ddb.send(
    new GetCommand({
      TableName: PAY_TABLE,
      Key: { paymentId },
    }) as unknown as GetCommand
  );
  return (r as unknown as { Item?: PaymentRow }).Item ?? null;
}

async function setStatus(paymentId: string, status: "paid" | "failed"): Promise<void> {
  await ddb.send(
    new UpdateCommand({
      TableName: PAY_TABLE,
      Key: { paymentId },
      UpdateExpression: "SET #s = :s, updatedAt = :t",
      ExpressionAttributeNames: { "#s": "status" },
      ExpressionAttributeValues: { ":s": status, ":t": Date.now() },
    }) as unknown as UpdateCommand
  );
}

async function callCallback(callbackPath: string, payload: unknown): Promise<void> {
  if (!callbackPath) return;
  const url = `${PAYFAST.BASE_URL}${callbackPath}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Callback failed ${res.status}`);
}

export async function POST(req: Request) {
  try {
    // ITN: form-urlencoded
    const raw = await req.text();
    const params = new URLSearchParams(raw);
    const pf: Record<string, string> = {};
    params.forEach((v, k) => { pf[k] = v; });

    const paymentId = pf["m_payment_id"];
    if (!paymentId) return NextResponse.json({ ok: true });

    // 签名校验（同样规则 & 可选 passphrase）
    const { base, signature } = buildSignatureBase(pf, PAYFAST.PASSPHRASE);

    if (process.env.NEXT_PAYFAST_DEBUG === "1") {
      console.log("[payfast/notify] ITN body:", pf);
      console.log("[payfast/notify] base:", base.replace(/(passphrase=)[^&]+/i, "$1***"));
      console.log("[payfast/notify] signature(local):", signature, " vs posted:", pf.signature);
    }

    if (!pf.signature || pf.signature !== signature) {
      // 不抛 500，避免 PayFast 重试风暴
      console.warn("[payfast/notify] signature mismatch");
      return NextResponse.json({ ok: true });
    }

    const status: Status = pf["payment_status"];
    const success = status === "COMPLETE" || status === "ACTIVE";

    const payment = await getPayment(paymentId);
    if (!payment) return NextResponse.json({ ok: true });

    if (!success) {
      await setStatus(paymentId, "failed");
      return NextResponse.json({ ok: true });
    }

    await setStatus(paymentId, "paid");

    try {
      const callbackPath = String(payment.callbackPath || "");
      if (callbackPath) {
        await callCallback(callbackPath, {
          ...payment,
          paymentId,
          payfast: pf,
        });
      }
    } catch (err) {
      console.error("[payfast/notify] callback error:", err);
      // 仍返回 200，避免重试
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[payfast/notify] error:", e);
    // 仍返回 200，避免 PayFast 一直重试
    return NextResponse.json({ ok: true });
  }
}
