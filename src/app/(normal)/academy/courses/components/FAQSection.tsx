// src/app/(normal)/academy/courses/components/faqSection.tsx

"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_ITEMS = [
  {
    question: 'What ages are your courses suitable for',
    answer: 'Ages 6 and above.',
  },
  {
    question: 'What qualifications do your instructors have',
    answer: 'We have highly qualified, passionate instructors with backgrounds in Robotics and STEM education.',
  },
  {
    question: 'How long are your courses',
    answer: 'Each lesson is 60 minutes. Intro: 12 lessons, Junior: 24 lessons, Explorer: 48 lessons.',
  },
  {
    question: 'How many children attend per course',
    answer: 'We keep class sizes small with a maximum of 6 learners per session.',
  },
  {
    question: 'Can I observe a class before enrolling my child',
    answer: 'Yes! We offer a free trial session where parents can observe.',
  },
  {
    question: 'How do I reschedule a booked class',
    answer: 'You may reschedule your class with 24-hours prior notice to our academy team via email, WhatsApp, or our bookings system.',
  },
  {
    question: 'What supplies and equipment will my child need for the course',
    answer: 'All hardware and software are provided in our lab—just bring your curiosity!',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-background shadow rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
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
                className="w-full text-left py-3 flex justify-between items-center"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <span className="font-medium">{item.question}</span>
                <span className="text-xl select-none">
                  {isOpen ? '−' : '+'}
                </span>
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
                    <p className="text-darklight">{item.answer}</p>
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
