// src/app/(normal)/academy/workshops/page.tsx
'use client';
import React from 'react';

import HeroBanner from './components/HeroBanner';
import IntroSection from './components/IntroSection';
import HeroComposite from './components/HeroComposite';
import VideoSection from './components/VideoSection';
import StructureSection from './components/StructureSection';
import OfferSection from './components/OfferSection';
import WorkshopFAQSection from './components/WorkshopFAQSection';

export default function WorkshopsPage() {
  return (
    <main className="text-body">
      <HeroBanner />
      <IntroSection />
      <HeroComposite />
      <VideoSection />
      <StructureSection />
      <OfferSection />
      <section className="max-w-6xl mx-auto px-4 py-12">
        <WorkshopFAQSection />
      </section>
    </main>
  );
}