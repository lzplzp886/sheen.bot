// src/app/api/payfast/charge/route.ts

import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { PAYFAST } from "../env";
import { buildSignatureBase } from "../_utils/sign";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";

/* ============ Types ============ */
type ChargeMode = "once" | "sub";

interface ChargeItem { code?: string; name?: string; }
interface ChargeCustomer { firstName?: string; lastName?: string; email?: string; }
interface ChargeOrderInput { qty?: number; amount?: number | string; }
interface ChargeSubscriptionInput {
  recurring_amount?: number | string;
  frequency?: string;
  cycles?: number | string;
}

interface ChargeBase {
  mode?: string;
  item?: ChargeItem;
  customer?: ChargeCustomer;
  returnPath?: string;
  cancelPath?: string;
  callbackPath?: string;
  meta?: unknown;
}

/** order 与 subscription 都做成可选，避免 TS 窄化失败 */
interface ChargePayload extends ChargeBase {
  order?: ChargeOrderInput;
  subscription?: ChargeSubscriptionInput;
}

interface PaymentRecord {
  paymentId: string;
  mode: ChargeMode;
  status: "pending" | "paid" | "failed";
  amount: string; // 冗余保存总额
  qty?: number;   // 冗余保存数量（once 才有）
  item: ChargeItem;
  customer: ChargeCustomer;
  meta: unknown;
  returnPath: string;
  cancelPath: string;
  callbackPath: string;
  order?: { qty: number; amount: string } | null;
  subscription?: {
    recurring_amount: string;
    frequency: string;
    cycles: string;
  } | null;
  createdAt: number;
}

const ddb = new DynamoDBClient({});
const PAY_TABLE = process.env.DDB_PAYMENTS_TABLE || "sheen.bot-payments";

export async function POST(req: Request) {
  try {
    const payload: ChargePayload = await req.json();

    // —— 模式
    const modeStr = String(payload?.mode || "once").toLowerCase();
    const mode: ChargeMode = modeStr === "sub" ? "sub" : "once";

    // —— 商品 / 用户 / 跳转路径
    const item: ChargeItem = payload?.item ?? {};
    const customer: ChargeCustomer = payload?.customer ?? {};
    const returnPath = payload?.returnPath || "/payment/success";
    const cancelPath = payload?.cancelPath || "/payment-failure";
    const callbackPath = payload?.callbackPath || "";
    const meta = payload?.meta ?? null;

    // —— 金额与 order/subscription 整理
    let amount = "0.00";
    let orderForRecord: PaymentRecord["order"] = null;
    let subscriptionForRecord: PaymentRecord["subscription"] = null;

    if (mode === "once") {
      const o: ChargeOrderInput = payload.order ?? {};
      const numeric = Number(o.amount);
      const qty = Math.max(Number(o.qty ?? 1), 1);
      if (!Number.isFinite(numeric) || numeric <= 0) {
        return NextResponse.json({ error: "Missing/invalid order.amount" }, { status: 400 });
      }
      amount = numeric.toFixed(2);
      orderForRecord = { qty, amount };
    } else {
      const s: ChargeSubscriptionInput = payload.subscription ?? {};
      const num = Number(s.recurring_amount);
      const freq = s.frequency;
      if (!Number.isFinite(num) || !freq) {
        return NextResponse.json({ error: "Missing/invalid subscription params" }, { status: 400 });
      }
      amount = num.toFixed(2);
      subscriptionForRecord = {
        recurring_amount: amount,
        frequency: String(freq),
        cycles: String(s.cycles ?? "0"),
      };
    }

    // 1) 生成 paymentId
    const paymentId = uuid();

    // 2) 落库（待支付）
    const record: PaymentRecord = {
      paymentId,
      mode,
      status: "pending",
      amount,
      qty: orderForRecord?.qty, // 顶层冗余（仅 once）
      item,
      customer,
      meta,
      returnPath,
      cancelPath,
      callbackPath,
      order: orderForRecord,              // 结构化保存（兼容旧表结构）
      subscription: subscriptionForRecord,
      createdAt: Date.now(),
    };

    const putInput: PutCommandInput = {
      TableName: PAY_TABLE,
      Item: record as unknown as Record<string, unknown>,
    };
    await ddb.send(new PutCommand(putInput));

    // 3) PayFast 字段（不含 signature）
    const fields: Record<string, string> = {
      merchant_id : PAYFAST.MERCHANT_ID,
      merchant_key: PAYFAST.MERCHANT_KEY,
      return_url  : `${PAYFAST.BASE_URL}${returnPath}?paymentId=${encodeURIComponent(paymentId)}`,
      cancel_url  : `${PAYFAST.BASE_URL}${cancelPath}?paymentId=${encodeURIComponent(paymentId)}`,
      notify_url  : `${PAYFAST.BASE_URL}/api/payfast/notify`,
      m_payment_id: paymentId,
      amount      : amount, // "123.45"
      item_name   : String(item?.name || "Payment"),
      name_first  : String(customer?.firstName || ""),
      name_last   : String(customer?.lastName || ""),
      email_address: String(customer?.email || ""),
    };

    if (mode === "sub" && subscriptionForRecord) {
      fields["subscription_type"] = "1";
      fields["recurring_amount"]  = subscriptionForRecord.recurring_amount;
      fields["frequency"]         = subscriptionForRecord.frequency; // 3/4/5/6
      fields["cycles"]            = subscriptionForRecord.cycles;    // '0' indefinite
    }

    // 4) 签名（含可选 passphrase，编码规则与浏览器表单一致）
    const { signature, base } = buildSignatureBase(fields, PAYFAST.PASSPHRASE);
    fields.signature = signature;

    if (process.env.NEXT_PAYFAST_DEBUG === "1") {
      console.log("[payfast/charge] base =", base);
      console.log("[payfast/charge] signature =", signature);
    }

    // 5) 返回给前端，前端 POST 到 PayFast
    return NextResponse.json({
      postUrl: PAYFAST.PROCESS_URL,
      fields,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    console.error("[payfast/charge] error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
