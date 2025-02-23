// src/app/canvas/page.tsx

"use client";

import React, { useRef, useState } from "react";
import ProtectedRoute from "@/context/ProtectedRoute";
import { routeRoles } from '@/config/routeRoles';
import BlocklyEditor from "./BlocklyEditor";
import type { BlocklyEditorRef } from "./BlocklyEditor";

// Import modularized components
import NavigationHeader from "./projectHeader";
import ConnectButton from "./connectDevice";
import CategoriesList from "./categoriesList";
import BottomBar from "./projectBottom";
import CodePilot from "./codePilot";

interface Project {
  name: string;
  xml: string;
  isSaved: boolean;
}

export default function ProjectCanvasPage() {

  // Left column categories
  const categories = [
    { name: "Logic", color: "bg-red-200", blocks: ["controls_if", "logic_compare", "logic_operation"] },
    { name: "Loops", color: "bg-green-200", blocks: ["controls_repeat_ext", "controls_whileUntil"] },
    { name: "Math", color: "bg-blue-200", blocks: ["math_number"] },
    { name: "Text", color: "bg-yellow-200", blocks: ["text", "text_print"] },
  ];

  // 从BlocklyEditor引用接口，以便在父组件操作 workspace
  const editorRef = useRef<BlocklyEditorRef | null>(null);
  
  // Define project index and active states
  const [projects, setProjects] = useState<Project[]>([
    { name: "Project1", xml: "", isSaved: false },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleSwitchProject(index: number) {
    // Cache old
    const oldXml = editorRef.current?.getWorkspaceXml() || "";
    setProjects((prev) => {
      const copy = [...prev];
      copy[activeIndex].xml = oldXml;
      return copy;
    });
    setActiveIndex(index);
    // Load new
    setTimeout(() => {
      const newXml = projects[index].xml;
      editorRef.current?.loadWorkspaceXml(newXml);
    }, 0);
  }

  function handleNewProject() {
    const oldXml = editorRef.current?.getWorkspaceXml() || "";
    setProjects((prev) => {
      const copy = [...prev];
      copy[activeIndex].xml = oldXml;
      return copy;
    });

    const newName = `Project${projects.length + 1}`;
    setProjects((prev) => [...prev, { name: newName, xml: "", isSaved: false }]);
    setActiveIndex(projects.length);

    // Clear editor
    setTimeout(() => {
      editorRef.current?.loadWorkspaceXml("");
    }, 0);
  }

  function handleSaveProject() {
    const xml = editorRef.current?.getWorkspaceXml() || "";
    console.log("[TestPage] Save =>", xml);
    setProjects((prev) => {
      const copy = [...prev];
      copy[activeIndex].xml = xml;
      copy[activeIndex].isSaved = true;
      return copy;
    });
  }

/*  function handleWorkspaceChange() {
    // 只要工作区一变动，就把当前 project 标记成未保存
    setProjects((prev) => {
      const copy = [...prev];
      if (!copy[activeIndex].isSaved) return prev; // 如果已经标记为未保存，则不重复更新
      copy[activeIndex].isSaved = false;
      return copy;
    });
  }
*/

  // Set display status for showing codePilot popup.
  const [showCodePilot, setShowCodePilot] = useState(false); // 控制 CodePilot 显示状态
  const [currentCode, setCurrentCode] = useState(""); // 存储当前工作区生成的代码
  const handleShowCode = () => {
    if (!editorRef.current) return;
    const code = editorRef.current.generateCode(); // 获取当前代码
    setCurrentCode(code); // 设置代码
    setShowCodePilot(true); // 打开弹窗
  };
  const handleAnalyzeCode = (code: string) => {
    console.log("Analyzing code:", code);
    alert("AI analysis feature is under development."); // 占位功能
  };

  return (
    <ProtectedRoute allowedRoles={routeRoles.canvas}>
      <div className="flex flex-col w-full h-screen">
        {/* Project header */}
        <NavigationHeader
        projects={projects}
        activeIndex={activeIndex}
        onSwitchProject={handleSwitchProject}
        onNewProject={handleNewProject}
        onSaveProject={handleSaveProject}
      />

        {/* Body content: left column + coding area + right controls */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left column: custom categories & blocks */}
          <CategoriesList categories={categories} editorRef={editorRef} />

          {/* Main coding area */}
          <div className="flex-1 relative">
            {/* Top-left corner: connect hardware (just a placeholder) */}
            <ConnectButton onConnect={() => console.log("Connect clicked")} />

            {/* Blockly editor without built-in toolbox) */}
            {/* <BlocklyEditor ref={editorRef} onWorkspaceChange={handleWorkspaceChange} /> */}
            <BlocklyEditor ref={editorRef} />

            {/* Bottom bar: undo/redo on the left, show/run code on the right */}
            <BottomBar editorRef={editorRef} onShowCode={handleShowCode} />
          </div>
        </div>
        
        {/* Render CodePilot Popup */}
        {showCodePilot && (
          <CodePilot
            code={currentCode}
            onClose={() => setShowCodePilot(false)}
            onAnalyze={handleAnalyzeCode}
          />
        )}
      
      </div>
    </ProtectedRoute>
  );
}