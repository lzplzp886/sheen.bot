// src/components/FeatureCard.tsx

'use client';

import React from 'react';
import Image from 'next/image';

export interface FeatureCardProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

export default function FeatureCard({ iconSrc, iconAlt, title, description }: FeatureCardProps) {
  return (
    <div className="flex items-center p-5 bg-background rounded-md shadow hover:shadow-md transition">
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={30}
        height={30}
        className="mr-4"
      />
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-darklight">{description}</p>
      </div>
    </div>
  );
}