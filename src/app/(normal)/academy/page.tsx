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
  return (
    <div>
      <HeroSection />
      <OfferCampusSection />
      <AcademyCarouselSection />
      <FeatureInfoCardsSection />
      <SocialMediaSection />
    </div>
  );
}
