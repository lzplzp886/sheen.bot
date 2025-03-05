// src/app/solutions/page.tsx

"use client";
import React from "react";
import HeroSection from "./heroSection";
import OfferSection from "./offerSection";
import LearningResourcesSection from "./learningResources";
import SheenAcademySection from "./sheenAcademy";
import CloudPlatformSection from "./cloudPlatform";

export default function Page() {
  return (
    <main className="relative w-full min-h-screen bg-transparent">
      <HeroSection />
      <OfferSection />
      <LearningResourcesSection />
      <SheenAcademySection />
      <CloudPlatformSection />
    </main>
  );
}
