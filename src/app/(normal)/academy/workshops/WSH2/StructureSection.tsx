// src/app/(normal)/academy/workshops/WSH2/StructureSection.tsx

'use client';

import React from 'react';
import Image from 'next/image';

const CARDS = [
  {
    icon: '/images/academy/Workshops/Day-1.svg',
    title: 'Scratch',
    subtitle: 'Day 1',
    desc: 'Dive into the magic world and utilize block-based coding to create your first program!',
  },
  {
    icon: '/images/academy/Workshops/Day-2.svg',
    title: '3D Designing',
    subtitle: 'Day 2',
    desc: 'Spark your curiosity and create your own 3D object that can be printed out and take home!',
  },
];

export default function StructureSection() {
  return (
    <section className="bg-accent/10 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-8 text-center md:text-left">
          Workshop Structure:
        </h3>

        {/* justify-center 让列不足时居中，md 及以上最多 2 列 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 justify-center">
          {CARDS.map(card => (
            <div
              key={card.title}
              className="bg-background rounded-2xl shadow-md p-6 text-center flex flex-col items-center"
            >
              <Image
                src={card.icon}
                alt={card.title}
                width={80}
                height={80}
                className="mb-4"
              />
              <h4 className="text-lg font-semibold">
                {card.title}{' '}
                <span className="block text-sm font-medium">
                  ({card.subtitle})
                </span>
              </h4>
              <p className="mt-2 text-sm whitespace-pre-line">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}