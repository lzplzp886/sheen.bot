// src/app/canvas/projectHeader.tsx

"use client";

import React from "react";
import { useUser } from "@/context/UserContext";
import ProjectDashboardPopup from "@/app/(bare)/onboarding/popup";
import ProjectTabs from "./projectHeaderTabs";
import Image from "next/image";

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
  const { username } = useUser(); // e.g. read user from context
  const [showDashboard, setShowDashboard] = React.useState(false);

  return (
    <div className="flex items-center justify-between bg-extralight p-2 border-light">
      {/* Left side controls */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="flex items-center justify-center px-3 py-1 rounded"
          onClick={() => setShowDashboard(true)}
        >
          <Image src="/images/onboarding/home.svg" alt="Home Icon" width={32} height={32} />
        </button>
        <span className="text-base">Welcome, {username || "Guest"}</span>
      </div>

      {/* Middle: project tabs */}
      <ProjectTabs
        projects={projects}
        activeIndex={activeIndex}
        onSwitchProject={onSwitchProject}
        onNewProject={onNewProject}
      />

      {/* Right side: Save / Open */}
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

      {/* Popup overlay for the Project Dashboard */}
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
