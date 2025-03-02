// src/app/(bare)/canvas/projectHeader.tsx

"use client";

import React from "react";
import { useUser, UserContextType } from "@/context/UserContext";
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

// 扩展 UserContextType，增加可选的 attributes 属性
interface ExtendedUserContextType extends UserContextType {
  attributes?: Record<string, string>;
}

export default function NavigationHeader({
  projects,
  activeIndex,
  onSwitchProject,
  onNewProject,
  onSaveProject,
}: NavigationHeaderProps) {
  const user = useUser() as ExtendedUserContextType;
  const { username, firstName } = user;

  const [showDashboard, setShowDashboard] = React.useState(false);

  const handleAvatarClick = () => {
    console.log("Avatar clicked");
    // 此处可扩展为弹出头像编辑界面
  };

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
          <Avatar size={48} onClick={handleAvatarClick} />
          {/* 编辑图标覆盖在头像右下角 */}
          <div className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M4 13.5V20h6.5l9.586-9.586a2 2 0 00-2.828-2.828L4 13.5z"
              />
            </svg>
          </div>
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
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => console.log("Open logic not implemented.")}
          className="px-3 py-1 bg-white border rounded"
        >
          Open
        </button>
      </div>

      {/* 弹出项目仪表盘 */}
      {showDashboard && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
            onClick={() => setShowDashboard(false)}
          />
          <div className="relative bg-white w-[80%] h-[80%] p-4 rounded shadow-lg">
            <ProjectDashboardPopup onClose={() => setShowDashboard(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
