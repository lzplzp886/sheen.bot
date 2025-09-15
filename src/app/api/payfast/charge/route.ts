// src/app/api/payfast/charge/route.ts

import { NextResponse } from "next/server";
import crypto from "crypto";
import { v4 as uuid } from "uuid";
import { PAYFAST } from "../env";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";

/** ---- 类型定义 ---- */
type Mode = "once" | "sub";

interface ChargeItem {
  code?: string;
  name?: string;
}

interface ChargeCustomer {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface ChargeOrderInput {
  qty?: number;
  amount?: string | number;
}

interface ChargeOrder {
  qty: number;
  amount: string; // fixed(2)
}

interface ChargeSubscriptionInput {
  recurring_amount?: string | number;
  frequency?: string; // '3' | '4' | '5' | '6'
  cycles?: string | number;
}

interface ChargeSubscription {
  recurring_amount: string; // fixed(2)
  frequency: string;
  cycles?: string;
}

interface ChargeBase {
  mode?: string; // 外部传入，先宽松接收
  item?: ChargeItem;
  customer?: ChargeCustomer;
  returnPath?: string;
  cancelPath?: string;
  callbackPath?: string;
  meta?: unknown;
}

type ChargePayloadOnce = ChargeBase & {
  order?: ChargeOrderInput;
  subscription?: undefined;
};

type ChargePayloadSub = ChargeBase & {
  order?: undefined;
  subscription?: ChargeSubscriptionInput;
};

type ChargePayload = ChargePayloadOnce | ChargePayloadSub;

interface PaymentItem {
  paymentId: string;
  mode: Mode;
  status: "pending" | "paid" | "failed";
  amount: string; // fixed(2)
  item: ChargeItem;
  customer: ChargeCustomer;
  meta: unknown;
  returnPath: string;
  cancelPath: string;
  callbackPath?: string;
  subscription?: ChargeSubscription | null;
  order?: ChargeOrder | null;
  createdAt: number;
  updatedAt?: number;
}

/** ---- SDK 初始化 ---- */
const ddb = new DynamoDBClient({});
const PAY_TABLE = process.env.DDB_PAYMENTS_TABLE || "sheen.bot-payments";

/** ---- PayFast 签名（无 passphrase 版） ---- */
function buildSignature(fields: Record<string, string>) {
  const q = Object.keys(fields)
    .sort()
    .map(
      (k) =>
        `${encodeURIComponent(k)}=${encodeURIComponent(fields[k]).replace(
          /%20/g,
          "+"
        )}`
    )
    .join("&");
  return crypto.createHash("md5").update(q).digest("hex");
}

/** 规范化 mode 到 'once' | 'sub' */
function normalizeMode(m: unknown): Mode {
  const s = String(m || "once").toLowerCase();
  return s === "sub" ? "sub" : "once";
}

export async function POST(req: Request) {
  try {
    const payloadUnknown = (await req.json()) as unknown;
    const payload = (payloadUnknown ?? {}) as ChargePayload;

    const mode = normalizeMode(payload.mode);
    const item: ChargeItem = payload.item ?? {};
    const customer: ChargeCustomer = payload.customer ?? {};
    const returnPath = payload.returnPath || "/payment/success";
    const cancelPath = payload.cancelPath || "/payment/payment-failure";
    const callbackPath = payload.callbackPath || "";
    const meta = payload.meta ?? null;

    // 计算金额
    let amount = "0.00";
    let order: ChargeOrder | null = null;
    let subscription: ChargeSubscription | null = null;

    if (mode === "once") {
      // 显式收窄
      const pOnce = payload as ChargePayloadOnce;
      const o: ChargeOrderInput = pOnce.order ?? {};
      const qtyNum = Number(o.qty ?? 1);
      const numeric = Number(o.amount ?? 0);

      if (!Number.isFinite(numeric) || numeric <= 0) {
        return NextResponse.json(
          { error: "Missing or invalid order.amount" },
          { status: 400 }
        );
      }

      order = {
        qty: Math.max(Number.isFinite(qtyNum) ? qtyNum : 1, 1),
        amount: numeric.toFixed(2),
      };
      amount = order.amount;
    } else {
      // 显式收窄
      const pSub = payload as ChargePayloadSub;
      const subIn: ChargeSubscriptionInput = pSub.subscription ?? {};
      const recNum = Number(subIn.recurring_amount ?? 0);
      const frequency = String(subIn.frequency ?? "");

      if (!Number.isFinite(recNum) || recNum <= 0 || !frequency) {
        return NextResponse.json(
          { error: "Missing subscription params (recurring_amount / frequency)" },
          { status: 400 }
        );
      }

      subscription = {
        recurring_amount: recNum.toFixed(2),
        frequency,
        cycles: String(subIn.cycles ?? "0"),
      };
      amount = subscription.recurring_amount;
    }

    // 1) 生成 paymentId
    const paymentId = uuid();

    // 2) 落库 pending
    const payment: PaymentItem = {
      paymentId,
      mode,
      status: "pending",
      amount,
      item,
      customer,
      meta,
      returnPath,
      cancelPath,
      callbackPath,
      subscription,
      order,
      createdAt: Date.now(),
    };

    await ddb.send(
      new PutCommand({
        TableName: PAY_TABLE,
        Item: payment,
      } as PutCommandInput)
    );

    // 3) 组织 PayFast 字段
    const fields: Record<string, string> = {
      merchant_id: PAYFAST.MERCHANT_ID,
      merchant_key: PAYFAST.MERCHANT_KEY,
      return_url: `${PAYFAST.BASE_URL}${returnPath}?paymentId=${encodeURIComponent(paymentId)}`,
      cancel_url: `${PAYFAST.BASE_URL}${cancelPath}?paymentId=${encodeURIComponent(paymentId)}`,
      notify_url: `${PAYFAST.BASE_URL}/api/payfast/notify`,
      m_payment_id: paymentId,
      amount,
      item_name: String(item?.name || "Payment"),
      name_first: String(customer?.firstName || ""),
      name_last: String(customer?.lastName || ""),
      email_address: String(customer?.email || ""),
    };

    if (mode === "sub" && subscription) {
      fields["subscription_type"] = "1";
      fields["recurring_amount"] = subscription.recurring_amount;
      fields["frequency"] = subscription.frequency;
      fields["cycles"] = String(subscription.cycles ?? "0");
    }

    // 4) 签名
    fields.signature = buildSignature(fields);

    return NextResponse.json({
      postUrl: PAYFAST.PROCESS_URL,
      fields,
    } as const);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
