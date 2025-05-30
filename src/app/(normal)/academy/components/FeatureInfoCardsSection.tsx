// src/app/(normal)/academy/components/FeatureInfoCardsSection.tsx

'use client';

import React from 'react';
import FeatureCard from '@/components/FeatureCard';

const features = [
  {
    iconSrc: '/images/academy/Highlights/InspiringEnvironment.svg',
    iconAlt: 'Inspiring Environment Icon',
    title: 'Inspiring Environment',
    description: 'Drop off your kids at our campus with natural surroundings and modern infrastructure.',
  },
  {
    iconSrc: '/images/academy/Highlights/StoryBasedContent.svg',
    iconAlt: 'Story-Based Content Icon',
    title: 'Story-Based Content',
    description: 'The storytelling style courses make robotics accessible, especially for young kids.',
  },
  {
    iconSrc: '/images/academy/Highlights/MakersLab.svg',
    iconAlt: 'Makers’ Lab Icon',
    title: 'Makers’ Lab',
    description: 'Enjoy free access to our makers’ lab equipped with 3D printers and CNC machines to build your own gadgets.',
  },
  {
    iconSrc: '/images/academy/Highlights/EnjoyAI.svg',
    iconAlt: 'Enjoy AI™ Icon',
    title: 'Enjoy AI™',
    description: 'Earn the chance to enter Enjoy AI™, an international STEM and robotics carnival for kids.',
  },
];

export default function FeatureInfoCardsSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        {features.map((feature, idx) => (
          <FeatureCard
            key={idx}
            iconSrc={feature.iconSrc}
            iconAlt={feature.iconAlt}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}