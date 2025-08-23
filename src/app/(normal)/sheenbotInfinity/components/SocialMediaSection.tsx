// src/app/(normal)/academy/components/SocialMediaSection.tsx
"use client";
import React from "react";
import Script from "next/script";

export default function SocialMediaSection() {
  return (
    <section className="py-16 bg-extralight">
      <div className="max-w-6xl mx-auto px-4">
        {/* 卡片容器 */}
        <div className="rounded-2xl bg-background shadow-lg p-8">
          {/* 标题 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Follow sheenbot
          </h2>

          {/* Curator Feed：交由脚本自适应高度 */}
          <div id="curator-feed-feed-sheen-robotics-layout" className="relative">
            <a
              href="https://curator.io"
              target="_blank"
              rel="noopener noreferrer"
              className="crt-logo crt-tag"
            >
              Powered by Curator.io
            </a>
          </div>

          {/* Curator Script */}
          <Script
            src="https://cdn.curator.io/published/ce2575a3-b474-4247-9f49-fc918b5c03d8.js"
            strategy="afterInteractive"
          />
        </div>
      </div>
    </section>
  );
}
