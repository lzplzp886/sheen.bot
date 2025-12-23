// src/app/(normal)/infinity/infinityClientPage.tsx

"use client";

import React from 'react';
import IntroducingSection from "../sheenbotInfinity/components/IntroducingSection";
import KitSelectionSection from "../sheenbotInfinity/components/KitSelectionSection";
import KitsGuideSection from "../sheenbotInfinity/components/KitsGuideSection";
import WhySheenbotSection from "../sheenbotInfinity/components/WhySheenbotSection";
import ProductPCBLayoutSection from "../sheenbotInfinity/components/ProductPCBLayoutSection";
import SupportSection from "../sheenbotInfinity/components/SupportSection";
import SocialMediaSection from "../sheenbotInfinity/components/SocialMediaSection";

export default function InfinityClientPage() {
  return (
    <main className="overflow-x-hidden bg-background text-body">
      <IntroducingSection />
      <KitSelectionSection />
      <KitsGuideSection />
      <WhySheenbotSection />
      <ProductPCBLayoutSection />
      <SupportSection />
      <SocialMediaSection />
    </main>
  );
}