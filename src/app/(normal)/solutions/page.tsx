// src/app/solutions/page.tsx

"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <main className="relative w-full min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative">
        {/* 斜切背景：可根据需要修改 clip-path、透明度等 */}
        <div
          className="absolute top-0 left-0 w-full h-full -z-10 angled-bg"
          style={{
            backgroundImage: "url('/images/solutions/background.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backgroundBlendMode: "multiply",
          }}
        />
        {/* Hero 内容 */}
        <div className="max-w-6xl mx-auto px-4 py-20 text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Explore sheen.bot</h1>
          <p className="text-base sm:text-lg max-w-xl mb-6">
            Our AI-empowered education platform enables students to learn, create and manage
            embodied intelligence remotely while coding smarter and more efficiently.
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <button className="inline-block border border-black bg-black text-white font-bold px-5 py-3 rounded shadow hover:bg-gray-800 hover:border-gray-800">
                Start For Free
              </button>
            </Link>
            <a
              href="#sheenbotacademy"
              className="inline-block text-white font-bold px-5 py-3 rounded transition-colors duration-300 hover:bg-transparent hover:underline"
            >
              Learn More →
            </a>
          </div>
        </div>
      </section>

      {/* 信息区块 */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl sm:text-4xl text-black font-bold mb-8 text-center">What We Offer</h2>
        <p className="text-black text-base sm:text-lg md:text-xl mb-10 text-center max-w-2xl mx-auto">
          We provide a comprehensive suite of educational resources, competitions, and AI-driven
          tools that empower learners of all ages to embrace the future of robotics.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Competition Consulting */}
          <div className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="mb-4">
              <Image
                src="/images/solutions/competition-consulting.svg"
                alt="Competition Consulting Icon"
                width={50}
                height={50}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Competition Consulting</h3>
            <p className="text-base sm:text-lg">
              Expert guidance for AI and robotics competitions.
            </p>
          </div>

          {/* Robotics Lab Sourcing */}
          <div className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="mb-4">
              <Image
                src="/images/solutions/lab-sourcing.svg"
                alt="Robotics Lab Sourcing Icon"
                width={50}
                height={50}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Robotics Lab Sourcing</h3>
            <p className="text-base sm:text-lg">
              Supply resources to set up and maintain the robotics lab.
            </p>
          </div>

          {/* Public Services */}
          <div className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="mb-4">
              <Image
                src="/images/solutions/public-services.svg"
                alt="Public Services Icon"
                width={50}
                height={50}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Public Services</h3>
            <p className="text-base sm:text-lg">
              Teacher Training, Talent Development and STEM Events.
            </p>
          </div>

          {/* Equipment Rental */}
          <div className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="mb-4">
              <Image
                src="/images/solutions/equipment-rental.svg"
                alt="Equipment Rental Icon"
                width={50}
                height={50}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Equipment Rental</h3>
            <p className="text-base sm:text-lg">
              High-quality robots and equipment tailored to your on-demand needs.
            </p>
          </div>

          {/* Learning Resources */}
          <div className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="mb-4">
              <Image
                src="/images/solutions/learning-resources.svg"
                alt="Learning Resources Icon"
                width={50}
                height={50}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Learning Resources</h3>
            <p className="text-base sm:text-lg">
              Coding &amp; Robotics Curriculums accessible from an online portal.
            </p>
          </div>

          {/* Cloud Platform */}
          <div className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="mb-4">
              <Image
                src="/images/solutions/cloud-platform.svg"
                alt="Cloud Platform Icon"
                width={50}
                height={50}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cloud Platform</h3>
            <p className="text-base sm:text-lg">
              AI and IoT Cloud solutions to optimize efficiency and connectivity.
            </p>
          </div>
        </div>
      </section>

      {/* Sheen Academy 区块（放在 Architecture 前） */}
      <SheenAcademySection />

      <section className="relative bg-white">
        <div className="relative w-full py-10">
          <div className="max-w-6xl mx-auto px-4">
            {/* 标题 + 图标 */}
            <div className="flex items-center justify-center mb-6">
              <Image
                src="/images/solutions/io.svg"
                alt="IO Icon"
                width={32}
                height={32}
                className="mr-2"
              />
              <h2 className="text-3xl sm:text-4xl text-black font-bold">sheen.bot Architecture</h2>
            </div>

            {/* 段落介绍 */}
            <p id="sheenbotarchitecture" className="text-black text-base sm:text-lg md:text-xl mb-6 text-center max-w-2xl mx-auto">
              sheen.bot is built on AWS to deliver a secure, scalable environment where students can learn coding and robotics efficiently. The platform integrates robotics kits with cloud services to enable remote coding and intuitive device control.
            </p>

            {/* 自定义 Bullet Points 列表 */}
            <ul className="space-y-4 text-body max-w-3xl mx-auto mb-10">
              <li className="flex items-start">
                <Image
                  src="/images/solutions/bullet.svg"
                  alt="Bullet Icon"
                  className="w-4 h-4 mr-3 flex-shrink-0 mt-1"
                />
                <p className="text-sm sm:text-base">
                  <strong>Real-Time Learning:</strong> Instant feedback from real devices fosters deeper engagement.
                </p>
              </li>

              <li className="flex items-start">
                <Image
                  src="/images/solutions/bullet.svg"
                  alt="Bullet Icon"
                  className="w-4 h-4 mr-3 flex-shrink-0 mt-1"
                />
                <p className="text-sm sm:text-base">
                  <strong>AI-Powered Coding:</strong> Integrated LLM suggestions help students code faster and more accurately.
                </p>
              </li>

              <li className="flex items-start">
                <Image
                  src="/images/solutions/bullet.svg"
                  alt="Bullet Icon"
                  className="w-4 h-4 mr-3 flex-shrink-0 mt-1"
                />
                <p className="text-sm sm:text-base">
                  <strong>Scalable &amp; Secure:</strong> AWS-powered authentication and IoT provisioning provide robust security for classroom or enterprise-scale deployments.
                </p>
              </li>

              <li className="flex items-start">
                <Image
                  src="/images/solutions/bullet.svg"
                  alt="Bullet Icon"
                  className="w-4 h-4 mr-3 flex-shrink-0 mt-1"
                />
                <p className="text-sm sm:text-base">
                  <strong>Comprehensive Analytics:</strong> Monitor progress and performance with user-friendly dashboards for teachers, schools, and administrators.
                </p>
              </li>
            </ul>

            {/* 架构图（全宽、无阴影） */}
            <Image
              src="/images/solutions/sheen-bot-architecture.png"
              alt="sheen.bot Architecture"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
      
      {/* 内嵌样式：调整斜切背景在移动端的 clip-path */}
      <style jsx>{`
        .angled-bg {
          clip-path: polygon(0 0, 100% 0, 100% 60%, 0 100%);
        }
        @media (max-width: 640px) {
          .angled-bg {
            clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
          }
        }
      `}</style>
    </main>
  );
}

/**
 * Sheen Academy 区块
 * 背景图 + 半透明遮罩 + LOGO + 文本 + Book a Visit 按钮 + 计数器
 */
function SheenAcademySection() {
  return (
    <section
      id="sheenbotacademy"
      className="relative w-full bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/images/solutions/stem-lab.webp')",
      }}
    >
      {/* 半透明遮罩：黑色 50% 透明度 */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

      {/* 内容容器：z-10 保证在遮罩之上 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
        {/* 用LOGO替换标题文字 */}
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

        {/* Book a Visit 按钮（带日历图标） */}
        <a
          href="https://outlook.office365.com/owa/calendar/bookings@sheen.co.za/bookings/s/hoySxD4egEGxts9qTXExkQ2"
          className="inline-flex items-center px-5 py-3 rounded text-white bg-primary hover:bg-secondary mb-10"
        >
          <Image
            src="/images/solutions/book-a-visit.svg"
            alt="Calendar Icon"
            className="w-5 h-5 mr-2"
          />
          Book a Visit
        </a>

        {/* 分隔线 */}
        <hr className="my-6 border-body" />

        {/* 计数区块：移动端 2 列，md 及以上 4 列 */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 justify-center items-center">
          <StatItem label="Robots & Kits" end={50} suffix="+" />
          <StatItem label="Classroom Styles" end={6} />
          <StatItem label="Online Courses" end={200} suffix="+" />
          <StatItem label="Demo Setups" end={3} />
        </div>
      </div>
    </section>
  );
}

/**
 * 单个统计项，适用于 SheenAcademySection
 * 与 CounterItem 类似，但支持 suffix 等其他属性
 */
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
