// src/app/(normal)/about/components/aboutSection.tsx

'use client';
import React from 'react';
import SectionContainer from './sectionContainer';

export default function AboutSection() {
  return (
    <SectionContainer>
      <h2 id="about" className="text-3xl font-semibold mb-6">About Us</h2>

      <p className="text-body text-lg leading-relaxed mb-8">
        Started in March 2025, Sheen Technologies aims to empowering African youth to invent the future with AI and robotics technologies. Our team is passionate about building cutting-edge solutions for our clients, including schools, institutions and households.
      </p>

      {/* 
         Video Container
         - width: 100% (to fill the column)
         - aspect-ratio: 16/9 (or pb-[56.25%])
         - removed max-w limitation to fit the new layout better
      */}
      <div className="mt-6 relative w-full rounded-xl overflow-hidden shadow-md" style={{ aspectRatio: '16/9' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/zVNYLtjWbe4?si=bFXu4FAut5WltvMv"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </SectionContainer>
  );
}
