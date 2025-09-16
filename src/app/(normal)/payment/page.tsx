// src/app/(normal)/payment/page.tsx

"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import { WORKSHOP_PRICING } from "../academy/workshops/register/constants";

/** ---- 类型定义（前端） ---- */
type Mode = "once" | "sub";

interface ChargeItem {
  code?: string;
  name?: string;
}

interface ChargeCustomer {
  firstName: string;
  lastName: string;
  email: string;
}

interface ChargeOrder {
  qty: number;
  amount: string; // fixed(2)
}

interface ChargeSubscription {
  recurring_amount: string; // fixed(2)
  frequency: string; // '3' | '4' | '5' | '6'
  cycles?: string; // '0' etc.
}

interface ChargeBase {
  mode: Mode;
  item: ChargeItem;
  customer: ChargeCustomer;
  returnPath: string;
  cancelPath: string;
  callbackPath?: string;
  meta?: unknown;
}

type ChargeRequest =
  | (ChargeBase & { mode: "once"; order: ChargeOrder })
  | (ChargeBase & { mode: "sub"; subscription: ChargeSubscription });

interface ChargeResponse {
  postUrl: string;
  fields: Record<string, string>;
}

function PaymentInner() {
  const sp = useSearchParams();
  const router = useRouter();

  const mode: Mode = (sp.get("mode") || "once").toLowerCase() as Mode;
  const code = sp.get("code") || "";
  const qty = Math.max(Number(sp.get("qty") || "1"), 1);
  const itemName = sp.get("item_name") || code || "Payment";
  const first = sp.get("name_first") || "";
  const last = sp.get("name_last") || "";
  const email = sp.get("email") || "";

  // 成功/失败回跳
  const returnPath = sp.get("return") || "/payment/success";
  const cancelPath = sp.get("cancel") || "/payment/payment-failure";
  const callbackPath = sp.get("callback") || "";

  // 订阅参数
  const recurringAmountStr = sp.get("recurring_amount") || "";
  const frequency = sp.get("frequency") || "";
  const cycles = sp.get("cycles") || "0";

  // 一次性金额：优先 amount，否则用 code*qty
  const amountStr = sp.get("amount");
  let unit = 0;
  if (!amountStr && code) {
    const p = WORKSHOP_PRICING[code as keyof typeof WORKSHOP_PRICING];
    unit = Number.isFinite(p) ? Number(p) : 0;
  }
  const computedAmount = amountStr ? Number(amountStr) : unit * qty;
  const amount = Number.isFinite(computedAmount)
    ? computedAmount.toFixed(2)
    : "0.00";

  // 元数据
  let meta: unknown = null;
  const metaStr = sp.get("meta");
  if (metaStr) {
    try {
      meta = JSON.parse(metaStr);
    } catch {
      meta = metaStr;
    }
  }

  // 展示金额
  const isSub = mode === "sub";
  const displayTotal = isSub
    ? Number(recurringAmountStr || 0).toFixed(2)
    : amount;

  const [posting, setPosting] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  const goPayfast = async () => {
    try {
      setPosting(true);
      setErr(null);

      // 基本校验（前端）
      const missing: string[] = [];
      if (!first) missing.push("first name");
      if (!last) missing.push("last name");
      if (!email) missing.push("email");
      if (missing.length) {
        throw new Error(`Missing required fields: ${missing.join(", ")}`);
      }

      const base: Omit<ChargeBase, "mode"> = {
        item: { code, name: itemName },
        customer: { firstName: first, lastName: last, email },
        returnPath,
        cancelPath,
        callbackPath,
        meta,
      };

      let payload: ChargeRequest;
      if (isSub) {
        if (!recurringAmountStr || Number(recurringAmountStr) <= 0 || !frequency) {
          throw new Error("Missing subscription params: recurring_amount / frequency");
        }
        payload = {
          mode: "sub",
          ...base,
          subscription: {
            recurring_amount: Number(recurringAmountStr).toFixed(2),
            frequency,
            cycles,
          },
        };
      } else {
        if (!amount || Number(amount) <= 0) {
          throw new Error("Missing/invalid amount");
        }
        payload = {
          mode: "once",
          ...base,
          order: {
            qty,
            amount: Number(amount).toFixed(2),
          },
        };
      }

      const res = await fetch("/api/payfast/charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(j?.error || `Server ${res.status}`);
      }

      const { postUrl, fields } = (await res.json()) as ChargeResponse;

      // POST 自动提交到 Payfast
      const form = document.createElement("form");
      form.method = "POST";
      form.action = postUrl;
      form.acceptCharset = "utf-8";
      Object.entries(fields).forEach(([k, v]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = String(v ?? "");
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (e: unknown) {
      const msg =
        e instanceof Error ? e.message : "Failed to create payment.";
      setErr(msg);
      setPosting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Payment</h1>

      <div className="border rounded bg-extralight p-4">
        <div className="flex items-center justify-between mb-2">
          <span>Item</span>
          <strong>{itemName}</strong>
        </div>
        {!isSub && (
          <>
            {code && (
              <div className="flex items-center justify-between mb-2">
                <span>Code</span>
                <strong>{code}</strong>
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <span>Qty</span>
              <strong>{qty}</strong>
            </div>
          </>
        )}
        <div className="flex items-center justify-between border-t pt-3 mt-3">
          <span>{isSub ? "Recurring Amount" : "Total"}</span>
          <strong>R {displayTotal || "0.00"}</strong>
        </div>
      </div>

      <div className="mt-4 text-sm">
        <div>
          <span className="font-medium">Name:</span> {first} {last}
        </div>
        <div>
          <span className="font-medium">Email:</span> {email}
        </div>
      </div>

      {err && <p className="text-error text-sm mt-3">{err}</p>}

      <div className="flex justify-between gap-4 mt-6">
        <Button className="btn" onClick={() => router.back()}>
          Back
        </Button>
        <Button className="btn" onClick={goPayfast} isLoading={posting}>
          Pay with PayFast
        </Button>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading…</div>}>
      <PaymentInner />
    </Suspense>
  );
}
