"use client";

import React, { useState } from "react";

export default function NavigationHeader() {
  const [projectTabs, setProjectTabs] = useState<string[]>(["Project1"]);
  const [activeTab, setActiveTab] = useState("Project1");

  // For demonstration: mark unsaved changes with asterisk
  const [isSaved, setIsSaved] = useState(false);

  const handleAddTab = () => {
    const newTab = `Project${projectTabs.length + 1}`;
    setProjectTabs([...projectTabs, newTab]);
    setActiveTab(newTab);
    setIsSaved(false);
  };

  const handleSave = () => {
    // TODO: implement saving logic to DB or user profile
    console.log("Saving project...");
    setIsSaved(true);
  };

  const handleOpen = () => {
    // TODO: implement open logic from DB or local
    console.log("Open project...");
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-2 border-b border-gray-300">
      {/* Left side controls */}
      <div className="flex space-x-2">
        <button className="px-3 py-1 rounded bg-blue-500 text-white">Home</button>
        <span>Welcome, Username</span>
      </div>

      {/* Middle: project tabs */}
      <div className="flex space-x-3 items-center">
        {projectTabs.map((tab) => (
          <div key={tab} className="relative">
            <button
              onClick={() => {
                setActiveTab(tab);
                setIsSaved(false);
              }}
              className={`px-2 py-1 rounded ${
                activeTab === tab ? "bg-blue-200" : "bg-gray-50"
              }`}
            >
              {tab}
              {/* Show * if not saved */}
              {!isSaved && activeTab === tab && "*"}
            </button>
            {/* Example “breadcrumb” icon or menu to rename / download code */}
            {/* Could be a dropdown or context menu. We just show placeholders. */}
          </div>
        ))}
        <button onClick={handleAddTab} className="px-3 py-1 bg-green-200 rounded">
          + New
        </button>
      </div>

      {/* Right side: Save / Open buttons */}
      <div className="flex space-x-2">
        <button onClick={handleSave} className="px-3 py-1 bg-blue-500 text-white rounded">
          Save
        </button>
        <button onClick={handleOpen} className="px-3 py-1 bg-white border rounded">
          Open
        </button>
      </div>
    </div>
  );
}
