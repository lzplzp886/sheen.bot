// src/app/(normal)/home/components/HeroSection.tsx

"use client";
import React, { useEffect, useState } from "react";

export default function HeroSection() {
  const [headline, setHeadline] = useState("");
  const [subtext, setSubtext]   = useState("");

  useEffect(() => {
    const h = "welcome to sheen.bot";
    const s = "a smarter way to learn coding & robotics";

    /* headline 先打完，再开启 subtext */
    let subTimer: NodeJS.Timeout | null = null;

    const headTimer: NodeJS.Timeout = setInterval(() => {
      setHeadline((prev) => {
        const next = h.slice(0, prev.length + 1);

        /* 标题打完后，开始副标题计时器 */
        if (next === h) {
          clearInterval(headTimer);
          subTimer = setInterval(() => {
            setSubtext((p) => {
              const nxt = s.slice(0, p.length + 1);
              if (nxt === s && subTimer) clearInterval(subTimer);
              return nxt;
            });
          }, 50);
        }
        return next;
      });
    }, 50);

    /* 清理 */
    return () => {
      clearInterval(headTimer);
      if (subTimer) clearInterval(subTimer);
    };
  }, []);

  return (
    <section className="relative isolate flex items-center justify-center text-center text-background min-h-screen">
      {/* 背景视频 */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ filter: "brightness(0.7)" }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/images/home/video.mp4" type="video/mp4" />
      </video>

      {/* 打字机文本 */}
      <div className="relative z-10 px-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{headline}</h1>
        <p className="text-xl sm:text-2xl">{subtext}</p>
      </div>
    </section>
  );
}