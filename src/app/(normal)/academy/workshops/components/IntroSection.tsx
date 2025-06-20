// src/app/(normal)/academy/workshops/components/IntroSection.tsx

'use client';
import React from 'react';

export default function IntroSection() {
  const bullets = [
    'Fun and Play-Based Learning: engaging activities that require no prior experience',
    'Developing Computational Thinking: understand the logic behind coding',
    'Boosting Problem-Solving Skills: tackle challenges through systematic thinking',
    'Collaborative Teamwork: work together to achieve common goals',
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
        Bringing Coding & Robotics to Your Holidays!
      </h2>
      <p>
        Looking for an exciting and engaging activity to keep young minds active
        during the break? Our Holiday Workshop brings technology to life with
        playful lessons that blend creativity, collaboration and
        problem-solving.
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
