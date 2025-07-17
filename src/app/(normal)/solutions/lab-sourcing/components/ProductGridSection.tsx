// src/app/(normal)/solutions/lab-sourcing/components/ProductGridSection.tsx

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ProductItem {
  id: string;
  title: string;
  img: string;
  price: string;
  href: string;
  features?: string[];
  specs?: string[];
  stage?: string;
}

export default function ProductGridSection({
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
      <h2 className="text-3xl font-bold text-center text-darklight px-4">{title}</h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 max-w-7xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            className="bg-extralight rounded-lg shadow hover:shadow-lg transition"
          >
            <Image src={item.img} alt={item.title} width={600} height={400} className="w-full h-48 md:h-56 lg:h-52 object-cover rounded-t-lg" />

            <div className="p-4 space-y-2 flex flex-col h-[calc(100%-12rem)]">
              <div>
                <h3 className="text-lg font-semibold text-primary leading-snug">{item.title}</h3>
                {item.stage && <p className="text-xs text-secondary">{item.stage}</p>}
                <p className="text-sm text-darklight line-clamp-3">
                  {(item.features ?? item.specs ?? []).join(" · ")}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-primary font-bold">{item.price}</span>
                <Link href={item.href} target="_blank" rel="noopener noreferrer" className="text-background bg-primary px-3 py-1.5 rounded text-xs font-semibold hover:bg-secondary">
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
