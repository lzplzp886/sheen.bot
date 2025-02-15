// src/app/canvas/blockButton.tsx

"use client";

import React from "react";
import type { BlocklyEditorRef } from "./BlocklyEditor";

interface BlockButtonProps {
  blockType: string;
  editorRef: React.RefObject<BlocklyEditorRef | null>;
}

const BlockButton: React.FC<BlockButtonProps> = ({ blockType, editorRef }) => {
  return (
    <button
      onClick={() => {
        editorRef.current?.insertBlock(blockType);
      }}
      className="block w-full text-left px-4 py-1 mb-1 bg-white hover:bg-gray-200"
    >
      + {blockType}
    </button>
  );
};

export default BlockButton;