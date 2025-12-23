// src/app/(normal)/solutions/page.tsx

import React from "react";
import VideoHero from "./components/videoHero";
import HeroSection from "./components/heroSection";
import OfferSection from "./components/offerSection";
import LabSourcingSection from "./components/labSourcing";
import SchoolServiceSection from "./components/schoolServiceSection";
import CloudPlatformSection from "./components/cloudPlatform";

export const metadata = {
  title: 'Education and robotics solutions | sheen robotics',
  description: 'Education and robotics solutions designed for schools and partners.',
};

export default function Page() {
  return (
    <main className="relative w-full min-h-screen bg-transparent">
      <HeroSection />
      <OfferSection />
      <VideoHero />
      <LabSourcingSection />
      <SchoolServiceSection />
      <CloudPlatformSection />
    </main>
  );
}