// src/app/(normal)/academy/courses/page.tsx

import React from 'react';
import Script from 'next/script';
import TrialDetailsSection from './components/trialDetailsSection';
import CourseDetailsSection from './components/courseDetailsSection';
import FAQSection from './components/FAQSection';

export const metadata = {
  title: 'Our Robotics & Coding Courses | Sheen Academy',
  description: 'Discover Sheen Academy’s structured coding & robotics programs: Intro Class (ages 6–8), Junior Class (ages 9–11) and Explorer Class (ages 12–15). Code it, make it!',
};

export default function AcademyCoursesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <TrialDetailsSection />
      <CourseDetailsSection />
      <FAQSection />

      {/* Embedded WhatsApp Consult Widget */}
      <Script
        id="respondio__growth_tool"
        src="https://cdn.respond.io/widget/widget.js?wId=924bc47c-3fee-478f-b4d6-4f39df8d09e1"
        strategy="afterInteractive"
      />
    </div>
  );
}