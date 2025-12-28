// src/app/(normal)/academy/courses/page.tsx

import React from 'react';
import TrialDetailsSection from './components/trialDetailsSection';
import CourseDetailsSection from './components/courseDetailsSection';
import FAQSection from './components/FAQSection';

export const metadata = {
  title: 'Our Extramural Coding & Robotics Courses | Sheen Academy',
  description: 'Discover Sheen Academy’s structured coding & robotics programs: Intro Class (ages 6–8), Junior Class (ages 9–11) and Explorer Class (ages 12–15). Code it, make it!',
};

export default function AcademyCoursesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <TrialDetailsSection />
      <CourseDetailsSection />
      <FAQSection />
    </div>
  );
}