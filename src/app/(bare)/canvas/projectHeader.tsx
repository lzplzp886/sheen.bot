// src/app/(bare)/canvas/projectHeader.tsx

"use client";

import React from "react";
import { useUser } from "@/context/UserContext";
import ProjectDashboardPopup from "@/app/(bare)/onboarding/popup";
import ProjectTabs from "./projectHeaderTabs";
import Image from "next/image";
import Avatar from "@/components/Avatar"; // 引入 Avatar 组件

interface NavigationHeaderProps {
  projects: { name: string; isSaved: boolean }[];
  activeIndex: number;
  onSwitchProject: (index: number) => void;
  onNewProject: () => void;
  onSaveProject: () => void;
}

export default function NavigationHeader({
  projects,
  activeIndex,
  onSwitchProject,
  onNewProject,
  onSaveProject,
}: NavigationHeaderProps) {
  // 直接从 useUser() 获取信息
  const { username, firstName } = useUser();

  const [showDashboard, setShowDashboard] = React.useState(false);

  return (
    <div className="flex items-center justify-between bg-extralight p-2 border-light">
      {/* 左侧：主页按钮、欢迎信息与用户头像 */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="flex items-center justify-center px-3 py-1 rounded"
          onClick={() => setShowDashboard(true)}
        >
          <Image
            src="/images/onboarding/home.svg"
            alt="Home Icon"
            width={32}
            height={32}
          />
        </button>
        <span className="text-base">
          Welcome, {firstName ? firstName : username || "Guest"}
        </span>
        <div className="relative ml-2">
          <Avatar size={40} edit />
        </div>
      </div>

      {/* 中间：项目标签 */}
      <ProjectTabs
        projects={projects}
        activeIndex={activeIndex}
        onSwitchProject={onSwitchProject}
        onNewProject={onNewProject}
      />

      {/* 右侧：保存 / 打开按钮 */}
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={onSaveProject}
          className="px-3 py-1 bg-primary text-background rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => console.log("Open logic not implemented.")}
          className="px-3 py-1 bg-background border rounded"
        >
          Open
        </button>
      </div>

      {/* 弹出项目仪表盘 */}
      {showDashboard && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div
            className="absolute top-0 left-0 w-full h-full bg-body opacity-50"
            onClick={() => setShowDashboard(false)}
          />
          <div className="relative bg-background w-[80%] h-[80%] p-4 rounded shadow-lg">
            <ProjectDashboardPopup onClose={() => setShowDashboard(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
