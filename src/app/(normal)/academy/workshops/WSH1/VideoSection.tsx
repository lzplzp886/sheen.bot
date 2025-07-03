// src/app/(normal)/academy/workshops/components/VideoSection.tsx

'use client';
import React from 'react';

export default function VideoSection() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 mt-8 mb-10 aspect-[16/9]">
      <iframe
        src="https://www.youtube.com/embed/0vsgV1b_g0Y"
        title="Holiday Workshop Preview"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
      />
    </div>
  );
}
