// src/app/(normal)/solutions/humanoid-solution/page.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HumanoidSolutionPage() {
  return (
    <main className="overflow-hidden">
      {/* ---------- Hero ---------- */}
      <section
        className="relative flex min-h-[60vh] flex-col items-center justify-center bg-fixed bg-cover bg-center px-4 text-center"
        style={{ backgroundImage: "url('/images/solutions/humanoid-solution/agibot-x1.webp')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center"
        >
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-background md:text-5xl">
            Humanoid Robotics&nbsp;
            <span className="text-primary">Solutions</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-background">
            Bring the power of the open-source <strong>AgiBot&nbsp;X1</strong> to your lab or production floor with our
            end-to-end services.
          </p>
          <p className="mt-2 text-sm font-semibold text-secondary">Entry kit priced ≈ R387 K</p>

          {/* CTA Button */}
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-background shadow-lg transition hover:brightness-90"
          >
            Enquire&nbsp;Now
          </Link>
        </motion.div>
      </section>

      {/* ---------- What We Deliver ---------- */}
      <section className="bg-extralight py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-6xl px-4"
        >
          <h2 className="mb-10 text-center text-3xl font-bold text-body">What&nbsp;We&nbsp;Deliver</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ServiceCard icon="🎓" title="Education" desc="Hands‑on workshops & embodied‑AI bootcamps." />
            <ServiceCard icon="🤖" title="Robot rental" desc="Short‑term rentals for expos & open‑day demos." />
            <ServiceCard icon="🛠️" title="Resale & Integration" desc="Hardware kits, on‑site assembly & calibration." />
            <ServiceCard icon="📊" title="Data services" desc="Localized scene capture & dataset creation." />
          </div>
        </motion.div>
      </section>

      {/* ---------- Why X1 Highlights ---------- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto max-w-6xl px-4 py-16"
      >
        <h2 className="mb-10 text-center text-3xl font-bold text-body">Why&nbsp;X1?</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <HighlightCard icon="🦿" title="Lightweight 33 kg" desc="Safe to handle & easy to move in classrooms." />
          <HighlightCard icon="🔧" title="Modular 34 DoF" desc="Swap PowerFlow actuators & expand freedom easily." />
          <HighlightCard icon="📜" title="Full-stack open" desc="BOM, CAD, control code & AIM-RT all open-source." />
          <HighlightCard icon="💡" title="Education ready" desc="Fast assembly, rich docs & affordable kit price." />
        </div>
      </motion.section>

      {/* ---------- Video ---------- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl px-4 py-8"
      >
        <h2 className="mb-6 text-center text-3xl font-bold text-body">See&nbsp;X1 in Action</h2>
        <div className="relative overflow-hidden rounded-2xl shadow-xl" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/ics4Z-hsh88"
            title="AgiBot X1 demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </motion.section>

      {/* ---------- Specs Banner ---------- */}
      <section className="bg-extralight py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 lg:flex-row">
          {/* Robot image */}
          <div className="w-full max-w-sm flex-shrink-0">
            <Image
              src="/images/solutions/humanoid-solution/agibot-x1-single.webp"
              alt="AgiBot X1 robot"
              width={500}
              height={800}
              className="h-auto w-full"
              priority
            />
          </div>

          {/* Specs table */}
          <div className="grid w-full gap-y-4 text-body md:grid-cols-2 md:gap-x-12">
            <SpecItem label="Active Degrees of Freedom" value="34 DoF" />
            <SpecItem label="Height" value="130 cm" />
            <SpecItem label="Weight" value="33 kg" />
            <SpecItem label="Runtime" value="2 h" />
            <SpecItem label="Maximum Walking Speed" value="1 m/s" />
            <SpecItem label="Single-Arm Load" value="0.5 kg" />
          </div>
        </div>
      </section>
    </main>
  );
}

// ---------------- Helper components ----------------

type CardProps = {
  icon: string;
  title: string;
  desc: string;
};

function HighlightCard({ icon, title, desc }: CardProps) {
  return (
    <div className="rounded-2xl border border-light p-6 text-center shadow-md">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-body">{title}</h3>
      <p className="text-sm text-darklight">{desc}</p>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: CardProps) {
  return (
    <div className="rounded-2xl border border-light bg-background p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-body">{title}</h3>
      <p className="text-sm text-darklight">{desc}</p>
    </div>
  );
}

type SpecProps = { label: string; value: string };
function SpecItem({ label, value }: SpecProps) {
  return (
    <div className="flex flex-col gap-1 border-b border-light pb-4 last:border-b-0 md:pb-6">
      <span className="text-sm text-darklight">{label}</span>
      <span className="text-xl font-bold text-body">{value}</span>
    </div>
  );
}