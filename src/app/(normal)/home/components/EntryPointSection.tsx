// src/app/(normal)/home/components/EntryPointsSection.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const entries = [
  {
    key: "infinity",
    title: "sheenbot∞",
    desc: "Our in-house developed robotics kits for hands-on coding & STEM learning.",
    href: "/infinity",
    icon: "/images/home/icon-infinity.svg",
    external: false,
  },
  {
    key: "solutions",
    title: "solutions",
    desc: "Education and robotics solutions designed for schools and partners.",
    href: "/solutions",
    icon: "/images/home/icon-solutions.svg",
    external: false,
  },
  {
    key: "academy",
    title: "academy",
    desc: "Our extramural academy, learning platform, and open learning resources.",
    href: "/academy",
    icon: "/images/home/icon-academy.svg",
    external: false,
  },
  {
    key: "store",
    title: "store",
    desc: "Explore the latest and most innovative robotics kits and accessories.",
    href: "https://store.sheen.co.za",
    icon: "/images/home/icon-store.svg",
    external: true,
  },
];

export default function EntryPointsSection() {
  return (
    <>
      {entries.map((item, idx) => {
        const Card = (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="
              group h-full rounded-2xl
              bg-background
              border border-primary/10
              shadow-sm
              hover:shadow-lg hover:-translate-y-1 hover:opacity-95
              transition-all duration-300
              p-6
            "
          >
            <div className="flex flex-col h-full">
              {/* Icon */}
              <div className="mb-4">
                <Image
                  src={item.icon}
                  alt={`${item.title} icon`}
                  width={40}
                  height={40}
                />
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold mb-2 text-body group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-darklight flex-1">
                {item.desc}
              </p>

              {/* CTA */}
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                Explore →
              </span>
            </div>
          </motion.div>
        );

        return item.external ? (
          <a
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-full"
          >
            {Card}
          </a>
        ) : (
          <Link key={item.key} href={item.href} className="h-full">
            {Card}
          </Link>
        );
      })}
    </>
  );
}
