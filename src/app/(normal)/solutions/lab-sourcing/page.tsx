// src/app/(normal)/solutions/lab-sourcing/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { kits, infra, training } from "./data";

/* ------------------------------------------------------------------ */
/*                               Types                                */
/* ------------------------------------------------------------------ */
interface ProductItem {
  id: string;
  title: string;
  img: string;
  price: string;
  href: string;
  features?: string[];
  specs?: string[];
  stage?: string;
}

/* ------------------------------------------------------------------ */
/*                          Floating Top-Nav                          */
/* ------------------------------------------------------------------ */
function FloatingNav() {
  // 滑到 hero 底部后吸顶
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`${
        sticky ? "fixed top-0 left-0 w-full shadow-lg backdrop-blur-md" : "relative"
      } bg-background/90 z-40 transition-all`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex gap-6 font-semibold text-darklight text-sm">
          {[
            { href: "#kits", label: "Kits" },
            { href: "#infra", label: "Equipments" },
            { href: "#training", label: "Training" }
          ].map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-primary">
              {l.label}
            </Link>
          ))}
        </div>

        {/* 返回顶部 */}
        <Link
          href="#top"
          className="text-darklight hover:text-primary text-sm font-semibold"
        >
          ↑ Top
        </Link>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*                                 HERO                               */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section
      id="top"
      className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-primary text-background"
    >
      {/* ⬇︎ 叠层改为浅灰（light）且更暗 */}
      <div className="absolute inset-0 bg-[url('/images/solutions/stem-lab.webp')] bg-cover bg-center mix-blend-multiply opacity-40" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center space-y-6 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold">Robotics Lab Sourcing</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          One-stop solution for sourcing&nbsp;
          <span className="text-highlight font-semibold">Robotics Kits</span>,&nbsp;
          <span className="text-highlight font-semibold">Lab Equipments</span>&nbsp;&amp;&nbsp;
          <span className="text-highlight font-semibold">Teacher Training</span>.
        </p>
        <Link
          href="#kits"
          className="inline-block bg-background text-primary font-semibold px-6 py-3 rounded hover:bg-secondary hover:text-background transition"
        >
          Explore Products ↓
        </Link>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*                         Big-Image Flip Section                     */
/* ------------------------------------------------------------------ */
function BigImageSection({
  id,
  title,
  items
}: {
  id: string;
  title: string;
  items: ProductItem[];
}) {
  return (
    <section id={id} className="py-24 space-y-24">
      <h2 className="text-3xl font-bold text-center text-darklight mb-12 px-4">
        {title}
      </h2>

      {items.map((item, i) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.12 * i }}
          className={`relative flex flex-col ${
            i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } items-center max-w-6xl mx-auto`}
        >
          {/* 图片卡片：背景改 extralight，悬停缩放 */}
          <div className="w-full md:w-1/2 bg-extralight p-4 rounded-lg shadow-lg">
            <Image
              src={item.img}
              alt={item.title}
              width={800}
              height={500}
              className="w-full h-auto object-cover rounded-md scale-100 hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* 文本 */}
          <div className="w-full md:w-1/2 p-8 md:py-0 md:px-12 space-y-4">
            <h3 className="text-2xl font-semibold text-primary">{item.title}</h3>
            {item.stage && <p className="text-secondary text-sm">{item.stage}</p>}
            <ul className="list-disc list-inside text-darklight space-y-1">
              {(item.features ?? item.specs ?? []).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="flex items-center gap-4 pt-4">
              <span className="text-primary font-bold text-lg">{item.price}</span>
              <Link
                href={item.href}
                target="_blank"           /* ❶ 新窗口 */
                rel="noopener noreferrer"
                className="text-background bg-primary px-4 py-2 rounded font-semibold hover:bg-secondary"
              >
                {id === "kits" ? "Buy Now" : "View"}
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*                          Training Banner                           */
/* ------------------------------------------------------------------ */
function TrainingSection() {
  return (
    <motion.section
      id="training"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      /* ① section 至少 60 vh，但可随内容自动增高            */
      className="relative min-h-[60vh] text-background overflow-y-visible"
    >
      {/* ② 背景图：absolute + h-full，随 section 拉伸         */}
      <Image
        src={training.img}
        alt="Teacher Training"
        fill   /* >>> 使用 fill 自动覆盖整个容器              */
        priority
        className="object-cover object-center pointer-events-none select-none"
      />

      {/* ③ 遮罩 & 内容：py-16 保证上下留白，栅格同之前         */}
      <div className="relative z-10 w-full h-full bg-body/70 flex flex-col items-center justify-center px-4 text-center py-16 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold">
          Teacher Training Workshop
        </h2>

        <p className="max-w-2xl text-base sm:text-lg md:text-xl">
          {training.desc}
        </p>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-4xl">
          {training.breakdown.map((b) => (
            <div
              key={b.item}
              className="bg-background/20 rounded-lg px-4 py-3 flex flex-col items-center"
            >
              <span className="text-highlight font-semibold whitespace-nowrap">
                {b.item}
              </span>
              <span className="text-background font-bold">{b.cost}</span>
            </div>
          ))}
        </div>

        <p className="text-xl sm:text-2xl font-bold">
          Total:&nbsp;
          <span className="text-primary">{training.priceTotal}</span>
        </p>
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*                              PAGE                                  */
/* ------------------------------------------------------------------ */
export default function RoboticsLabPage() {
  return (
    <main className="bg-background text-body overflow-x-hidden">
      <HeroSection />
      <FloatingNav /> {/* ❸ 浮动顶部导航栏 */}
      <BigImageSection id="kits" title="Robotics Kits" items={kits as ProductItem[]} />
      <BigImageSection id="infra" title="Equipments" items={infra as ProductItem[]} />
      <TrainingSection />
    </main>
  );
}