// src/app/(bare)/canvas/codePilot.tsx

"use client";

import React from "react";

interface CodePilotProps {
  code: string; // 当前工作区代码
  onClose: () => void; // 关闭弹窗的回调
  onAnalyze: (code: string) => void; // 分析代码的回调
}

const CodePilot: React.FC<CodePilotProps> = ({ code, onClose, onAnalyze }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(
      () => alert("Code copied to clipboard!"),
      () => alert("Failed to copy code.")
    );
  };

  return (
    <div className="fixed inset-0 bg-body bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg w-3/4 max-w-4xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1>Generated Code</h1>
          <button
            onClick={onClose}
            className="text-body hover:text-body text-lg"
          >
            ✖
          </button>
        </div>
        <textarea
          readOnly
          value={code}
          className="w-full h-60 border rounded p-2 font-mono text-sm bg-light"
        />
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleCopy}
            className="bg-primary text-background px-4 py-2 rounded hover:bg-secondary"
          >
            Copy Code
          </button>
          <button
            onClick={() => onAnalyze(code)}
            className="bg-success text-background px-4 py-2 rounded hover:bg-success"
          >
            Analyze with AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodePilot;
