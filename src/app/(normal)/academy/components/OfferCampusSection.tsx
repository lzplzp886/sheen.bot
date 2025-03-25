'use client';

import React from 'react';

export default function OfferCampusSection() {
  return (
    <section className="max-w-5xl mx-auto pt-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="border rounded-md shadow-md p-8">
        <h2 className="text-2xl font-bold mb-2">What We Offer</h2>
        <p>
          Sheen Academy is a premier coding &amp; robotics education center in Century City,
          Cape Town. By offering hands-on solutions to young learners, our programs inspire
          creativity, encourage problem-solving, and provide foundational skills in coding
          and robotics. We aim to nurture curiosity and empower the next generation
          of innovators
        </p>
      </div>
      <div className="border rounded-md shadow-md p-8">
        <h2 className="text-2xl font-bold mb-2">Our Campus</h2>
        <p>
          Sheen Academy is located in Century Square, overlooking the Grand Canal at Century
          City and nestled beside 16 hectares of wetlands and Intaka Bird Island. This
          expansive 215㎡ facility features both classroom and laboratory spaces. Its close
          proximity to Century City&apos;s thriving technology hub fosters valuable
          partnerships with leading industry innovators.
        </p>
      </div>
    </section>
  );
}
