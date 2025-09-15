// src/app/(normal)/academy/workshops/WSH2/VideoSection.tsx
'use client';
import React from 'react';

export default function VideoSection() {
  return (
    /* 与 StructureSection 同级的淡色背景与上下内边距 */
    <section className="bg-accent/10 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* 标题 */}
        <h3 className="text-2xl font-semibold mb-8 text-center md:text-left">
          Workshop Recap
        </h3>

        {/* 卡片包裹 iframe */}
        <div className="bg-background rounded-2xl shadow-lg p-4">
          <div className="relative aspect-[16/9]">
            <iframe
              src="https://www.youtube.com/embed/SLeo1qyLqdY"
              title="Check our last Holiday Workshop Recap"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}