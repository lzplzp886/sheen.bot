// src/app/(normal)/academy/workshops/WSH1/WorkshopFAQSection.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** Holiday-camp top questions (skip price / discount) */
const FAQ_ITEMS = [
  {
    question: 'Where can I register for the Winter Holiday Camp?',
    answer:
      'Simply fill out our online form at https://www.sheen.bot/academy/workshops/register. It only takes two minutes!',
  },
  {
    question: 'What’s the focus of this three-day camp?',
    answer:
      'Day 1 LEGO® Spike Prime engineering challenges • Day 2 micro:bit interactive projects • Day 3 solder & assemble a line-following race car—combining coding, electronics and hands-on building.',
  },
  {
    question: 'What age group is the camp designed for?',
    answer: 'Learners ages 9 and up. No prior coding experience required.',
  },
  {
    question: 'When does each workshop run?',
    answer:
      'Choose one of three identical weeks:\n• Week 1 (01 – 03 July 2025)\n• Week 2 (08 – 10 July 2025)\n• Week 3 (15 – 17 July 2025)\nSessions run 10 : 00 – 13 : 30 each day (with a short snack break).',
  },
  {
    question: 'My child has zero coding knowledge—can they still join?',
    answer:
      'Absolutely! We start with drag-and-drop block coding and give step-by-step guidance so beginners feel confident from day one.',
  },
  {
    question: 'Do students need to bring their own laptops?',
    answer:
      'No. Sheen Academy supplies laptops, LEGO® kits, micro:bits, soldering stations and protective gear.',
  },
  {
    question: 'Where is the camp held?',
    answer:
      'Unit C1, Century Square, Heron Cres, Century City, Cape Town 7441—inside Sheen Academy’s secure, fully equipped makerspace.',
  },
  {
    question: 'How do you ensure safety during the workshop?',
    answer:
      'All instructors are qualified STEM educators; class size is capped at 1 teacher : 8 students. The facility has first-aid kits and strict soldering & tool safety protocols.',
  },
  {
    question: 'Is lunch provided?',
    answer:
      'Sessions end at 13 : 30, so learners have lunch afterwards. They may bring a light snack for the mid-session break.',
  },
  {
    question: 'What’s the cancellation / refund policy?',
    answer:
      '• Cancel ≥ 7 days before the camp: 100 % refund.\n• Cancel 3–6 days before: 50 % refund.\n• < 3 days: no refund (seat may be transferred to another learner).',
  },
];

export default function WorkshopFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-background shadow rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Workshop FAQs</h2>

      <div className="space-y-2">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              layout="position"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="border-b last:border-none rounded"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left py-3 flex justify-between items-center"
              >
                <span className="font-medium">{item.question}</span>
                <span className="text-xl select-none">{isOpen ? '−' : '+'}</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pb-3"
                  >
                    <p className="whitespace-pre-line text-darklight">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
