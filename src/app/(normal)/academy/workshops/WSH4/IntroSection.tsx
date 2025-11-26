// src/app/(normal)/academy/workshops/WSH4/IntroSection.tsx

'use client';
import React from 'react';

export default function IntroSection() {
  const bullets = [
    'Create fun animations using block-based coding (Mini Makers)',
    'Build and code your very own robot (Mini Makers)',
    'Unleash creativity through Python programming (Young Tech Innovators)',
    'Create your own mini-game with beginner-friendly tools (Young Tech Innovators)',
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
        KEEP YOUR CHILD LEARNING AND HAVING FUN!
      </h2>
      <p>
        Join Sheen Academy for an exciting 3-Day Coding & Robotics Holiday Club designed to spark creativity, curiosity, and innovation. Whether your child is a budding builder or a future software engineer, we have a spot for them!
      </p>
      <p>
        This holiday, don&apos;t just let them play games—let them create them. From DIY robot builds using craft supplies to unleashing creativity through Python, this experience is as educational as it is unforgettable.
      </p>

      <div className="bg-background rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          What your kids will experience:
        </h3>
        <ul className="space-y-2">
          {bullets.map((text) => (
            <li key={text} className="flex">
              <span className="text-primary mr-2">🚀</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}