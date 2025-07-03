// src/app/(normal)/academy/workshops/page.tsx
'use client';
import React from 'react';
import HeroComposite from './HeroComposite';
import StructureSection from './StructureSection';
import OfferSection from './OfferSection';
import WorkshopFAQSection from './WorkshopFAQSection';

export default function WorkshopsPage() {
  return (
    <main className="text-body">
      <HeroComposite />
      <StructureSection />
      <OfferSection />
      <section className="max-w-6xl mx-auto px-4 py-12">
        <WorkshopFAQSection />
      </section>
    </main>
  );
}