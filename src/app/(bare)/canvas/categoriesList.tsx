// src/app/(bare)/canvas/categoriesList.tsx

"use client";

import React from "react";
import type { BlocklyEditorRef } from "./BlocklyEditor";
import BlockButton from "./blockButton";

interface Category {
  name: string;
  color: string;
  blocks: string[];
}

interface CategoriesListProps {
  categories: Category[];
  editorRef: React.RefObject<BlocklyEditorRef | null>;
}

const CategoriesList: React.FC<CategoriesListProps> = ({ categories, editorRef }) => {
  return (
    <div className="w-1/6 bg-gray-50 border-r border-gray-300 p-2 overflow-auto">
      <h2 className="text-md font-bold mb-2">Categories</h2>
      {categories.map((cat) => (
        <div key={cat.name} className="mb-4">
          <button
            className={`block w-full text-left px-2 py-1 mb-1 rounded font-semibold ${cat.color}`}
            // 这里可以添加展开/收起逻辑
          >
            {cat.name}
          </button>
          {cat.blocks.map((blockType) => (
            <BlockButton key={blockType} blockType={blockType} editorRef={editorRef} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CategoriesList;
