// src/app/(normal)/academy/page.tsx

import React from 'react';
import HeroSection from './components/HeroSection';
import OfferCampusSection from './components/OfferCampusSection';
import AcademyCarouselSection from './components/AcademyCarouselSection';
import FeatureInfoCardsSection from './components/FeatureInfoCardsSection';
import SocialMediaSection from './components/SocialMediaSection';

export const metadata = {
  title: 'Sheen Academy | Coding & Robotics Classes for Kids',
  description: 'Discover Sheen Academy’s hands-on coding & robotics programs for children aged 6+, explore our Century City campus, trial classes, and community features.',
};

export default function AcademyHomePage() {
  // Moved academyImages here so we can pass as props
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

  return (
    <div>
      <HeroSection />
      <OfferCampusSection />
      <AcademyCarouselSection images={academyImages} />
      <FeatureInfoCardsSection />
      <SocialMediaSection />
    </div>
  );
}
