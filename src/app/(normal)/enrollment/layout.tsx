// src/app/(normal)/enrollment/layout.tsx

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { WizardProvider } from "./context";      // 你的WizardContext
import ProgressBar from "./progress-bar";        // 进度条组件

// 如果你想防止Next.js对本路由做静态导出，添加以下行
// export const dynamic = "force-dynamic";

export default function EnrollmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 只有当路径里包含 "/step" （如 /enrollment/step1、/enrollment/step2...）时显示进度条
  const shouldShowProgress = pathname.includes("/enrollment/step");

  return (
    <WizardProvider>
      <div className="p-5">
        {shouldShowProgress && <ProgressBar />}
        {children}
      </div>
    </WizardProvider>
  );
}