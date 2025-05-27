// src/components/FeatureCardVertical.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FeatureCardVerticalProps {
  href: string;
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

export default function FeatureCardVertical({
  href,
  iconSrc,
  iconAlt,
  title,
  description,
}: FeatureCardVerticalProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center text-center p-5 bg-background rounded-lg shadow hover:shadow-md transition"
    >
      <div className="mb-4">
        <Image src={iconSrc} alt={iconAlt} width={50} height={50} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-darklight">{description}</p>
    </Link>
  );
}
