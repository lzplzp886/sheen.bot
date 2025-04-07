// src/app/(bare)/onboarding/popup.tsx

"use client";
import React, { useState } from "react";
import Image from "next/image";
// Example enumerations or constants:
const HARDWARE_OPTIONS = ["Pure Coding", "sheenbot Coding", "Arduino Coding", "micro:bit Coding"];
const MENU_ITEMS = [
  { key: "home", label: "Home" },
  { key: "start", label: "Start" },
  { key: "units", label: "Units" },
  { key: "build", label: "Build" },
  { key: "divider", label: "" },
  { key: "help", label: "Help" },
  { key: "settings", label: "Settings" },
];

export default function ProjectDashboardPopup({ onClose }: { onClose: () => void }) {
  // Left column states
  const [selectedMenuItem, setSelectedMenuItem] = useState("home");
  // Right column states: which hardware is selected
  const [selectedHardware, setSelectedHardware] = useState(HARDWARE_OPTIONS[0]);
  // You might have a separate data structure or separate components for “Home Info” vs “Start/Units/Build” etc.
  // For demo, we just inline some placeholders:
  function renderRightContent() {
    // Example: decide content by selectedMenuItem
    // In real code, you might do a more sophisticated approach or load from an API.
    if (selectedMenuItem === "home") {
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Home Info for {selectedHardware}</h2>
          <p>
            [Coding Hardware info block with images and tutorial link...]
          </p>
          <p className="mt-4">
            [Project dashboard info: “New Project”, “Open Project”, list saved projects...]
          </p>
        </div>
      );
    }
    if (selectedMenuItem === "start") {
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Start / Tutorial for {selectedHardware}</h2>
          <p>[Display tutorial about sensors, boards, etc.]</p>
        </div>
      );
    }
    if (selectedMenuItem === "units") {
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Units / Lessons for {selectedHardware}</h2>
          <p>[Display coding lessons or lesson list...]</p>
        </div>
      );
    }
    if (selectedMenuItem === "build") {
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Build Tutorials for {selectedHardware}</h2>
          <p>[Display robotics kit assembly instructions...]</p>
        </div>
      );
    }
    if (selectedMenuItem === "help") {
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Help</h2>
          <p>[Display sub-menu items: block definitions, tips, etc.]</p>
        </div>
      );
    }
    if (selectedMenuItem === "settings") {
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Settings</h2>
          <p>[Display general settings, language, etc.]</p>
        </div>
      );
    }
    return <div className="p-4">[No content]</div>;
  }

  return (
    <div className="w-full h-full flex flex-row">
      {/* Left Column: 20% width */}
      <div className="w-1/5 bg-extralight p-3">
        <button onClick={onClose} className="mb-3 block">
          <Image
            src="/images/onboarding/close.svg"
            alt="Close Icon"
            className="h-8 w-8 mb-6"
          />
        </button>

      {/* The vertical menu */}
        {MENU_ITEMS.map((item) => {
          if (item.key === "divider") {
            return <hr key="divider" className="my-2" />;
          }
          return (
            <button
              key={item.key}
              onClick={() => setSelectedMenuItem(item.key)}
              className={`block w-full text-left px-2 py-1 rounded mb-1 ${
                selectedMenuItem === item.key 
                ? "bg-secondary text-background"
                : "hover:bg-light hover:text-background"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right Column: 80% width */}
      <div className="w-4/5 overflow-auto">
        {/* Header area: a little top bar with hardware selection */}
        <div className="flex items-center justify-between bg-background p-3 border-b">
          <h1 className="text-2xl font-bold">welcome to sheen.bot</h1>
          <select
            value={selectedHardware}
            onChange={(e) => setSelectedHardware(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {HARDWARE_OPTIONS.map((hw) => (
              <option key={hw} value={hw}>
                {hw}
              </option>
            ))}
          </select>
        </div>
        
      {/* Main content - determined by both “selectedHardware” and “selectedMenuItem” */}
        
        <div className="relative">{renderRightContent()}</div>
      </div>
    </div>
  );
}
