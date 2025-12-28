// src/app/(normal)/about/components/timeSection.tsx

'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ChevronRight as ChevronRightIcon } from 'lucide-react';

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<EventItem | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="h-full flex flex-col justify-center py-4 px-2"> 
      <div className="flex justify-between items-end mb-6 px-2">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Our Journey</h3>
          <p className="text-gray-500 text-sm mt-1">Milestones that define our path forward.</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2 hidden sm:block" />

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 pt-2 px-1 hide-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {EVENTS.map((ev, index) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 w-[240px] sm:w-[280px] snap-center group"
            >
              <div 
                onClick={() => setSelected(ev)}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer h-full flex flex-col hover:-translate-y-1"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={ev.img}
                    alt={ev.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-primary shadow-sm">
                    {ev.date}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="text-base font-bold text-gray-900 mb-1 line-clamp-1" title={ev.title}>
                    {ev.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {ev.details}
                  </p>
                  <div className="mt-auto pt-3 text-primary text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more <ChevronRightIcon className="w-3 h-3" />
                  </div>
                </div>
              </div>
              
              {/* 移除那个蓝色连接点 */}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              // max-w-2xl -> max-w-4xl (加宽)
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              {/* 左侧图片区域加大，占比 40% */}
              <div className="relative w-full md:w-2/5 h-64 md:h-auto bg-gray-100">
                <Image
                  src={selected.img}
                  alt={selected.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* 右侧内容区域加大，占比 60% */}
              <div className="p-8 w-full md:w-3/5 flex flex-col relative overflow-y-auto">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ✕
                </button>
                <div className="text-primary font-bold mb-2">{selected.date}</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{selected.title}</h3>
                <div className="text-gray-600 leading-relaxed text-lg pr-2">
                  {selected.details}
                </div>
                {/* 可以在这里添加额外的社媒链接或其他内容 */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
