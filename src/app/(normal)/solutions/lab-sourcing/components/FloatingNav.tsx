// src/app/(normal)/solutions/lab-sourcing/components/FloatingNav.tsx

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function FloatingNav() {
  const [active, setActive]   = useState<string>("kits");
  const [sticky, setSticky]   = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll);

    const ids = ["kits", "infra", "training"];
    const io  = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.15 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const links = [
    { href: "#kits", label: "Kits" },
    { href: "#infra", label: "Equipments" },
    { href: "#training", label: "Training" }
  ];

  return (
    <nav
      className={`${sticky ? "fixed top-0 left-0 w-full shadow-lg backdrop-blur-md" : "relative"} bg-background/90 z-40`}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex gap-6 font-semibold text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${active === l.href.slice(1) ? "text-primary border-b-2 border-primary" : "text-darklight hover:text-primary"} pb-1 transition`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link href="#top" className="text-darklight hover:text-primary text-sm font-semibold">
          ↑ Top
        </Link>
      </div>
    </nav>
  );
}
