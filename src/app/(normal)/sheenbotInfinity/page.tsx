// src/app/(normal)/sheenbotInfinity/page.tsx

"use client";
import React from "react";
import IntroducingSection from "./components/IntroducingSection";
import ProductPCBLayoutSection from "./components/ProductPCBLayoutSection";
import WhySheenbotSection from "./components/WhySheenbotSection";
import BuyNowSection from "./components/BuyNowSection";

export default function Page() {
  return (
    <main className="relative w-full min-h-screen bg-background text-body">
      <IntroducingSection />
      <ProductPCBLayoutSection />
      <WhySheenbotSection />
      <BuyNowSection />
    </main>
  );
}