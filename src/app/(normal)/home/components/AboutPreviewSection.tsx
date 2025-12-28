// src/app/(normal)/home/components/AboutPreviewSection.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPreviewSection() {
  return (
    <section className="h-full w-full">
      <Link href="/about" className="block h-full group">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            relative w-full overflow-hidden rounded-2xl
            shadow-sm hover:shadow-xl transition-all duration-300
            hover:-translate-y-1
            min-h-[300px] sm:min-h-[400px]
            flex items-end
          "
        >
          {/* 背景图 */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about/about-sheen.webp"
              alt="About Sheen Academy"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* 
               渐变遮罩：
               1. 全局半透明黑 (bg-black/20) 让图片稍微变暗，突出文字
               2. 底部强渐变 (from-black/90) 确保底部文字清晰
            */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
          </div>

          {/* 内容区域 */}
          <div className="relative z-10 p-8 sm:p-10 w-full text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/10 p-2.5 rounded-full backdrop-blur-md border border-white/20">
                <Image
                  src="/images/logo.png"
                  alt="Icon"
                  width={36}
                  height={36}
                  className="brightness-0 invert" 
                />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                About Us
              </h2>
            </div>
            
            <p className="text-gray-100 text-lg sm:text-xl max-w-3xl leading-relaxed mb-8 drop-shadow-sm">
              We are on a mission to democratize technology education. 
              Discover our story, meet the team driving innovation, and see how we are shaping the future of STEM.
            </p>

            <div className="flex items-center text-primary-light font-bold text-lg group-hover:text-white transition-colors gap-2">
              <span>Read Our Story</span>
              <span className="text-2xl leading-none mb-0.5">→</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </section>
  );
}
