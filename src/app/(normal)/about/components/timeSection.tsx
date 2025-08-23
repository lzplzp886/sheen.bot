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
  { id: 'ev1', date: '2025.2.5',  title: '1st Public Exposure',      details: 'Sheen Robotics showcased its product lineups WhalesBot to the public.',                                                      img: '/images/about/our-journey/ev1.webp' },
  { id: 'ev2', date: '2025.3.15', title: 'Academy Opening',          details: 'Sheen Academy opens to public, providing weekly coding & robotics classes.',                                         img: '/images/about/our-journey/ev2.webp' },
  { id: 'ev3', date: '2025.3.29', title: 'sheenbot Publish',         details: 'Sheen published its first sheenbot and smart home kit bundle.',                                                            img: '/images/about/our-journey/ev3.webp' },
  { id: 'ev4', date: '2025.6.25', title: '1st School Group Visit',   details: 'Sheen Academy welcomes groups from Sans Souci Girls High School.',                                                   img: '/images/about/our-journey/ev4.webp' },
  { id: 'ev5', date: '2025.7.1',  title: '1st sheenbot Workshop',    details: 'Sheen Academy delivers its first sheenbot workshop at Techno Buzz.',                                    img: '/images/about/our-journey/ev5.webp' },
  { id: 'ev6', date: '2025.7.4',  title: '1st Podcast',              details: 'Sheen Academy have Astrovos attended coding & robotics podcast.',                                               img: '/images/about/our-journey/ev6.webp' },
  { id: 'ev7', date: '2025.7.18',  title: '1st Holiday Workshop',     details: 'Sheen Academy delivers its first winter school holiday camps.',                                        img: '/images/about/our-journey/ev7.webp' },
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
