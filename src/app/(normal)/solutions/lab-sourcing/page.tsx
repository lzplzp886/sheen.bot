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
  // ① 记录当前可视区块 id
  const [active, setActive] = useState<string>("kits");
  // ② hero 底部后吸顶
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    /* ──滚动吸顶── */
    const onScroll = () => setSticky(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll);

    /* ──区块监测── */
    const sections = ["kits", "infra", "training"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.1 } // 超过 55 % 视为激活
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const links = [
    { href: "#kits", label: "Kits" },
    { href: "#infra", label: "Equipments" },
    { href: "#training", label: "Training" }
  ];

  return (
    <nav
      className={`${
        sticky ? "fixed top-0 left-0 w-full shadow-lg backdrop-blur-md" : "relative"
      } bg-background/90 z-40 transition-all`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex gap-6 font-semibold text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${
                active === l.href.substring(1)
                  ? "text-primary border-b-2 border-primary"
                  : "text-darklight hover:text-primary"
              } pb-1 transition-colors`}
            >
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
      className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-darklight text-background"
    >
      {/* ⬇︎ 叠层改为浅灰（light）且更暗 */}
      <div className="absolute inset-0 bg-[url('/images/solutions/stem-lab.webp')] bg-cover bg-center mix-blend-multiply opacity-70" />
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
/*                Responsive Grid 版 Big-Image Section                */
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
    <section id={id} className="py-24 space-y-16">
      <h2 className="text-3xl font-bold text-center text-darklight px-4">
        {title}
      </h2>

      {/* 1~4 列自适应网格 */}
      <div
        className="
          grid gap-8
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          2xl:grid-cols-4
          max-w-7xl mx-auto
        "
      >
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            className="bg-extralight rounded-lg shadow hover:shadow-lg transition"
          >
            {/* 图片 */}
            <Image
              src={item.img}
              alt={item.title}
              width={600}
              height={400}
              className="w-full h-48 md:h-56 lg:h-52 object-cover rounded-t-lg"
            />

            {/* 文本 */}
            <div className="p-4 space-y-2 flex flex-col h-[calc(100%-12rem)]">
              <div>
                <h3 className="text-lg font-semibold text-primary leading-snug">
                  {item.title}
                </h3>
                {item.stage && <p className="text-xs text-secondary">{item.stage}</p>}
                <p className="text-sm text-darklight line-clamp-3">
                  {(item.features ?? item.specs ?? []).join(" · ")}
                </p>
              </div>

              {/* 价格 + 按钮 */}
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-primary font-bold">{item.price}</span>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background bg-primary px-3 py-1.5 rounded text-xs font-semibold hover:bg-secondary"
                >
                  {id === "kits" ? "Buy" : "View"}
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
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