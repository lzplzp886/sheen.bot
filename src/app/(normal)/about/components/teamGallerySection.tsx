'use client';
import React from 'react';
import SectionContainer from './sectionContainer';
import CarouselGallery from '@/components/carouselGallery'; // adjust path if needed

const images = [
  { src: '/images/about/about-sheen-team.webp', alt: 'sheen team group photo' },
  { src: '/images/about/about-sheen-team2.webp', alt: 'sheen team teacher training' },
  { src: '/images/about/about-sheen-team3.webp', alt: 'sheen team in action' },
  { src: '/images/about/about-sheen-team4.webp', alt: 'sheen product demonstration' },
  { src: '/images/about/about-sheen-team5.webp', alt: 'sheen team school visit' },
  { src: '/images/about/about-sheen-team6.webp', alt: 'sheen team course development' },
  { src: '/images/about/about-sheen-team7.webp', alt: 'sheen team meetings' },
  { src: '/images/about/about-sheen-team8.webp', alt: 'sheen team robotic arm test' },
];

export default function TeamGallerySection() {
  return (
    <SectionContainer>
      <h3 className="text-2xl font-semibold mb-4">Our Team</h3>
      <CarouselGallery images={images} />
    </SectionContainer>
  );
}
