// src/app/(normal)/about/page.tsx

import React from 'react';
import HeroSection from './components/heroSection';
import AboutSection from './components/aboutSection';
import ActivitiesGallerySection from './components/activitiesGallerySection';
import TeamMembersSection from './components/teamMemberSection';
import ContactSection from './components/contactSection';

export const metadata = {
  title: 'About Sheen | Empowering African youth to invent the future with coding & robotics',
  description: 'We are a leading coding & robotics education research center based in Century City, Cape Town.',
};

export default function AboutPage() {
  return (
    <>
      <HeroSection />

      {/* Row 1: About + Contact */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: About Us Story & Video */}
          <AboutSection />

          {/* Right Column: Contact Info & Map */}
          <ContactSection />
        </div>
      </div>

      {/* Row 2: Our Activities (Full Width Background, Constrained Content) */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <ActivitiesGallerySection />
        </div>
      </div>

      {/* Row 3: Team (Full Width Background if needed, Constrained Content) */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <TeamMembersSection />
        </div>
      </div>
    </>
  );
}
