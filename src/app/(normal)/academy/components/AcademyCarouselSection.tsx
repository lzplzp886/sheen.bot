// src/app/(normal)/academy/components/AcademyCarouselSection.tsx

'use client';

import React from 'react';
import CarouselGallery from '@/components/carouselGallery'; 
// Adjust import path if needed

interface AcademyCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function AcademyCarouselSection({ images }: AcademyCarouselProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <CarouselGallery images={images} thumbnailsToShow={5} />
    </section>
  );
}
