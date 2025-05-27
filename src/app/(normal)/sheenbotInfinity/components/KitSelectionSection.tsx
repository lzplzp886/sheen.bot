// src/app/(normal)/sheenbotInfinity/components/KitSelectionSection.tsx

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const kits = [
  { id: "basic", label: "∞ Block Basic" },
  { id: "tinker", label: "∞ Block Tinker" },
  { id: "smartHome", label: "∞ Smart Home" },
  { id: "aiCar", label: "∞ AI Car" },
  { id: "quadruped", label: "∞ Quadruped" },
];

export default function KitSelectionSection() {
  const [openId, setOpenId] = useState<string>("basic");
  const [selectedTab, setSelectedTab] = useState<string>("basic");

  const handleTabClick = (id: string) => {
    setSelectedTab(id);
    setOpenId(id);
  };

  const renderContent = (id: string) => {
    switch (id) {
      case "basic":
        return (
          <div className="space-y-4">
            <Image
              src="/images/sheenbotInfinity/kit/block-basic-kit.png"
              alt="∞ Block Basic Kit"
              width={360}
              height={360}
              className="mx-auto"
            />
            <h3 className="text-xl text-center font-semibold">Starter kit for coding and robotics with blocks</h3>
            <p className="text-body text-center max-w-2xl mx-auto">
              Packaged in a sleek metal gift box, the ∞ Block Basic kit includes 6 essential sensors and actuators—such as a temperature sensor, ultrasonic sensor, and servo motor—to introduce beginners to coding and robotics fundamentals.
            </p>
          </div>
        );
      case "tinker":
        return (
          <div className="space-y-4">
            <Image
              src="/images/sheenbotInfinity/kit/block-tinker-kit.png"
              alt="∞ Block Tinker Kit"
              width={360}
              height={360}
              className="mx-auto"
            />
            <h3 className="text-xl text-center font-semibold">Advanced kit for coding and robotics with blocks</h3>
            <p className="text-body text-center max-w-2xl mx-auto">
              Enclosed in a premium metal gift box, the ∞ Block Tinker kit comes with over 12 sensors and actuators, plus LEGO-compatible elements—giving you everything you need to build complex projects and hands-on experiments.
            </p>
          </div>
        );
      case "smartHome":
        return (
          <div className="space-y-4">
            <Image
              src="/images/sheenbotInfinity/kit/smart-home-kit.png"
              alt="∞ Smart Home Kit"
              width={360}
              height={360}
              className="mx-auto"
            />
            <h3 className="text-xl text-center font-semibold">Smart home sandbox experience kit</h3>
            <p className="text-body text-center max-w-2xl mx-auto">
              Design your own mini smart home with temperature, humidity, motion, and fire sensors. Includes servo-driven door mechanism, relay module for lights, and example code to automate real-world scenarios.
            </p>
          </div>
        );
      case "aiCar":
        return (
          <div className="space-y-4">
            <Image
              src="/images/sheenbotInfinity/kit/ai-car-kit.png"
              alt="∞ AI Car Kit"
              width={360}
              height={360}
              className="mx-auto"
            />
            <h3 className="text-xl text-center font-semibold">Vision-enabled AI car with mecanum wheels</h3>
            <p className="text-body text-center max-w-2xl mx-auto">
              Build an AI-powered vehicle with Mecanum wheels, camera module, distance sensors, and motor controller. Learn computer vision basics as you program obstacle avoidance and line-following routines.
            </p>
          </div>
        );
      case "quadruped":
        return (
          <div className="space-y-4">
            <Image
              src="/images/sheenbotInfinity/kit/quadruped-kit.png"
              alt="∞ Quadruped Kit"
              width={360}
              height={360}
              className="mx-auto"
            />
            <h3 className="text-xl text-center font-semibold">Robotic dog kit for gait experiments.</h3>
            <p className="text-body text-center max-w-2xl mx-auto">
              Bring robotics to life with a four-legged robot kit. Features 8 high-torque servos, structural frame, and balance sensors—perfect for exploring gait algorithms and advanced motion control.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 text-center">
      {/* Desktop Tabs */}
      <h2
        className="
          flex flex-wrap 
          md:flex-nowrap 
          items-center justify-center 
          gap-2 
          text-2xl sm:text-3xl 
          font-bold mb-4
        "
      >
        <span>Unlock infinite creations</span>
      </h2>
      {/* Buy Now + Brochure */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
        <Link
          href="/sheenbotInfinity/order"
          className="px-8 py-3 bg-body text-background font-bold rounded shadow hover:bg-light transition-colors"
        >
          Order Now
        </Link>
        <Link
          href="/sheenbotInfinity/brochure"
          className="flex items-center text-body font-semibold hover:text-primary transition"
        >
          Product Brochure
        </Link>
      </div>
      <div className="flex flex-col items-center text-center">
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
      <div className="hidden sm:flex justify-center gap-4 mb-6">
        {kits.map((kit) => (
          <button
            key={kit.id}
            onClick={() => handleTabClick(kit.id)}
            className={`
              px-4 py-2 font-medium
              ${selectedTab === kit.id
                ? "border-b-2 border-primary text-primary"
                : "border-b-2 border-transparent text-darklight"}
              hover:text-primary transition
            `}
          >
            {kit.label}
          </button>
        ))}
      </div>

      {/* Mobile Accordion */}
      <div className="sm:hidden divide-y divide-light">
        {kits.map((kit) => (
          <div key={kit.id} className="">
            <button
              onClick={() => setOpenId(openId === kit.id ? "" : kit.id)}
              className="w-full flex justify-between items-center px-4 py-3 bg-background hover:bg-extralight focus:outline-none"
            >
              <span
                className={`font-medium transition-colors ${
                  openId === kit.id ? "text-primary" : "text-darklight"
                }`}
              >
                {kit.label}
              </span>
              <span
                className={`transform transition-transform ${
                  openId === kit.id ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
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
                  <div className="px-4 py-6 bg-extralight">
                    {renderContent(kit.id)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Desktop Content Panel */}
      <div className="hidden sm:block">
        {renderContent(selectedTab)}
      </div>
    </section>
  );
}
