// src/app/(normal)/solutions/sheenAcademy.tsx

"use client";
import React, { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import CountUp from "react-countup";

export default function SheenAcademySection() {
  return (
    <section
      id="robotics-lab-sourcing"
      className="relative w-full bg-cover bg-center text-background"
      style={{
        backgroundImage: "url('/images/solutions/stem-lab.webp')",
      }}
    >
      {/* 半透明遮罩 */}
      <div className="absolute inset-0 bg-body bg-opacity-50 z-0" />
      {/* 内容 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/solutions/sheenacademy.png"
            alt="sheen academy"
            width={300}
            height={80}
            className="w-auto max-w-[200px] sm:max-w-[300px]"
          />
        </div>
        <p className="text-2xl sm:text-3xl mb-6">
          A full-house setups with everything a school will need to setup robotics lab.
        </p>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6">
          We set up state-of-the-art furniture, screens, computers, EdTech kits, AI demonstration
          honeycombs, weather stations, and many more. These setups are available for viewing at
          Sheen Academy. Visitors are welcome to experience these setups firsthand.
        </p>
        <a
          href="https://outlook.office365.com/owa/calendar/bookings@sheen.co.za/bookings/s/hoySxD4egEGxts9qTXExkQ2"
          className="inline-flex items-center px-5 py-3 rounded text-background bg-primary hover:bg-secondary mb-10"
        >
          <Image
            src="/images/solutions/book-a-visit.svg"
            alt="Calendar Icon"
            className="w-5 h-5 mr-2"
          />
          Book a Visit
        </a>
        <hr className="my-6 border-body" />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 justify-center items-center">
          <StatItem label="sheenbot∞" end={1} />
          <StatItem label="Robots & Kits" end={7} suffix="+" />
          <StatItem label="Classroom Setups" end={6} />
          <StatItem label="Courses" end={200} suffix="+" />
        </div>
      </div>
    </section>
  );
}

function StatItem({
  label,
  end,
  suffix = "",
}: {
  label: string;
  end: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      <h3 className="text-3xl font-bold mb-1 text-background">
        {isInView ? <CountUp end={end} duration={2} /> : 0}
        {suffix}
      </h3>
      <p className="text-lg">{label}</p>
    </div>
  );
}
