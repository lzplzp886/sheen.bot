// src/app/(normal)/infinity/page.tsx

"use client";
import IntroducingSection from "../sheenbotInfinity/components/IntroducingSection";
import KitSelectionSection from "../sheenbotInfinity/components/KitSelectionSection";
import KitsGuideSection from "../sheenbotInfinity/components/KitsGuideSection";
import WhySheenbotSection from "../sheenbotInfinity/components/WhySheenbotSection";
import ProductPCBLayoutSection from "../sheenbotInfinity/components/ProductPCBLayoutSection";
import SocialMediaSection from "../sheenbotInfinity/components/SocialMediaSection";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-background text-body">
      <IntroducingSection />
      <KitSelectionSection />
      <KitsGuideSection />
      <WhySheenbotSection />
      <ProductPCBLayoutSection />
      <SocialMediaSection />
    </main>
  );
}