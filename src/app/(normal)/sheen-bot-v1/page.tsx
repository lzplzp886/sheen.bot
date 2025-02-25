"use client";

import React from "react";
import ScrollFrameAnimation from "./ScrollFrameAnimation"; // 假设文件路径

const Page: React.FC = () => {
  return (
    <>
      <div style={{ height: "500vh" }} />
      <ScrollFrameAnimation />
      {/* 占位 div 增加页面高度 */}
      <div style={{ height: "500vh" }} />
    </>
  );
};

export default Page;
