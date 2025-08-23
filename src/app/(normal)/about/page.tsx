// src/app/(normal)/about/page.tsx

'use client';

import React from 'react';
import HeroSection from './components/heroSection';
import AboutSection from './components/aboutSection';
import ActivitiesGallerySection from './components/activitiesGallerySection';
import TeamMembersSection from './components/teamMemberSection';
import ContactSection from './components/contactSection';
import TimelineSection from './components/timeSection';

export default function AboutPage() {
  return (
    <>
      <HeroSection />

      {/* 两列网格；移动端保持纵向 */}
      <div className="container mx-auto px-4 py-12 space-y-12 md:space-y-0
                      md:grid md:grid-cols-2 md:gap-8 items-start">
        {/* 左列：About & Team */}
        <div className="space-y-12">
          <AboutSection />
          <ActivitiesGallerySection />
        </div>

        {/* 右列：Timeline & Contact */}
        <div className="space-y-12">
          <TimelineSection />
          <ContactSection />
        </div>
           
      </div>

      {/* 全宽团队介绍 */}
      <TeamMembersSection />

    </>
  );
}