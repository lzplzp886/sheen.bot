// src/app/(normal)/solutions/components/schoolServiceSection.tsx

"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function SchoolServiceSection() {
  return (
    <section id="school-service" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 space-y-16">

        {/* Teacher Development Block */}
        <SectionBlock title="Teacher Development" icon="/images/solutions/teacher-dev.svg">
          <p className="text-body mb-6">
            Our teacher training equips educators with the skills and confidence to integrate coding & robotics into their classrooms.
          </p>
          <ul className="space-y-4">
            {[
              "Assemble and code hardware like Microcontrollers, Sensors & Motors.",
              "Gain practical experience aligned to grades 4–9 curriculum.",
              "Teach coding and robotics with confidence today."
            ].map((text, idx) => (
              <li key={idx} className="flex items-start">
                <Image
                  src="/images/solutions/bullet.svg"
                  alt="Bullet Icon"
                  width={20}
                  height={20}
                  className="flex-shrink-0 mt-1 mr-3"
                />
                <span className="text-darklight">{text}</span>
              </li>
            ))}
          </ul>
        </SectionBlock>

        {/* Student Workshops Block */}
        <SectionBlock
          title="Student Workshops"
          icon="/images/solutions/school-workshops.svg"
        >
          <p className="text-body mb-6">
            Hands-on sessions designed to ignite curiosity and build foundational coding & robotics skills.
          </p>
          <ul className="space-y-4">
            {[
              "Fun & play-based learning—no prior experience needed.",
              "Develop computational thinking through puzzles & projects.",
              "Collaborative teamwork to tackle real-world challenges."
            ].map((text, idx) => (
              <li key={idx} className="flex items-start">
                <Image
                  src="/images/solutions/bullet.svg"
                  alt="Bullet Icon"
                  width={20}
                  height={20}
                  className="flex-shrink-0 mt-1 mr-3"
                />
                <span className="text-darklight">{text}</span>
              </li>
            ))}
          </ul>
        </SectionBlock>

      </div>
    </section>
  );
}

function SectionBlock({ title, icon, children, reverse }: { title: string; icon: string; children: React.ReactNode; reverse?: boolean }) {
  // Animation variants for fade-up effect
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6 }}
      className={`md:grid ${reverse ? 'md:grid-cols-[1fr_auto]' : 'md:grid-cols-[auto_1fr]'} gap-4 lg:gap-8`}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mb-4 md:mb-0">
        <Image src={icon} alt={`${title} icon`} width={80} height={80} />
      </div>

      {/* Content */}
      <div className="md:flex-1">
        <h3 className="text-2xl font-bold mb-4 text-darklight">{title}</h3>
        {children}
      </div>
    </motion.div>
  );
}
