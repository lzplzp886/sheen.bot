// src/app/(normal)/about/components/aboutSection.tsx

'use client';
import React from 'react';
import SectionContainer from './sectionContainer';

export default function AboutSection() {
  return (
    <SectionContainer>
      <h2 id="about" className="text-3xl font-semibold mb-4">About Us</h2>

      <p className="text-body max-w-prose whitespace-normal break-words mb-4">
        Started in March 2025, Sheen Technologies is dedicated to make AI, IoT, coding & robotics more accessible by young generations. Our team is passionate about building cutting-edge solutions for our clients.
      </p>

      {/* YouTube video (keeps 16:9 on mobile) */}
      <div className="mt-6 relative w-full md:max-w-[420px] mx-auto pb-[56.25%]">
        <iframe
          className="absolute inset-0 w-full h-full rounded-lg"
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
