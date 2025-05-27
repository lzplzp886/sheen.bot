// src/app/(normal)/academy/page.tsx

import React from 'react';
import HeroSection from './components/HeroSection';
import OfferCampusSection from './components/OfferCampusSection';
import AcademyCarouselSection from './components/AcademyCarouselSection';
import FeatureInfoCardsSection from './components/FeatureInfoCardsSection';
import PodcastSection from './components/PodcastSection';
// import SocialMediaSection from './components/SocialMediaSection';
import Script from 'next/script';

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
      <PodcastSection />
      {/* <SocialMediaSection /> */}
      {/* Embedded WhatsApp Consult Widget */}
      <Script
        id="respondio__growth_tool"
        src="https://cdn.respond.io/widget/widget.js?wId=924bc47c-3fee-478f-b4d6-4f39df8d09e1"
        strategy="afterInteractive"
      />
    </div>
  );
}
