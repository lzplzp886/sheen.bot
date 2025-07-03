// src/app/(normal)/academy/workshops/components/StructureSection.tsx
'use client';
import React from 'react';
import Image from 'next/image';

const CARDS = [
  {
    icon: '/images/academy/Workshops/Day-1.svg',
    title: 'LEGO® Challenges',
    subtitle: 'Day 1',
    desc: 'Build and code your own LEGO® robots. Compete in creative robot challenges!',
  },
  {
    icon: '/images/academy/Workshops/Day-2.svg',
    title: 'micro:bit Basics',
    subtitle: 'Day 2',
    desc: 'Discover how pocket-sized tech can talk to each other without any wires!',
  },
  {
    icon: '/images/academy/Workshops/Day-3.svg',
    title: 'Soldering & Racing',
    subtitle: 'Day 3',
    desc: 'Assemble and program your own line-following robot. Will your car win the race?',
  },
];

export default function StructureSection() {
  return (
    <section className="bg-accent/10 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-8 text-center md:text-left">
          Workshop Structure:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="bg-background rounded-2xl shadow-md p-6 text-center flex flex-col items-center"
            >
              <Image src={c.icon} alt={c.title} width={80} height={80} className="mb-4" />
              <h4 className="text-lg font-semibold">
                {c.title}{' '}
                <span className="block text-sm font-medium">({c.subtitle})</span>
              </h4>
              <p className="mt-2 text-sm whitespace-pre-line">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
