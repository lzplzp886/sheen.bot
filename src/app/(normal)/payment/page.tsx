"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// 新增：引入 Image 组件
import Image from "next/image";
import Button from "@/components/Button";
import { WORKSHOP_PRICING } from "../academy/workshops/register/constants";

/** ---- 常量定义 ---- */
// 定义需要展示在按钮旁边的支付方式 Logo 文件名列表
// 按照常见度和视觉平衡进行了简单的排序
const PAYMENT_METHOD_LOGOS = [
  "Visa.png", "Master Card.png", "instantEFT.png", "Capitec Pay.png",
  "scanToPay.png", "zapper.png", "SnapScan.png", "mukuru.png",
  "MoreTyme.png", "mobicred.png", "SCode.png", "RCS.png",
];

/** ---- 类型定义（前端） ---- */
type Mode = "once" | "sub";

interface ChargeItem { code?: string; name?: string; }
interface ChargeCustomer { firstName: string; lastName: string; email: string; }
interface ChargeOrder { qty: number; amount: string; }
interface ChargeSubscription { recurring_amount: string; frequency: string; cycles?: string; }
interface ChargeBase { mode: Mode; item: ChargeItem; customer: ChargeCustomer; returnPath: string; cancelPath: string; callbackPath?: string; meta?: unknown; }
type ChargeRequest = (ChargeBase & { mode: "once"; order: ChargeOrder }) | (ChargeBase & { mode: "sub"; subscription: ChargeSubscription });
interface ChargeResponse { postUrl: string; fields: Record<string, string>; }

function PaymentInner() {
  const sp = useSearchParams();
  const router = useRouter();

  // ... (参数获取逻辑保持不变) ...
  const mode: Mode = (sp.get("mode") || "once").toLowerCase() as Mode;
  const code = sp.get("code") || "";
  const qty = Math.max(Number(sp.get("qty") || "1"), 1);
  const itemName = sp.get("item_name") || code || "Payment";
  const first = sp.get("name_first") || "";
  const last = sp.get("name_last") || "";
  const email = sp.get("email") || "";

  const returnPath = sp.get("return") || "/payment/success";
  const cancelPath = sp.get("cancel") || "/payment/payment-failure";
  const callbackPath = sp.get("callback") || "";

  const recurringAmountStr = sp.get("recurring_amount") || "";
  const frequency = sp.get("frequency") || "";
  const cycles = sp.get("cycles") || "0";

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

  // 元数据解析
  let meta: unknown = null;
  const metaStr = sp.get("meta");
  if (metaStr) {
    try {
      meta = JSON.parse(metaStr);
    } catch {
      meta = metaStr;
    }
  }

  const isSub = mode === "sub";
  const displayTotal = isSub
    ? Number(recurringAmountStr || 0).toFixed(2)
    : amount;

  const [posting, setPosting] = React.useState(false); // PayFast loading
  const [eftProcessing, setEftProcessing] = React.useState(false); // EFT loading
  const [err, setErr] = React.useState<string | null>(null);

  // ---------------- OPTION 1: PayFast ----------------
  const goPayfast = async () => {
    try {
      setPosting(true);
      setErr(null);

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
          throw new Error("Missing subscription params");
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
      const msg = e instanceof Error ? e.message : "Failed to create payment.";
      setErr(msg);
      setPosting(false);
    }
  };

  // ---------------- OPTION 2: EFT (Manual) ----------------
  const handleEFT = async () => {
    try {
      setEftProcessing(true);
      setErr(null);

      if (!meta || typeof meta !== 'object') {
         throw new Error("Form data is missing. Please restart registration.");
      }

      const res = await fetch("/api/workshop-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meta),
      });

      if (!res.ok) {
        const j = (await res.json().catch(() => null));
        throw new Error(j?.message || `Registration failed (${res.status})`);
      }

      router.push("/payment/payment-eft");

    } catch (e: unknown) {
      console.error(e);
      const msg = e instanceof Error ? e.message : "Failed to process EFT registration.";
      setErr(msg);
      setEftProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Confirm Payment</h1>

      {/* 订单摘要 */}
      <div className="border rounded-xl bg-white shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Order Summary</h2>
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-gray-600">Item</span>
          <span className="font-medium text-right">{itemName}</span>
        </div>
        {!isSub && (
          <>
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-gray-600">Quantity</span>
              <span className="font-medium">{qty}</span>
            </div>
          </>
        )}
        <div className="flex items-center justify-between pt-4 mt-2 border-t text-lg">
          <span className="font-bold text-gray-800">{isSub ? "Recurring Amount" : "Total to Pay"}</span>
          <span className="font-bold text-blue-600">R {displayTotal || "0.00"}</span>
        </div>
      </div>

      {/* 用户信息确认 */}
      <div className="mb-8 text-sm bg-gray-50 p-4 rounded-lg border">
        <div className="grid grid-cols-[80px_1fr] gap-y-1">
          <span className="text-gray-500">Name:</span>
          <span className="font-medium">{first} {last}</span>
          <span className="text-gray-500">Email:</span>
          <span className="font-medium">{email}</span>
        </div>
      </div>

      {err && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm border border-red-100">
          {err}
        </div>
      )}

      {/* 支付方式区域 */}
      <div className="flex flex-col gap-6">

        {/* --- 选项 1: PayFast 主支付区块 (包含按钮和 Logo 墙) --- */}
        <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Instant Payment</h3>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
             {/* 左侧：PayFast 按钮 (修改点 1: 带 Logo 的按钮) */}
            <div className="w-full md:w-5/12 flex-shrink-0">
              <Button
                // 增加 flex items-center gap-2 使文字和图片对齐
                className="btn w-full py-3 text-lg shadow-md flex items-center justify-center gap-3 bg-[#bf232a] hover:bg-[#a61e24] border-none text-white"
                onClick={goPayfast}
                isLoading={posting}
                disabled={eftProcessing}
              >
                <span>Pay via</span>
                {/* PayFast 主 Logo，设置高度为 h-7 (28px) 以匹配文字 */}
                <Image
                  src="/images/payment/Payfast.png"
                  alt="PayFast"
                  width={100} // 这里的 width/height 主要是为了占位和计算比例
                  height={28}
                  className="h-7 w-auto brightness-0 invert" // 使logo变白以适应深色按钮背景
                  priority
                />
              </Button>
            </div>

            {/* 右侧：Logo 墙 (修改点 2: 展示支持的支付方式) */}
            <div className="w-full md:w-7/12">
              <p className="text-xs text-gray-500 mb-2 text-center md:text-left">Supported methods include:</p>
              {/* 使用 4 列网格布局 */}
              <div className="grid grid-cols-4 gap-x-2 gap-y-3 justify-items-center items-center opacity-70 mix-blend-multiply">
                {PAYMENT_METHOD_LOGOS.map((filename, idx) => (
                  // 使用 relative 容器 + fill 模式的 Image，确保不同尺寸的 logo 能整齐排列
                  <div key={idx} className="relative w-auto h-6 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                    <Image
                      src={`/images/payment/${filename}`}
                      alt={filename.replace(".png", "")}
                      // fill 表示充满父容器 (h-6)
                      width={50}
                      height={24}
                      className="object-contain h-full w-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- 选项 2: EFT --- */}
        <div>
           <h3 className="font-semibold text-gray-800 mb-3 px-1">Pay Later</h3>
          <button
            className="btn btn-outline w-full py-3 text-lg border-2 hover:bg-gray-50 transition-colors text-gray-700"
            onClick={handleEFT}
            disabled={posting || eftProcessing}
          >
            {eftProcessing ? "Processing..." : "Pay via EFT (Bank Transfer)"}
          </button>
        </div>

        {/* 返回按钮 */}
        <button
          className="text-gray-400 text-sm mt-2 hover:text-gray-600 underline decoration-dotted text-center"
          onClick={() => router.back()}
          disabled={posting || eftProcessing}
        >
          Back to Registration
        </button>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center min-h-screen flex items-center justify-center">Loading payment details…</div>}>
      <PaymentInner />
    </Suspense>
  );
}