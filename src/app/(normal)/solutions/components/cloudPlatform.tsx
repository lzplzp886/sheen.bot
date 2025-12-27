// src/app/(normal)/solutions/cloudPlatformSection.tsx

"use client";
import React from "react";
import Image from "next/image";

export default function CloudPlatformSection() {
  return (
    <section 
        id="cloud-platform"
        className="relative bg-background"
        >
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
            <h2 className="text-3xl sm:text-4xl text-body font-bold">sheen.bot Architecture</h2>
            </div>

            {/* 段落介绍 */}
            <p className="text-body text-base sm:text-lg md:text-xl mb-6 text-center max-w-2xl mx-auto">
            sheen.bot is built on AWS to deliver a secure, scalable environment where students can learn coding and robotics efficiently. The platform integrates robotics kits with cloud services to enable remote coding and intuitive device control.
            </p>

            {/* 自定义 Bullet Points 列表 */}
            <ul className="space-y-4 text-body max-w-3xl mx-auto mb-10">
            <li className="flex items-start">
                <Image
                src="/images/solutions/bullet.svg"
                alt="Bullet Icon"
                width={16}
                height={16}
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
                width={16}
                height={16}
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
                width={16}
                height={16}
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
                width={16}
                height={16}
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
            width={1200}
            height={800}
            className="w-full h-auto"
            />
        </div>
        </div>
    </section>
  );
}
