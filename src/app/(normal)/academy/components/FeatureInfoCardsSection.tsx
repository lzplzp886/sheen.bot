// src/app/(normal)/academy/components/FeatureInfoCardsSection.tsx

'use client';

import React from 'react';
import Image from 'next/image';

export default function FeatureInfoCardsSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        
        {/* Card 1 */}
        <div className="flex items-center p-5 bg-background rounded-lg shadow hover:shadow-md transition">
          <Image
            src="/images/academy/Highlights/InspiringEnvironment.svg"
            alt="Inspiring Environment Icon"
            width={30}
            height={30}
            className="mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">Inspiring Environment</h3>
            <p className="text-base sm:text-lg">
              Drop off your kids at our campus with natural surroundings
              and modern infrastructure.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center p-5 bg-background rounded-lg shadow hover:shadow-md transition">
          <Image
            src="/images/academy/Highlights/StoryBasedContent.svg"
            alt="Story-Based Content Icon"
            width={30}
            height={30}
            className="mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">Story-Based Content</h3>
            <p className="text-base sm:text-lg">
              The storytelling style courses make robotics accessible,
              especially for young kids.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-center p-5 bg-background rounded-lg shadow hover:shadow-md transition">
          <Image
            src="/images/academy/Highlights/MakersLab.svg"
            alt="Makers’ Lab Icon"
            width={30}
            height={30}
            className="mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">Makers’ Lab</h3>
            <p className="text-base sm:text-lg">
              Enjoy free access to our makers’ lab equipped with 3D printers
              and CNC machines to build your own gadgets.
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex items-center p-5 bg-background rounded-lg shadow hover:shadow-md transition">
          <Image
            src="/images/academy/Highlights/EnjoyAI.svg"
            alt="Enjoy AI™ Icon"
            width={30}
            height={30}
            className="mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">Enjoy AI™</h3>
            <p className="text-base sm:text-lg">
              Earn the chance to enter Enjoy AI™, an international
              STEM and robotics carnival for kids.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
