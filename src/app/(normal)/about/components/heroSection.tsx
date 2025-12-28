// src/app/(normal)/about/components/heroSection.tsx

'use client';
import React from 'react';

export default function HeroSection() {
  return (
    <div
      className="relative h-80 md:h-[450px] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/about/about-sheen.webp')" }}
    >
      {/* 遮罩加深一点点 */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container mx-auto h-full flex
                      items-center justify-center px-4">
        <div className="text-background text-center max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Building for Future
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-200">
            Empowering African youth to invent the future with coding & robotics
          </p>
        </div>
      </div>
    </div>
  );
}
