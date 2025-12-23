'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SectionContainer from './sectionContainer';

interface EventItem {
  id: string;
  date: string;
  title: string;
  details: string;
  img: string;
}

const EVENTS: EventItem[] = [
  { id: 'ev1', date: '2025.2.5', title: 'First Public Exposure', details: 'Sheen showcased its product lineups WhalesBot to the public.', img: '/images/about/our-journey/ev1.webp' },
  { id: 'ev2', date: '2025.3.15', title: 'Academy Opening', details: 'Sheen opens to public, providing weekly coding & robotics classes.', img: '/images/about/our-journey/ev2.webp' },
  { id: 'ev3', date: '2025.3.29', title: 'sheenbot Publish', details: 'Sheen published its first sheenbot and smart home kit bundle.', img: '/images/about/our-journey/ev3.webp' },
  { id: 'ev4', date: '2025.6.25', title: 'Sans Souci School Excursion', details: 'Sheen welcomes groups from Sans Souci Girls High School.', img: '/images/about/our-journey/ev4.webp' },
  { id: 'ev5', date: '2025.7.1', title: 'Techno Buzz Workshop', details: 'Sheen delivers its first sheenbot workshop at Techno Buzz.', img: '/images/about/our-journey/ev5.webp' },
  { id: 'ev6', date: '2025.7.4', title: 'Don Podcast', details: 'Sheen have Astrovos attended coding & robotics podcast.', img: '/images/about/our-journey/ev6.webp' },
  { id: 'ev7', date: '2025.7.18', title: 'Winter Holiday Workshop', details: 'Sheen delivers its first winter school holiday camps.', img: '/images/about/our-journey/ev7.webp' },
  { id: 'ev8', date: '2025.8.1', title: 'National Science Week', details: 'Students from Brackenfell High with Councillor Higham during the demo.', img: '/images/about/our-journey/ev8.webp' },
  { id: 'ev9', date: '2025.8.16', title: 'iThemba LABS Program', details: 'Interactive robotics and drone exhibition at iThemba LABS.', img: '/images/about/our-journey/ev9.webp' },
  { id: 'ev10', date: '2025.8.21', title: 'Ecosystem Workshop', details: 'Sheen participate the potential international collaboration workshop.', img: '/images/about/our-journey/ev10.webp' },
  { id: 'ev11', date: '2025.8.27', title: 'Luban Workshop Discussion', details: 'Luban workshop initiatives discussion with CPUT.', img: '/images/about/our-journey/ev11.webp' },
  { id: 'ev12', date: '2025.9.6', title: 'EdenX Future Ready Festival', details: 'Sheen brought sheenbot to students who attended EdenX George.', img: '/images/about/our-journey/ev12.webp' },
  { id: 'ev13', date: '2025.10.20', title: 'New Office Expansion', details: 'Sheen expand its office to accomodate more students.', img: '/images/about/our-journey/ev13.webp' },
  { id: 'ev14', date: '2025.10.21', title: 'Forest Village Leadership Academy', details: 'Sheen delivered robotics kits and training to its first partnership school.', img: '/images/about/our-journey/ev14.webp' },
  { id: 'ev15', date: '2025.10.25', title: 'TDK Edventures Partnership', details: 'Sheen and TDK Edventures signed partnership agreement.', img: '/images/about/our-journey/ev15.webp' },
  { id: 'ev16', date: '2025.10.28', title: 'SA EdTech Week', details: 'Sheen attended SA EdTech Week 2025 focus on building EdTech readiness in under-resourced contexts.', img: '/images/about/our-journey/ev16.webp' },
  { id: 'ev17', date: '2025.11.2', title: 'Grade 9 STEM Bootcamp Ceres', details: 'Sheen participated STEM Bootcamp at Ceres and host the Coding & Robotics workshops.', img: '/images/about/our-journey/ev17.webp' },
  { id: 'ev18', date: '2025.11.19', title: 'Bellville Preparatory School', details: 'Sheen delivered WhalesBot robotics courses in Bellville Preparatory School.', img: '/images/about/our-journey/ev18.webp' },
  { id: 'ev19', date: '2025.11.19', title: 'AGiBot HQ Visit', details: 'Sheen invited top CEOs from South African industuries to visit AGiBot, the top-tier robotics company in China.', img: '/images/about/our-journey/ev19.webp' },
];

export default function TimelineSection() {
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [itemsPerRow, setItemsPerRow] = useState<number>(4);   // 默认桌面 4 个/行

  /* 监听视口宽度，小于 768px 时改为 3 个/行 */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setItemsPerRow(e.matches ? 4 : 3);
    handler(mq);                   // 初始设定
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* 按 itemsPerRow 分行，保持蛇形顺序 */
  const rows = EVENTS.reduce<EventItem[][]>((acc, ev, idx) => {
    const r = Math.floor(idx / itemsPerRow);
    (acc[r] ??= []).push(ev);
    return acc;
  }, []);

  /* 线段样式 */
  const lineColor = 'bg-[#8C8C8C]';
  const lineH = 'h-0.5';
  const lineV = 'w-0.5';
  const vHeight = 'h-10';

  return (
    <SectionContainer>
      <h3 className="text-2xl font-semibold mb-4">Our Journey</h3>

      {/* 时间轴主体 */}
      <div className="space-y-12">
        {rows.map((row, rIdx) => {
          const reverse = rIdx % 2 === 1;
          const endSide = reverse ? 'left-4' : 'right-4';

          return (
            <div key={rIdx} className="relative select-none">
              {/* 圆点行 */}
              <div className={`flex justify-between ${reverse ? 'flex-row-reverse' : ''}`}>
                {row.map((ev) => (
                  <div key={ev.id} className="flex flex-col items-center text-center">
                    <button
                      onClick={() => setSelected(ev)}
                      className="w-4 h-4 bg-blue-600 rounded-full hover:scale-150 focus:scale-150 transition-transform"
                    />
                    <p className="mt-2 text-sm text-gray-800">{ev.date}</p>
                    <p className="mt-1 text-xs text-gray-600 max-w-[90px] truncate">
                      {ev.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* 水平线 */}
              <div className={`mx-4 mt-4 ${lineH} ${lineColor}`} />

              {/* 竖线（最后一行不画） */}
              {rIdx < rows.length - 1 && (
                <div className={`absolute ${endSide} top-full ${lineV} ${vHeight} ${lineColor}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* 弹窗 */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 flex"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* 图片：1:1 自适应裁剪 */}
              <div className="relative w-40 sm:w-56 aspect-square flex-shrink-0">
                <Image
                  src={selected.img}
                  alt={selected.title}
                  fill
                  sizes="(max-width:768px) 160px, 224px"
                  className="object-cover rounded-l-lg"
                  priority
                />
              </div>

              {/* 文本区 */}
              <div className="p-6 flex-1 relative">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
                  aria-label="Close"
                >
                  ×
                </button>

                <h4 className="text-lg font-semibold mb-2">
                  {selected.date} — {selected.title}
                </h4>
                <p className="text-gray-700">{selected.details}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
}
