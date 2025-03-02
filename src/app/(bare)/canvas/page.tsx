"use client";

import React, { useRef, useState } from "react";
import ProtectedRoute from "@/context/ProtectedRoute";
import { routeRoles } from "@/config/routeRoles";
import BlocklyEditor from "./BlocklyEditor";
import type { BlocklyEditorRef } from "./BlocklyEditor";

// 导入其他组件
import NavigationHeader from "./projectHeader";
import ConnectButton from "./connectDevice";
import BottomBar from "./projectBottom";
import CodePilot from "./codePilot";

interface Project {
  name: string;
  xml: string;
  isSaved: boolean;
}

export default function ProjectCanvasPage() {
  const editorRef = useRef<BlocklyEditorRef | null>(null);

  // 项目状态
  const [projects, setProjects] = useState<Project[]>([
    { name: "Project1", xml: "", isSaved: false },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  // 切换项目时先保存当前 XML，再加载新项目
  function handleSwitchProject(index: number) {
    const oldXml = editorRef.current?.getWorkspaceXml() || "";
    setProjects((prev) => {
      const copy = [...prev];
      copy[activeIndex].xml = oldXml;
      return copy;
    });
    setActiveIndex(index);
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

  // CodePilot 弹窗控制
  const [showCodePilot, setShowCodePilot] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const handleShowCode = () => {
    if (!editorRef.current) return;
    const code = editorRef.current.generateCode();
    setCurrentCode(code);
    setShowCodePilot(true);
  };
  const handleAnalyzeCode = (code: string) => {
    console.log("Analyzing code:", code);
    alert("AI analysis feature is under development.");
  };

  return (
    <ProtectedRoute allowedRoles={routeRoles.canvas}>
      <div className="flex flex-col w-full h-screen">
        <NavigationHeader
          projects={projects}
          activeIndex={activeIndex}
          onSwitchProject={handleSwitchProject}
          onNewProject={handleNewProject}
          onSaveProject={handleSaveProject}
        />
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 relative">
            <ConnectButton onConnect={() => console.log("Connect clicked")} />
            {/* 使用 BlocklyEditor 内置的工具箱，移除了自定义 CategoriesList */}
            <BlocklyEditor ref={editorRef} />
            <BottomBar editorRef={editorRef} onShowCode={handleShowCode} />
          </div>
        </div>
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
