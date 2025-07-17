// src/app/(normal)/solutions/heroSection.tsx

'use client';

import React, {
  useState,
  useEffect,
  useRef,
  TouchEvent,
  MouseEvent,
} from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/* ────────────── Slide 描述 ────────────── */
interface Slide {
  bg: string;                  // 背景图
  heading: string;
  description: string;
  primary:  { label: string; href: string };
  secondary:{ label: string; href: string };
  clipPath?: string;           // 可选：本张 slide 的 clip-path
  overlay? : string;           // 可选：自定义深色遮罩 rgba
}

/* ────────────── 数据 ────────────── */
const slides: Slide[] = [
  {
    bg: '/images/solutions/banners/agibot-x1.webp',
    heading: 'AgiBot',
    description: '1st time a full-size humanoid robot to arrive South Africa',
    primary:   { label: 'View Catalogue', href: '/solutions/humanoid-solution' },
    secondary: { label: 'Contact Us →',   href: '/about' },
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 70%)',
    overlay:  'rgba(10,10,10,0.4)',
  },
  {
    bg: '/images/solutions/banners/sheen-bot-website.jpeg',
    heading: 'Explore sheen.bot',
    description:
      'Our AI-empowered education platform enables students to learn, create and manage embodied intelligence remotely.',
    primary:   { label: 'Start For Free', href: '/login' },
    secondary: { label: 'Learn More →',  href: '#cloud-platform' },
    clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
    overlay:  'rgba(10,10,10,0.4)',
  },
];

/* 默认斜切 & 遮罩 */
const DEFAULT_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
const DEFAULT_OVERLAY = 'rgba(0,0,0,0.4)';

/* ────────────── 组件 ────────────── */
export default function HeroSection() {
  const [idx, setIdx] = useState(0);

  /* 自动轮播（3 s） */
const timer = useRef<NodeJS.Timeout | undefined>(undefined);

useEffect(() => {
  /* 设置 / 重置定时器 */
  if (timer.current) clearTimeout(timer.current);
  timer.current = setTimeout(
    () => setIdx(i => (i + 1) % slides.length),
    3000
  );

  /* 清理函数：始终返回 void */
  return () => {
    if (timer.current) clearTimeout(timer.current);
  };
}, [idx]);

  /* 拖动 / 触控切换 */
  const startX = useRef<number | null>(null);
  const onStart = (x: number) => (startX.current = x);
  const onEnd = (x: number) => {
    if (startX.current === null) return;
    const diff = x - startX.current;
    if (Math.abs(diff) > 50)
      setIdx(i => (i + (diff > 0 ? -1 : 1) + slides.length) % slides.length);
    startX.current = null;
  };

  /* Render */
  return (
    <section
      className="relative overflow-hidden text-background select-none"
      onTouchStart={(e: TouchEvent) => onStart(e.touches[0].clientX)}
      onTouchEnd={(e: TouchEvent) => onEnd(e.changedTouches[0].clientX)}
      onMouseDown={(e: MouseEvent) => onStart(e.clientX)}
      onMouseUp={(e: MouseEvent)   => onEnd(e.clientX)}
    >
      {/* slides wrapper */}
      <motion.div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="min-w-full relative">
            {/* 背景 & 遮罩 & clipPath */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage: `url('${s.bg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'multiply',
                backgroundColor: s.overlay ?? DEFAULT_OVERLAY,
                clipPath: s.clipPath ?? DEFAULT_CLIP,
              }}
            />

            {/* 内容 */}
            <div className="max-w-6xl mx-auto px-4 py-24 md:py-32">
              <motion.h1
                key={s.heading}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .6 }}
                className="text-4xl sm:text-5xl font-bold mb-4 max-w-3xl"
              >
                {s.heading}
              </motion.h1>

              <motion.p
                key={s.description}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .6, delay: .1 }}
                className="text-base sm:text-lg max-w-xl mb-6"
              >
                {s.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .6, delay: .2 }}
                className="flex gap-4"
              >
                <Link href={s.primary.href}>
                  <button className="inline-block border border-body bg-body text-background font-bold px-5 py-3 rounded shadow hover:bg-light hover:border-light hover:text-body">
                    {s.primary.label}
                  </button>
                </Link>

                <Link href={s.secondary.href}>
                  <button className="inline-block text-background font-bold px-5 py-3 rounded transition-colors duration-300 hover:bg-transparent hover:underline">
                    {s.secondary.label}
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* dots */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-4 z-20">
        {slides.map((_, iDot) => (
          <button
            key={iDot}
            aria-label={`Go to slide ${iDot + 1}`}
            onClick={() => setIdx(iDot)}
            className={`rounded-full transition-colors w-3 h-3 md:w-4 md:h-4
              ${idx === iDot ? 'bg-primary' : 'bg-white/60 hover:bg-white'}`}
          />
        ))}
      </div>
    </section>
  );
}
