// src/app/(normal)/sheenbotInfinity/components/KitSelectionSection.tsx

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// 套件列表
const kits = [
  { id: "basic", label: "∞ block basic" },
  { id: "tinker", label: "∞ block tinker" },
  { id: "pro", label: "∞ block pro" },
  { id: "smartHome", label: "∞ smart home" },
  { id: "rover", label: "∞ rover" },
  { id: "quadruped", label: "∞ quadruped" },
];

// 每款套件的图片集，第一个为主图，其余为缩略图
const kitImages: Record<string, string[]> = {
  basic: [
    "/images/sheenbotInfinity/kit/block-basic/1.png",
    "/images/sheenbotInfinity/kit/block-basic/2.png",
    "/images/sheenbotInfinity/kit/block-basic/3.png",
    "/images/sheenbotInfinity/kit/block-basic/4.png",
    "/images/sheenbotInfinity/kit/block-basic/5.png",
    "/images/sheenbotInfinity/kit/block-basic/6.png",
    "/images/sheenbotInfinity/kit/block-basic/7.png",
  ],
  tinker: [
    "/images/sheenbotInfinity/kit/block-tinker/1.png",
    "/images/sheenbotInfinity/kit/block-tinker/2.png",
    "/images/sheenbotInfinity/kit/block-tinker/3.png",
    "/images/sheenbotInfinity/kit/block-tinker/4.png",
    "/images/sheenbotInfinity/kit/block-tinker/5.png",
    "/images/sheenbotInfinity/kit/block-tinker/6.png",
    "/images/sheenbotInfinity/kit/block-tinker/7.png",
    "/images/sheenbotInfinity/kit/block-tinker/8.png",
  ],
  pro: [
    "/images/sheenbotInfinity/kit/block-pro/1.png",
    "/images/sheenbotInfinity/kit/block-pro/2.png",
    "/images/sheenbotInfinity/kit/block-pro/3.png",
    "/images/sheenbotInfinity/kit/block-pro/4.png",
    "/images/sheenbotInfinity/kit/block-pro/5.png",
  ],
  smartHome: [
    "/images/sheenbotInfinity/kit/smart-home/1.png",
    "/images/sheenbotInfinity/kit/smart-home/2.png",
    "/images/sheenbotInfinity/kit/smart-home/3.png",
    "/images/sheenbotInfinity/kit/smart-home/4.png",
    "/images/sheenbotInfinity/kit/smart-home/5.png",
    "/images/sheenbotInfinity/kit/smart-home/6.png",
    "/images/sheenbotInfinity/kit/smart-home/7.png",
    "/images/sheenbotInfinity/kit/smart-home/8.png",
  ],
  rover: [
    "/images/sheenbotInfinity/kit/rover/1.png",
    "/images/sheenbotInfinity/kit/rover/2.png",
    "/images/sheenbotInfinity/kit/rover/3.png",
    "/images/sheenbotInfinity/kit/rover/4.png",
    "/images/sheenbotInfinity/kit/rover/5.png",
  ],
  quadruped: [
    "/images/sheenbotInfinity/kit/quadruped/1.png",
    "/images/sheenbotInfinity/kit/quadruped/2.png",
    "/images/sheenbotInfinity/kit/quadruped/3.png",
    "/images/sheenbotInfinity/kit/quadruped/4.png",
    "/images/sheenbotInfinity/kit/quadruped/5.png",
  ],
};

export default function KitSelectionSection() {
  const [openId, setOpenId] = useState<string>(kits[0].id);
  const [selectedTab, setSelectedTab] = useState<string>(kits[0].id);
  const [imageIndices, setImageIndices] = useState<Record<string, number>>(
    kits.reduce((acc, kit) => {
      acc[kit.id] = 0;
      return acc;
    }, {} as Record<string, number>)
  );

  const handleTabClick = (id: string) => {
    setSelectedTab(id);
    setOpenId(id);
  };

  const handleThumbnailClick = (kitId: string, index: number) => {
    setImageIndices(prev => ({
      ...prev,
      [kitId]: index,
    }));
  };

  const renderContent = (id: string) => {
    const images = kitImages[id] || [];
    const currentIndex = imageIndices[id] || 0;

    const titles: Record<string, string> = {
      basic: "Starter kit for coding and robotics with AI board and IoT module",
      tinker: "Advanced kit with AI board, IoT module, sensors, plus building blocks",
      pro: "Professional kit with AI board, IoT module, advanced sensors, plus building blocks",
      smartHome: "Smart home sandbox for IoT experience",
      rover: "Line-following car with grayscale and ultrasonic sensor",
      quadruped: "Robotic dog kit for gait experiments",
    };
    const descs: Record<string, string> = {
      basic: "Packaged in a elegant compacted box, the ∞ block basic kit pairs the AI board with IoT module to introduce beginners to coding and robotics fundamentals.",
      tinker: "Enclosed in a premium gift box, the ∞ block tinker kit adds 230+ LEGO-compatible parts and 8 plug-and-play modules—giving you everything you need to build imaginative mechanisms and interactive experiments.",
      pro: "Presented in a rugged carry case, the ∞ block pro kit bundles 30+ advanced modules—equipping competition teams for high-level robotics and AI challenges.",
      smartHome: "Design your own mini smart home with sensors and actuators to automate real-world scenarios e.g. voice-controlled home assistant, or fire alarm and intruder alert system.",
      rover: "Build an AI-powered tracked rover with range sensors, and dual-motor chassis; learn computer-vision basics as you program obstacle avoidance, path planning, and line-following missions.",
      quadruped: "Bring robotics to life with a four-legged robot kit featuring 12 high-torque servos, rigid frame, and IMU balance sensor—perfect for exploring gait algorithms, inverse kinematics, and dynamic motion control.",
    };

    return (
      <div className="space-y-4">
        <Image
          src={images[currentIndex]}
          alt={`${id} preview`}
          width={360}
          height={360}
          className="mx-auto"
        />
        {/* 缩略图轮播：桌面端居中，移动端左对齐 */}
        <div className="flex overflow-x-auto gap-2 mt-4 p-1 justify-start sm:justify-center">
          {images.map((src, idx) => (
            <div key={idx} className="flex-shrink-0">
              <Image
                src={src}
                alt={`${id} thumbnail ${idx + 1}`}
                width={60}
                height={60}
                className={`object-cover cursor-pointer rounded-md transition ring-1 hover:ring-primary ${
                  idx === currentIndex ? "ring-primary ring-2" : "ring-gray-300"
                }`}
                onClick={() => handleThumbnailClick(id, idx)}
              />
            </div>
          ))}
        </div>
        <h3 className="text-xl text-center font-semibold">{titles[id]}</h3>
        <p className="text-body text-center max-w-2xl mx-auto">{descs[id]}</p>
      </div>
    );
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 text-center">
      <h2 className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2 text-2xl sm:text-3xl font-bold mb-4">
        Creations Matter
      </h2>

      <div className="flex flex-col items-center text-center mb-6">
        <video
          src="/images/sheenbotInfinity/Infinite-Possibilities.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="mb-4"
          width={350}
          height={235}
        />
      </div>

      {/* Desktop 标签页 */}
      <div className="hidden sm:flex justify-center gap-4 mb-6">
        {kits.map((kit) => (
          <button
            key={kit.id}
            onClick={() => handleTabClick(kit.id)}
            className={`px-4 py-2 font-medium ${
              selectedTab === kit.id
                ? "border-b-2 border-primary text-primary"
                : "border-b-2 border-transparent text-darklight"
            } hover:text-primary transition`}
          >
            {kit.label}
          </button>
        ))}
      </div>

      {/* 移动端 手风琴 */}
      <div className="sm:hidden divide-y divide-light mb-6">
        {kits.map((kit) => (
          <div key={kit.id}>
          <button
            onClick={() => {
              setOpenId(openId === kit.id ? "" : kit.id);
              setSelectedTab(kit.id);
            }}
              className="w-full flex justify-between items-center px-4 py-3 bg-background hover:bg-extralight focus:outline-none"
            >
              <span className={`font-medium ${openId === kit.id ? "text-primary" : "text-darklight"}`}>{kit.label}</span>
              <span className={`transform ${openId === kit.id ? "rotate-180" : "rotate-0"}`}>▼</span>
            </button>
            <AnimatePresence initial={false}>
              {openId === kit.id && (
                <motion.div
                  key={kit.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-6 bg-extralight">{renderContent(kit.id)}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* 桌面端 内容区 */}
      <div className="hidden sm:block mb-8">{renderContent(selectedTab)}</div>

      {/* Buy Now & Brochure */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
        <Link
          href={`https://www.sheen.co.za/sheenbot-${selectedTab}`}
          className="px-8 py-3 bg-primary text-white font-bold rounded shadow hover:bg-secondary transition-colors"
        >
          Buy Now
        </Link>
        <Link
          href="/sheenbotInfinity/brochure"
          className="flex items-center text-body font-semibold hover:text-primary transition"
        >
          Product Brochure
        </Link>
      </div>
    </section>
  );
}
