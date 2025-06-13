// src/app/(normal)/sheenbotInfinity/components/KitSelectionSection.tsx

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// 套件列表
const kits = [
  { id: "basic", label: "∞ Block Basic" },
  { id: "tinker", label: "∞ Block Tinker" },
  { id: "smartHome", label: "∞ Smart Home" },
  { id: "aiCar", label: "∞ AI Car" },
  { id: "quadruped", label: "∞ Quadruped" },
];

// 每款套件的图片集，第一个为主图，其余为缩略图
const kitImages: Record<string, string[]> = {
  basic: [
    "/images/sheenbotInfinity/kit/block-basic-kit.png",
    "/images/sheenbotInfinity/kit/block-basic-kit-1.png",
    "/images/sheenbotInfinity/kit/block-basic-kit-2.png",
  ],
  tinker: [
    "/images/sheenbotInfinity/kit/block-tinker-kit.png",
  ],
  smartHome: [
    "/images/sheenbotInfinity/kit/smart-home-kit.png",
    "/images/sheenbotInfinity/kit/smart-home-kit-1.png",
    "/images/sheenbotInfinity/kit/smart-home-kit-2.png",
    "/images/sheenbotInfinity/kit/smart-home-kit-3.png",
    "/images/sheenbotInfinity/kit/smart-home-kit-4.png",
  ],
  aiCar: [
    "/images/sheenbotInfinity/kit/ai-car-kit.png",
  ],
  quadruped: [
    "/images/sheenbotInfinity/kit/quadruped-kit.png",
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
      basic: "Starter kit for coding and robotics with blocks",
      tinker: "Advanced kit for coding and robotics with blocks",
      smartHome: "Smart home sandbox experience kit",
      aiCar: "Vision-enabled AI car with mecanum wheels",
      quadruped: "Robotic dog kit for gait experiments.",
    };
    const descs: Record<string, string> = {
      basic: "Packaged in a sleek metal gift box, the ∞ Block Basic kit includes 6 essential sensors and actuators—such as a temperature sensor, ultrasonic sensor, and servo motor—to introduce beginners to coding and robotics fundamentals.",
      tinker: "Enclosed in a premium metal gift box, the ∞ Block Tinker kit comes with over 12 sensors and actuators, plus LEGO-compatible elements—giving you everything you need to build complex projects and hands-on experiments.",
      smartHome: "Design your own mini smart home with temperature, humidity, motion, and fire sensors. Includes servo-driven door mechanism, relay module for lights, and example code to automate real-world scenarios.",
      aiCar: "Build an AI-powered vehicle with Mecanum wheels, camera module, distance sensors, and motor controller. Learn computer vision basics as you program obstacle avoidance and line-following routines.",
      quadruped: "Bring robotics to life with a four-legged robot kit. Features 8 high-torque servos, structural frame, and balance sensors—perfect for exploring gait algorithms and advanced motion control.",
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
        Unlock infinite creations
      </h2>

      <div className="flex flex-col items-center text-center mb-6">
        <video
          src="/images/sheenbotInfinity/Infinite-Possibilities.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="mb-4"
          width={700}
          height={470}
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
      <div className="sm:hidden divide-y divide-light">
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
          href={`https://www.sheen.co.za/sheenbot-infinity-${selectedTab}`}
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
