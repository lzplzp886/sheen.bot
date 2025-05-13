'use client';
import React from 'react';
import SectionContainer from './sectionContainer';
import CarouselGallery from '@/components/carouselGallery'; // adjust path if needed

const images = [
  { src: '/images/about/about-sheen-team.webp', alt: 'Sheen team group photo' },
  { src: '/images/about/about-sheen-team2.webp', alt: 'Sheen team teacher training' },
  { src: '/images/about/about-sheen-team3.webp', alt: 'Sheen team in action' },
  { src: '/images/about/about-sheen-team4.webp', alt: 'Sheen product demonstration' },
];

export default function TeamGallerySection() {
  return (
    <SectionContainer>
      <h3 className="text-2xl font-semibold mb-4">Our Team</h3>
      <CarouselGallery images={images} />
    </SectionContainer>
  );
}
