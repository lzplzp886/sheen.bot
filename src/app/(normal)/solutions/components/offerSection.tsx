// src/app/(normal)/solutions/offerSection.tsx

'use client';
import React from 'react';
import FeatureCardVertical from '@/components/FeatureCardVertical';

export default function OfferSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl sm:text-4xl text-body font-bold mb-8 text-center">
        What We Offer
      </h2>
      <p className="text-body text-base sm:text-lg md:text-xl mb-10 text-center max-w-2xl mx-auto">
        We provide a comprehensive suite of educational resources, competitions, and AI-driven tools that empower learners of all ages to embrace the future of robotics.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <FeatureCardVertical
          href="#robotics-lab-sourcing"
          iconSrc="/images/solutions/lab-sourcing.svg"
          iconAlt="Robotics Lab Sourcing Icon"
          title="Robotics Lab Sourcing"
          description="Supply resources to set up and maintain the robotics lab."
        />
        <FeatureCardVertical
          href="#school-service"
          iconSrc="/images/solutions/school-service.svg"
          iconAlt="School Service Icon"
          title="School Service"
          description="In-school training, workshops and events for students & teachers."
        />
        <FeatureCardVertical
          href="#equipment-rental"
          iconSrc="/images/solutions/equipment-rental.svg"
          iconAlt="Equipment Rental Icon"
          title="Equipment Rental"
          description="High-quality robots and equipment tailored to your on-demand needs."
        />
        <FeatureCardVertical
          href="#competition-consulting"
          iconSrc="/images/solutions/competition-consulting.svg"
          iconAlt="Competition Consulting Icon"
          title="Competition Consulting"
          description="Expert guidance for AI and robotics competitions."
        />
        <FeatureCardVertical
          href="/academy/curriculum"
          iconSrc="/images/solutions/learning-resources.svg"
          iconAlt="Learning Resources Icon"
          title="Learning Resources"
          description="Coding & Robotics Curriculums accessible from an online portal."
        />
        <FeatureCardVertical
          href="#cloud-platform"
          iconSrc="/images/solutions/cloud-platform.svg"
          iconAlt="Cloud Platform Icon"
          title="Cloud Platform"
          description="AI and IoT Cloud solutions to optimize efficiency and connectivity."
        />
      </div>
    </section>
  );
}