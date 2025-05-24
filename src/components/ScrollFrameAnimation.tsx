// src/components/ScrollFrameAnimation.tsx

"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export interface ScrollFrameAnimatorProps {
  folder: string;
  frameCount: number;
  framesPerViewport: number;
  filePrefix?: string;
  fileExtension?: string;
  padLength?: number;
  viewportWidth?: string | number;
  viewportHeight?: string | number;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

const ScrollFrameAnimator: React.FC<ScrollFrameAnimatorProps> = ({
  folder,
  frameCount,
  framesPerViewport,
  filePrefix = "frame_",
  fileExtension = ".jpg",
  padLength = 4,
  viewportWidth = "100%",
  viewportHeight = "100vh",
  containerStyle,
  containerClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // 1. Helpers now live *inside* the effect closure
    const getImageSrc = (i: number) =>
      `${folder}/${filePrefix}${String(i).padStart(padLength, "0")}${fileExtension}`;

    const preloadImages = () => {
      const imgs: HTMLImageElement[] = [];
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = getImageSrc(i);
        imgs.push(img);
      }
      return imgs;
    };

    const drawCover = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      cw: number,
      ch: number
    ) => {
      const iw = img.width,
        ih = img.height,
        canvasRatio = cw / ch,
        imgRatio = iw / ih;

      let sx = 0,
        sy = 0,
        sw = iw,
        sh = ih;

      if (imgRatio > canvasRatio) {
        sw = ih * canvasRatio;
        sx = (iw - sw) / 2;
      } else {
        sh = iw / canvasRatio;
        sy = (ih - sh) / 2;
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    };

    // 2. Grab refs & setup canvas
    const container = containerRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Preload & draw first frame
    imagesRef.current = preloadImages();
    imagesRef.current[0].onload = () =>
      drawCover(ctx, imagesRef.current[0], canvas.width, canvas.height);

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      const first = imagesRef.current[0];
      if (first.complete) drawCover(ctx, first, canvas.width, canvas.height);
    };
    resizeCanvas();

    // 3. GSAP + ScrollTrigger
    const totalScrollPx = (frameCount / framesPerViewport) * container.clientHeight;
    const obj = { frame: 0 };
    gsap.to(obj, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: `+=${totalScrollPx}`,
        scrub: true,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        const idx = Math.round(obj.frame);
        const img = imagesRef.current[idx];
        if (img.complete) drawCover(ctx, img, canvas.width, canvas.height);
      },
    });

    // 4. Rebind on resize
    const onResize = () => {
      resizeCanvas();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", onResize);
    };
  }, [
    // now only real *props* and config values go here:
    folder,
    frameCount,
    framesPerViewport,
    filePrefix,
    fileExtension,
    padLength,
  ]);

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      style={{
        position: "relative",
        width: viewportWidth,
        height: viewportHeight,
        overflow: "hidden",
        ...containerStyle,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ScrollFrameAnimator;
