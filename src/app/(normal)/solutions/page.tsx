// src/app/(normal)/solutions/page.tsx

"use client";
import React from "react";
import HeroSection from "./components/heroSection";
import OfferSection from "./components/offerSection";
import SheenAcademySection from "./components/sheenAcademy";
import SchoolServiceSection from "./components/schoolServiceSection";
import CloudPlatformSection from "./components/cloudPlatform";

export default function Page() {
  return (
    <main className="relative w-full min-h-screen bg-transparent">
      <HeroSection />
      <OfferSection />
      <SheenAcademySection />
      <SchoolServiceSection />
      <CloudPlatformSection />
    </main>
  );
}
