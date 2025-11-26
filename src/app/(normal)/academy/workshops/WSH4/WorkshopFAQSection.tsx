// src/app/(normal)/academy/workshops/WSH4/WorkshopFAQSection.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_ITEMS = [
  {
    question: 'How do I register?',
    answer:
      'Simply fill out our online form at our workshop page or contact us via WhatsApp at 065 900 8570.',
  },
  {
    question: 'What is the difference between the two groups?',
    answer:
      '• Mini Makers (Ages 6-8) focuses on block-based coding, hands-on robot building, and crafts.\n• Young Tech Innovators (Ages 9+) focuses on Python coding and game creation.',
  },
  {
    question: 'When does the workshop run?',
    answer:
      'The holiday clubs run from 9 – 11 December 2025.',
  },
  {
    question: 'What are the costs?',
    answer:
      '• Mini Makers (2-hour sessions): R750 per child.\n• Young Tech Innovators (3-hour sessions): R600 per child.',
  },
  {
    question: 'Do students need to bring their own laptops?',
    answer:
      'No. Sheen Academy supplies laptops and all necessary building kits and materials.',
  },
  {
    question: 'Where is the camp held?',
    answer:
      'Unit C4, Century Square, Heron Cres, Century City, Cape Town.',
  },
  {
    question: 'My child is a beginner, can they join?',
    answer:
      'Absolutely! Both tracks are designed to be beginner-friendly with step-by-step guidance.',
  },
  {
    question: 'Is lunch provided?',
    answer:
      'No full lunch is provided. Students in the afternoon session may bring a light snack for breaks. The sessions are short enough (2 or 3 hours) that meals are usually taken before or after.',
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
                className="w-full text-left py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded-md transition-colors"
              >
                <span className="font-medium text-primary">{item.question}</span>
                <span className="text-xl select-none text-secondary">{isOpen ? '−' : '+'}</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pb-3 px-2"
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