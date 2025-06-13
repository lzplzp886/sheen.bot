// src/app/(normal)/academy/enrollment/progress-bar.tsx

"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function ProgressBar() {
  const pathname = usePathname();
  const totalSteps = 10;
  let currentStep = 1;

  // 正则匹配 /step(\d+) 结尾的情况
  const match = pathname.match(/step(\d+)$/);
  if (match && match[1]) {
    currentStep = parseInt(match[1], 10);
  }

  const percent = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-4">
      <div className="relative w-full h-6 bg-secondary rounded-t-none rounded-b-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            width: `${percent}%`,
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.4) 75%, transparent 75%, transparent)",
            backgroundSize: "20px 20px",
            backgroundColor: "var(--tw-bg-opacity,1) bg-primary",
          }}
        >
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
      <p className="text-center mt-1 text-sm">
        Step {currentStep} of {totalSteps} ({Math.round(percent)}%)
      </p>
    </div>
  );
}
