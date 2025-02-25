"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frameCount: number = 25;

const getImageSrc = (index: number): string => {
  const paddedIndex: string = String(index).padStart(4, "0");
  return `/images/product/lawnmower-bot/frame_${paddedIndex}.jpg`;
};

const preloadImages = (): HTMLImageElement[] => {
  const images: HTMLImageElement[] = [];
  for (let i = 1; i <= frameCount; i++) {
    const img: HTMLImageElement = new Image();
    img.src = getImageSrc(i);
    images.push(img);
  }
  return images;
};

const ScrollFrameAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  // 新增容器 ref，用作 trigger
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // 设置 canvas 尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    imagesRef.current = preloadImages();

    // 绘制第一帧
    imagesRef.current[0].onload = () => {
      context.drawImage(imagesRef.current[0], 0, 0, canvas.width, canvas.height);
    };

    const obj = { frame: 0 };

    gsap.to(obj, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: container, // 使用容器作为触发器
        start: "top top",
        end: "+=2000",
        scrub: true,
        markers: false, // 调试用，开发完成后可以关闭
      },
      onUpdate: () => {
        const index = Math.round(obj.frame);
        if (imagesRef.current[index] && imagesRef.current[index].complete) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(imagesRef.current[index], 0, 0, canvas.width, canvas.height);
        }
      },
    });

    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // 重绘当前帧
      const index = Math.round(obj.frame);
      if (imagesRef.current[index] && imagesRef.current[index].complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imagesRef.current[index], 0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // 使用一个容器包裹 canvas，该容器会决定滚动区域
    <div ref={containerRef} style={{ height: "200vh", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed", //如果放到页面作为背景则可以改成fixed，滚动则改成absolute
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default ScrollFrameAnimation;
