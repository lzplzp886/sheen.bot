"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function ProgressBar() {
  const pathname = usePathname();
  // 根据stepX判断当前在第几步
  // 这里仅示例八步 + 第九步 => totalSteps = 9
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

  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-4">
      <div className="w-full bg-gray-300 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-center mt-1 text-sm">
        Step {currentStep} of {totalSteps} ({Math.round(percentage)}%)
      </p>
    </div>
  );
}
