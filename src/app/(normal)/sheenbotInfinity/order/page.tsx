// src/app/(normal)/sheenbotInfinity/order/page.tsx

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OrderPage() {
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);
    try {
      // 调用 API 创建 Payfast 支付会话
      const response = await fetch("/api/payfast/createCheckoutSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: "sheenbotInfinity", // 商品标识，可根据实际情况调整
          quantity: 1,
        }),
      });
      const data = await response.json();
      if (data.url) {
        // 重定向到 Payfast 支付页面
        window.location.href = data.url;
      } else {
        console.error("Payment session create error", data);
      }
    } catch (error) {
      console.error("Payment request error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-background text-body">
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Order <span className="text-primary">sheenbot∞</span>
        </h1>
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/sheenbotInfinity/sheenbot-ai-board.png"
            alt="sheenbot∞ AI Board"
            width={360}
            height={360}
            className="mb-4"
          />
          <p className="text-body max-w-2xl mx-auto mb-10">
            Experience next-gen AI board and start your infinite creations, order now to start the journey!
          </p>
          <button
            onClick={handleOrder}
            className="px-8 py-3 bg-body text-background font-bold rounded shadow hover:bg-background transition"
            disabled={loading}
          >
            {loading ? "Processing" : "Order Now"}
          </button>
        </div>
      </section>
      <section className="py-16 text-center">
        <Link href="/sheenbotInfinity">
          <span className="text-primary underline cursor-pointer">
            Back to product page
          </span>
        </Link>
      </section>
    </main>
  );
}
