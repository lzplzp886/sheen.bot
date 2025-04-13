// src/app/(normal)/enrollment/progress-bar.tsx

"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function ProgressBar() {
  const pathname = usePathname();

  // 假设一共 9 步
  const totalSteps = 9;
  let currentStep = 1;
  if (pathname.includes("step1")) currentStep = 1;
  else if (pathname.includes("step2")) currentStep = 2;
  else if (pathname.includes("step3")) currentStep = 3;
  else if (pathname.includes("step4")) currentStep = 4;
  else if (pathname.includes("step5")) currentStep = 5;
  else if (pathname.includes("step6")) currentStep = 6;
  else if (pathname.includes("step7")) currentStep = 7;
  else if (pathname.includes("step8")) currentStep = 8;
  else if (pathname.includes("step9")) currentStep = 9;

  const percent = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-4">
      {/* 外层容器：bg-secondary, 高度比如 6 或 8 px, 圆角 */}
      <div className="relative w-full h-6 bg-secondary rounded-full overflow-hidden">
        {/* 内层进度条：bg-primary, 并加上斜纹动画 */}
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            width: `${percent}%`,
            // 这里使用线性渐变 + 斜纹背景
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.4) 75%, transparent 75%, transparent)",
            backgroundSize: "20px 20px",
            backgroundColor: "var(--tw-bg-opacity,1) bg-primary", // 仅示意
          }}
        >
          {/* 再加一层让斜纹移动 */}
          <div
            className="w-full h-full bg-primary bg-opacity-70 animate-striped-progress"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.4) 75%, transparent 75%, transparent)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>
      </div>
      {/* Step X of Y... */}
      <p className="text-center mt-1 text-sm">
        Step {currentStep} of {totalSteps} ({Math.round(percent)}%)
      </p>
    </div>
  );
}