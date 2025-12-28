// src/app/(normal)/academy/workshops/page.tsx

import React from 'react';

import HeroBanner from './components/HeroBanner';
import IntroSection from './components/IntroSection';
import PastWorkshopsSection from './components/PastWorkshopsSection';

export const metadata = {
  title: 'Holiday Workshops & Camps | Sheen Academy',
  description: 'Join our exciting coding & robotics holiday workshops for kids aged 6-18. Hands-on STEM learning, fun challenges, and innovative projects during school breaks.',
};

export default function WorkshopsPage() {
  return (
    <main className="text-body">
      <HeroBanner />
      <IntroSection />
      <PastWorkshopsSection />
    </main>
  );
}
