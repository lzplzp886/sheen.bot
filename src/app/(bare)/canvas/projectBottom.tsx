// src/app/(bare)/canvas/projectBottom.tsx

"use client";

import React from "react";
import type { BlocklyEditorRef } from "./BlocklyEditor";

interface BottomBarProps {
  editorRef: React.RefObject<BlocklyEditorRef | null>;
  onShowCode: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ editorRef, onShowCode }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-light p-2 border-t border-light flex justify-between items-center">
      {/* Left section: Undo/Redo */}
      <div className="space-x-2">
        <button onClick={() => editorRef.current?.undo()} className="px-3 py-1 bg-light rounded">
          Undo
        </button>
        <button onClick={() => editorRef.current?.redo()} className="px-3 py-1 bg-light rounded">
          Redo
        </button>
      </div>

      {/* Right section: Show/Run Code */}
      <div className="space-x-2">
        <button onClick={onShowCode} className="px-3 py-1 bg-secondary00 rounded">
          Show Code
        </button>
        <button
          onClick={() => editorRef.current?.runCode()}
          className="px-3 py-1 bg-purple-200 rounded"
        >
          Run Code
        </button>
      </div>
    </div>
  );
};

export default BottomBar;