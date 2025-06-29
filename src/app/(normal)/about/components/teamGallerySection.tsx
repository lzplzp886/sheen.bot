// src/app/(normal)/about/components/teamGallerySection.tsx

'use client';
import React from 'react';
import SectionContainer from './sectionContainer';
import CarouselGallery from '@/components/carouselGallery'; // adjust path if needed

const images = [
  { src: '/images/about/about-sheen-team.webp', alt: 'Cape Town Robotics Open Day' },
  { src: '/images/about/about-sheen-team2.webp', alt: 'sheenbot∞ Teacher Training' },
  { src: '/images/about/about-sheen-team3.webp', alt: 'sheenbot∞ Teacher Training' },
  { src: '/images/about/about-sheen-team4.webp', alt: 'sheenbot∞ at Exhibition' },
  { src: '/images/about/about-sheen-team5.webp', alt: 'School Visit' },
  { src: '/images/about/about-sheen-team6.webp', alt: 'WhalesBot Course Development' },
  { src: '/images/about/about-sheen-team7.webp', alt: 'Daily Meetings' },
  { src: '/images/about/about-sheen-team8.webp', alt: 'Robotic Arm Test' },
  { src: '/images/about/about-sheen-team9.webp', alt: 'Soldering Course Development' },
];

export default function TeamGallerySection() {
  return (
    <SectionContainer>
      <h3 className="text-2xl font-semibold mb-4">Our Team</h3>
      <CarouselGallery images={images} />
    </SectionContainer>
  );
}