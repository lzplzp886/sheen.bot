// src/app/(normal)/academy/workshops/page.tsx
'use client';
import React from 'react';

import HeroBanner from './components/HeroBanner';
import IntroSection from './components/IntroSection';

export default function WorkshopsPage() {
  return (
    <main className="text-body">
      <HeroBanner />
      <IntroSection />
    </main>
  );
}