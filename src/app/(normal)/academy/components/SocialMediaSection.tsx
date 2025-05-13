// src/app/(normal)/academy/components/SocialMediaSection.tsx

'use client';

import React from 'react';
import Script from 'next/script';

export default function SocialMediaSection() {
  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Rounded card wrapper */}
        <div className="rounded-2xl bg-white shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
            Check Our Activities
          </h2>
          {/* Curator Feed */}
          <div className="overflow-hidden">
            <div id="curator-feed-default-feed-layout">
              <a
                href="https://curator.io"
                target="_blank"
                rel="noreferrer"
                className="crt-logo crt-tag"
              >
                Powered by Curator.io
              </a>
            </div>
          </div>
          {/* Curator Script */}
          <Script
            src="https://cdn.curator.io/published/fa7c9eb3-6367-4913-95ae-2d88ff188b47.js"
            strategy="afterInteractive"
          />
        </div>
      </div>
    </section>
  );
}