// src/components/tileExpand.tsx

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface TileExpandProps {
  icon: string;
  alt: string;
  title: string;
  description: string;
  videoSrc: string;
}

export default function TileExpand({ icon, alt, title, description, videoSrc }: TileExpandProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 检测移动端 vs 桌面端
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // 移动端翻转动画 variants，带 transition 控制速度
  const flipVariants = {
    closed: {
      rotateY: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    open: {
      rotateY: 180,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  return (
    <>
      {/* 保证网格等高 */}
      <div className="w-full h-full flex flex-col relative">
        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 w-full cursor-pointer flex flex-col items-center justify-center text-center p-5 bg-background rounded-lg shadow hover:shadow-md transition hover:bg-primary relative"
          whileHover={{ scale: 1.05 }}
          animate={isMobile && isOpen ? "open" : "closed"}
          variants={isMobile ? flipVariants : { closed: {}, open: {} }}
          style={isMobile ? { transformStyle: "preserve-3d" } : undefined}
        >
          {/* 正面内容：图标与文字垂直水平居中，并添加 padding */}
          <div
            className="flex flex-col items-center justify-center"
            style={isMobile ? { backfaceVisibility: "hidden", transformStyle: "preserve-3d" } : undefined}
          >
            <Image
              src={icon}
              alt={alt}
              width={50}
              height={50}
              className="p-2 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-body">{description}</p>
          </div>

          {/* 背面内容（移动端翻转后显示） */}
          {isMobile && isOpen && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-background rounded-lg shadow"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <video src={videoSrc} autoPlay loop muted playsInline className="w-full h-auto rounded-lg" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* 桌面端弹出层 */}
      <AnimatePresence>
        {!isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, transition: { duration: 0.3 } }}
              animate={{ scale: 1, transition: { duration: 0.3 } }}
              exit={{ scale: 0.8, transition: { duration: 0.3 } }}
              className="bg-background p-6 rounded-lg shadow-lg max-w-3xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-end mb-2">
                <button onClick={() => setIsOpen(false)} className="text-xl font-bold">×</button>
              </div>
              <video src={videoSrc} autoPlay loop muted playsInline className="w-full h-auto rounded-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
