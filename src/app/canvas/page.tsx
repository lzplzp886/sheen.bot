"use client";

import React, { useState } from "react";
import NavigationHeader from "@/app/canvas/projectHeader";
import BlocklyEditor from "@/app/canvas/BlocklyEditor"; // <--- a custom React wrapper around Google Blockly

export default function ProjectCanvasPage() {
  // Left column categories
  const categories = [
    { name: "Basic", color: "bg-red-200" },
    { name: "Control", color: "bg-green-200" },
    { name: "Sensors", color: "bg-blue-200" },
    // etc.
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

  // Tells TS that subBlocks is a "string -> string[]" map
  const subBlocks: Record<string, string[]> = {
  Basic: ["moveForward", "moveBackward"],
  Control: ["if", "loop"],
  Sensors: ["readDistance", "readColor"],
  };

  // For the right-hand side zoom/trash etc. controls:
  const handleCenter = () => {
    // implement blockly center
  };
  const handleZoomIn = () => {
    // blockly workspace zoom in
  };
  const handleZoomOut = () => {
    // blockly workspace zoom out
  };
  const handleTrash = () => {
    // blockly workspace clear or selected block removal
  };

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Header with Save/Open/Tabs */}
      <NavigationHeader />

      {/* Body content: left column + coding area + right controls */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left column: categories & sub-block menu */}
        <div className="w-1/6 bg-gray-50 border-r border-gray-300 p-2">
          <h2 className="text-md font-bold mb-2">Categories</h2>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`block w-full text-left px-2 py-1 mb-1 rounded ${
                selectedCategory === cat.name ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <span className={`inline-block h-3 w-3 rounded-full mr-2 ${cat.color}`} />
              {cat.name}
            </button>
          ))}

          <h3 className="text-md font-bold mt-4">Blocks</h3>
          {(subBlocks[selectedCategory] || []).map((blockName) => (
            <div key={blockName} className="ml-4 py-1">
              {/* Placeholder for a block item you can drag to the workspace 
                  or click to insert. Implementation depends on your approach.
               */}
              <span>- {blockName}</span>
            </div>
          ))}
        </div>

        {/* Main coding area */}
        <div className="flex-1 relative">
          {/* Possibly a “connect hardware” icon in top-left corner: */}
          <div className="absolute top-2 left-2 z-10 bg-white p-2 shadow">
            <button className="text-sm">Connect</button>
            {/* Possibly show a dropdown for WebUSB / WebSerial, etc. */}
          </div>

          {/* Here is the main blockly area (a placeholder) */}
          <BlocklyEditor />

          {/* Right-hand side control tools */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2 bg-white p-2 shadow">
            <button onClick={handleCenter}>Center</button>
            <button onClick={handleZoomIn}>Zoom In</button>
            <button onClick={handleZoomOut}>Zoom Out</button>
            <button onClick={handleTrash}>Trash</button>
          </div>

          {/* Bottom control bar: board selection, code view, AI features, etc. */}
          <div className="absolute bottom-0 left-0 w-full bg-gray-100 p-2 border-t border-gray-300 flex justify-between">
            <div>
              {/* Board “instances” selection? e.g. multiple boards? */}
              <span>Board 1 | Board 2 | Board 3</span>
            </div>
            <div>
              {/* Show code view / AI explanation */}
              <button className="px-3 py-1 bg-blue-200 rounded mr-2">Show Code</button>
              <button className="px-3 py-1 bg-purple-200 rounded">AI Help</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
