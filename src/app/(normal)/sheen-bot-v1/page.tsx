// src/app/(normal)/sheen-bot-v1/page.tsx

"use client";

import React from "react";
import ScrollFrameAnimator from "@/components/ScrollFrameAnimation";

export default function Page() {
  return (
    <>
      {/* 
        - folder: 帧图所在目录 
        - frameCount: 总帧数 
        - framesPerViewport: 1 窗口推进 5 帧 
        - viewportHeight: 动画窗口高 400px 
        - viewportWidth: 动画窗口宽 600px 
      */}
      <ScrollFrameAnimator
        folder="/images/product/lawnmower-bot-clear"
        frameCount={25}
        framesPerViewport={15}
        viewportWidth="100%"
        viewportHeight="800px"
        containerStyle={{ margin: "0 auto" }}
      />

      {/* 页面其他内容 */}
      <div style={{ padding: "2rem" }}>
        <h1 className="text-3xl mb-4">Sheen.bot Demo</h1>
        <p>往下滚动，动画将在自定义窗口中播放。</p>
        {/* 足够的滚动高度触发完整动画 */}
        <div style={{ height: "200vh" }} />
      </div>
    </>
  );
}
