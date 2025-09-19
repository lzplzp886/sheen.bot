// src/app/(normal)/academy/workshops/WSH3/IntroSection.tsx

'use client';
import React from 'react';

export default function IntroSection() {
  const bullets = [
    'Design and construct of a full sheen smart city with our resources',
    'Learn to program the technology that powers a futuristic smart city',
    'Simulate real-world life hacks with your own smart city builds',
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
        INNOVATE SMART, CONSTRUCT SMARTER!
      </h2>
      <p>
        Get ready for an electrifying three-day adventure! Your child will dive into the exciting worlds of coding and robotics as they work with a team to construct their very own smart city. This holiday club is the perfect blend of fun and education, designed to spark creativity and teach valuable tech skills.
      </p>
      <p>
        This is not just a workshop—it is a chance for your child to become a creator, an innovator, and a problem-solver. Give them a holiday experience that is as educational as it is unforgettable!
      </p>

      <div className="bg-background rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          What your kids will experience:
        </h3>
        <ul className="space-y-2">
          {bullets.map((text) => (
            <li key={text} className="flex">
              <span className="text-primary mr-2">☀️</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
