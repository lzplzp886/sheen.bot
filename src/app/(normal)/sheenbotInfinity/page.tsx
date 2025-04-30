// src/app/(normal)/sheenbotInfinity/page.tsx

"use client";
import React from "react";
import IntroducingSection from "./components/IntroducingSection";
import ProductPCBLayoutSection from "./components/ProductPCBLayoutSection";
import WhySheenbotSection from "./components/WhySheenbotSection";
import KitSelectionSection from "./components/KitSelectionSection";

export default function Page() {
  return (
    <main className="relative w-full min-h-screen bg-background text-body">
      <IntroducingSection />
      <KitSelectionSection />
      <WhySheenbotSection />
      <ProductPCBLayoutSection />
    </main>
  );
}