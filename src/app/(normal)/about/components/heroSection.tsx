'use client';
import React from 'react';

export default function HeroSection() {
  return (
    <div
      className="relative h-96 md:h-[500px] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/about/about-sheen.webp')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto h-full flex
                      items-center justify-center px-4">
        <div className="text-white text-center max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Building&nbsp;for&nbsp;Future
          </h1>
          <p className="mb-6 text-lg">
            Merge creativity with simplicity to empower education
          </p>
          <a
            href="#about"
            className="bg-primary text-background px-5 py-2 rounded inline-block"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
