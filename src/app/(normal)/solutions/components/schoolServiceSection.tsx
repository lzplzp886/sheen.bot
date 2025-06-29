// src/app/(normal)/solutions/components/schoolServiceSection.tsx

"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* 动效 */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

/* ────────────── 主区块 ────────────── */
export default function SchoolServiceSection() {
  return (
    <section id="school-service" className="py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 space-y-32">

        {/* Teacher Development */}
        <ServiceBlock
          title="Teacher&nbsp;Development"
          icon="/images/solutions/teacher-dev.svg"
          desc="Our teacher training equips educators with the skills and confidence to integrate coding & robotics into their classrooms."
          bullets={[
            "Assemble and code hardware like Micro-controllers, Sensors & Motors.",
            "Gain practical experience aligned to Grades 4–9 curriculum.",
            "Teach coding and robotics with confidence today."
          ]}
        />

        {/* Student Workshops */}
        <ServiceBlock
          title="Student&nbsp;Workshops"
          icon="/images/solutions/school-workshops.svg"
          desc="Hands-on sessions designed to ignite curiosity and build foundational coding & robotics skills."
          bullets={[
            "Fun & play-based learning — no prior experience needed.",
            "Develop computational thinking through puzzles & projects.",
            "Collaborative teamwork to tackle real-world challenges."
          ]}
        />

        {/* 统一 CTA 按钮 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: .6, delay: .1 }}
          className="text-center"
        >
          <Link
            href="/solutions/school-service"
            className="bg-primary hover:bg-secondary text-background font-semibold px-8 py-3 rounded shadow-lg transition"
          >
            View Full Service →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

/* ────────────── 单个服务块 ────────────── */
interface BlockProps {
  title:   string;
  icon:    string;
  desc:    string;
  bullets: string[];
}

function ServiceBlock({ title, icon, desc, bullets }: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: .6 }}
      className="flex flex-col items-center text-center"
    >
      {/* 圆角图标 */}
      <Image
        src={icon}
        alt=""
        width={120}
        height={120}
        className="mb-6 rounded-full shadow-md"
      />

      {/* 标题 */}
      <h3
        className="text-3xl md:text-4xl font-extrabold text-darklight mb-4 leading-snug"
        dangerouslySetInnerHTML={{ __html: title }} // 允许 &nbsp;
      />

      {/* 描述 */}
      <p className="text-body max-w-2xl mx-auto mb-6">{desc}</p>

      {/* Bullet list */}
      <ul className="max-w-xl mx-auto space-y-3 text-darklight">
        {bullets.map((t, i) => (
          <li key={i} className="flex items-start gap-2">
            <Image
              src="/images/solutions/bullet.svg"
              alt=""
              width={18}
              height={18}
              className="mt-1 flex-shrink-0"
            />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}