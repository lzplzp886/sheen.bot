// src/app/(normal)/enrollment/layout.tsx

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { WizardProvider } from "./context";
import ProgressBar from "./progress-bar";

// 如果你想防止 Next.js 静态预渲染，可以添加：
// export const dynamic = "force-dynamic";

export default function EnrollmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // 只有当路径里包含 "/step" 时显示进度条
  const shouldShowProgress = pathname.includes("/enrollment/step");

  return (
    <WizardProvider>
      {/* 整个页面铺满屏幕 */}
      <div className="min-h-screen flex flex-col">
        {/* 顶部区域：进度条区域，可保持一定高度 */}
        {shouldShowProgress && (
          <div className="mb-4">
            <ProgressBar />
          </div>
        )}
        {/* 主体区域：填充剩余高度，采用 flex 居中 */}
        <div className="flex-grow flex items-center justify-center">
          {children}
        </div>
      </div>
    </WizardProvider>
  );
}
