'use client';

import React from 'react';
import HeroSection from './components/heroSection';
import AboutSection from './components/aboutSection';
import TeamGallerySection from './components/teamGallerySection';
import ContactSection from './components/contactSection';

export default function AboutPage() {
  return (
    <>
      <HeroSection />

      {/* 两列网格；移动端保持纵向 */}
      <div className="container mx-auto px-4 py-12 space-y-12 md:space-y-0
                      md:grid md:grid-cols-2 md:gap-8">
        {/* 左列：About & Team */}
        <div className="space-y-12">
          <AboutSection />
          <TeamGallerySection />
        </div>

        {/* 右列：Contact */}
        <ContactSection />
      </div>
    </>
  );
}