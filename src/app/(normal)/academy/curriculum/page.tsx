// src/app/(normal)/academy/courses/page.tsx

import React from 'react';
import CurriculumSection from './components/curriculumSection';

export const metadata = {
  title: 'Our Curriculum | Sheen Academy',
  description: 'Sheen Academy’s coding & robotics curriculum, covering Intro (ages 6–8), Junior (ages 9–11) and Explorer (ages 12–15) levels.',
};

export default function AcademyCoursesPage() {
  return (
      <CurriculumSection />
  );
}