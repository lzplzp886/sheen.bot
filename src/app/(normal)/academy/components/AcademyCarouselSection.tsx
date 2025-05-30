// src/app/(normal)/academy/components/AcademyCarouselSection.tsx

'use client';

import React from 'react';
import CarouselGallery from '@/components/carouselGallery';

// ► Default image set – used when no prop is supplied
const academyImages = [
  { src: '/images/academy/Campus/External_1.webp', alt: 'External 1' },
  { src: '/images/academy/Campus/External_2.webp', alt: 'External 2' },
  { src: '/images/academy/Campus/External_3.webp', alt: 'External 3' },
  { src: '/images/academy/Campus/External_4.webp', alt: 'External 4' },
  { src: '/images/academy/Campus/External_5.webp', alt: 'External 5' },
  { src: '/images/academy/Campus/External_6.webp', alt: 'External 6' },
  { src: '/images/academy/Campus/Reception_1.webp', alt: 'Reception 1' },
  { src: '/images/academy/Campus/Reception_2.webp', alt: 'Reception 2' },
  { src: '/images/academy/Campus/Reception_3.webp', alt: 'Reception 3' },
  { src: '/images/academy/Campus/Reception_4.webp', alt: 'Reception 4' },
  { src: '/images/academy/Campus/Gear_Lab_1.webp', alt: 'Gear Lab 1' },
  { src: '/images/academy/Campus/Gear_Lab_2.webp', alt: 'Gear Lab 2' },
  { src: '/images/academy/Campus/Gear_Lab_3.webp', alt: 'Gear Lab 3' },
  { src: '/images/academy/Campus/AI_Lab_1.webp', alt: 'AI Lab 1' },
  { src: '/images/academy/Campus/AI_Lab_2.webp', alt: 'AI Lab 2' },
  { src: '/images/academy/Campus/AI_Lab_3.webp', alt: 'AI Lab 3' },
  { src: '/images/academy/Campus/Spark_Lab_1.webp', alt: 'Spark Lab 1' },
  { src: '/images/academy/Campus/Spark_Lab_2.webp', alt: 'Spark Lab 2' },
  { src: '/images/academy/Campus/Spark_Lab_3.webp', alt: 'Spark Lab 3' },
  { src: '/images/academy/Campus/Spark_Lab_4.webp', alt: 'Spark Lab 4' },
  { src: '/images/academy/Campus/Spark_Lab_5.webp', alt: 'Spark Lab 5' },
];

interface AcademyCarouselProps {
  images?: {
    src: string;
    alt: string;
  }[];
}

export default function AcademyCarouselSection({ images }: AcademyCarouselProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8 overflow-hidden">
      <CarouselGallery images={images ?? academyImages} />
    </section>
  );
}