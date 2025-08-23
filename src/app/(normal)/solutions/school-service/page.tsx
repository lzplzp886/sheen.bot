// src/app/(normal)/solutions/school-service/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/* ────────────── 工具类型 ────────────── */
interface Bullet { icon?: string; text: string; }
interface SectionProps {
  id: string;
  hero: string;
  logo?: string;
  titleLines: string[];
  tagline: string;
  intro: string;
  bullets: Bullet[];
  infoBoxTitle: string;
  infoBoxContent: string[];
  session: string;
  ctaHref: string;
}

/* ────────────── 动效 preset ────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show:   { opacity: 1, y: 0 }
};

/* ────────────── Floating Nav ────────────── */
function FloatingNav() {
  const [sticky, setSticky]   = useState(false);
  const [active, setActive]   = useState("students");

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll);

    /* 高亮切换 */
    const ids = ["students", "teachers"];
    const io  = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.25 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const tabs = [
    { href: "#students", label: "Student Courses" },
    { href: "#teachers", label: "Teacher Training" }
  ];

  return (
    <nav
      className={`${sticky ? "fixed top-0 w-full shadow-lg backdrop-blur-md" : "relative"}
                  bg-background/95 z-40 transition-all`}
    >
      <div className="max-w-6xl mx-auto h-14 flex items-center justify-between px-4">
        <div className="flex gap-6 text-sm font-semibold">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`pb-1 transition ${
                active === t.href.substring(1)
                  ? "text-primary border-b-2 border-primary"
                  : "text-darklight hover:text-primary"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
        <Link href="#top" className="text-darklight hover:text-primary text-sm font-semibold">
          ↑ Top
        </Link>
      </div>
    </nav>
  );
}

/* ────────────── 通用 section ────────────── */
function ServiceSection({
  id, hero, logo, titleLines, tagline, intro, bullets,
  infoBoxTitle, infoBoxContent, session, ctaHref
}: SectionProps) {
  return (
    <section id={id} className="relative min-h-[90vh] text-background">
      {/* 背景图 & 遮罩 (均 z-0) */}
      <Image
        fill
        priority
        src={hero}
        alt=""
        className="object-cover object-center z-0 pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-body/70 z-0" />

      {/* 主内容 (z-10) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 flex flex-col gap-12">
        {/* logo / 副图 */}
        {logo && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: .6 }}
            className="self-center"
          >
            <Image
              src={logo}
              alt="logo"
              width={140}
              height={140}
              className="rounded-full shadow-lg"
            />
          </motion.div>
        )}

        {/* 标题 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: .6, delay: .1 }}
          className="text-center space-y-3"
        >
          {titleLines.map((t) => (
            <h2
              key={t}
              className="text-3xl md:text-5xl font-extrabold tracking-wide text-highlight drop-shadow"
            >
              {t}
            </h2>
          ))}
          <p className="text-lg md:text-xl font-semibold">{tagline}</p>
        </motion.div>

        {/* 简介 */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: .6, delay: .2 }}
          className="max-w-2xl mx-auto text-base md:text-lg text-extralight"
        >
          {intro}
        </motion.p>

        {/* bullets */}
        <motion.ul
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: .6, delay: .3 }}
          className="max-w-2xl mx-auto space-y-2 text-base md:text-lg"
        >
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-highlight">✹</span>
              <span>{b.text}</span>
            </li>
          ))}
        </motion.ul>

        {/* info box */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: .6, delay: .4 }}
          className="bg-light/20 rounded-lg p-6 max-w-3xl mx-auto space-y-4"
        >
          <h3 className="text-background text-xl font-bold">{infoBoxTitle}</h3>
          <ul className="list-disc list-inside space-y-1">
            {infoBoxContent.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="bg-background/30 inline-block mt-4 px-4 py-2 rounded">
            <span className="font-semibold">Session Duration:&nbsp;</span>{session}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: .6, delay: .5 }}
          className="text-center"
        >
          <Link
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-secondary text-background font-semibold px-6 py-3 rounded shadow-lg transition"
          >
            Get in touch →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────── 数据 ────────────── */
const studentSection: SectionProps = {
  id: "students",
  hero: "/images/solutions/school-service/student-hero.webp",
  logo: "/images/solutions/school-service/sheen-academy-logo.png",
  titleLines: ["CODING & ROBOTICS", "FOR SCHOOLS"],
  tagline : "Bringing Coding & Robotics to Your School!",
  intro   : "Are you looking for exciting and engaging ways to introduce your young learners to the world of technology?",
  bullets : [
    { text: "Fun & play-based learning — no prior experience needed." },
    { text: "Develop computational thinking through puzzles & projects." },
    { text: "Boost problem-solving skills with systematic challenges." },
    { text: "Collaborative teamwork to tackle real-world goals together." }
  ],
  infoBoxTitle   : "Programme Structure",
  infoBoxContent : [
    "Foundation Phase (Grades R-3) — unplugged coding & beginner robotics",
    "Intermediate Phase (Grades 4-6) — block-based coding with sensors",
    "Senior Phase (Grades 7-9) — block-based coding & micro:bit robotics"
  ],
  session : "1 - 2 hours per session",
  ctaHref : "mailto:academy@sheen.co.za?subject=Student%20Courses%20Enquiry"
};

const teacherSection: SectionProps = {
  id: "teachers",
  hero: "/images/solutions/school-service/teacher-hero.webp",
  logo: "/images/solutions/school-service/sheen-academy-logo.png",
  titleLines: ["CODING & ROBOTICS", "TEACHER DEVELOPMENT"],
  tagline : "Bringing Coding & Robotics to Your School!",
  intro   : "Our teacher training equips educators with the skills and confidence to integrate coding and robotics into their classrooms.",
  bullets : [
    { text: "Assemble and code hardware such as Arduino • Motors • Ultrasonic sensors & more." },
    { text: "Gain practical experience aligned to Grades 4-9 curriculum." },
    { text: "Teach coding and robotics with confidence." }
  ],
  infoBoxTitle   : "Introduction Workshops",
  infoBoxContent : [
    "Scratch • Micro-bit • Spike Prime",
    "WhalesBot • sheenbot∞",
    "3D Printing & Classroom Integration"
  ],
  session : "1 - 2 hours per session",
  ctaHref : "mailto:academy@sheen.co.za?subject=Teacher%20Training%20Enquiry"
};

/* ────────────── 页面组件 ────────────── */
export default function SchoolServicePage() {
  return (
    <main id="top" className="bg-background text-body overflow-x-hidden">
      <FloatingNav />
      <ServiceSection {...studentSection} />
      <ServiceSection {...teacherSection} />
    </main>
  );
}
