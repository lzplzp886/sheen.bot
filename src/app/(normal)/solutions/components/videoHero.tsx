// src/app/(normal)/solutions/components/VideoHero.tsx
'use client';

import React from 'react';

/**
 * 解决方案页的“视频预览”模块  
 * - 與 /academy/workshops/.../VideoSection 版式一致  
 * - 16:9 自适应，圆角卡片阴影  
 * - 仅保留 YouTube 基础控件（modestbranding=1）
 */
export default function VideoHero() {
  return (
    /* 与 Workshop 相同的浅色背景 & 上下留白 */
    <section className="bg-accent/10 mb-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* 标题 */}
        <h3 className="text-2xl font-semibold mb-8 text-center md:text-left">
          Solutions Peek
        </h3>

        {/* 影片卡片 */}
        <div className="bg-background rounded-2xl shadow-lg p-4">
          <div className="relative aspect-[16/9]">
            <iframe
              title="Sheen Robotics Solutions"
              src="https://www.youtube-nocookie.com/embed/QR-AVV4dlwE?controls=1&modestbranding=1&rel=0&fs=0&showinfo=0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
