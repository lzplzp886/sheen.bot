"use client";

import React, { useRef, useEffect } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks"; // or your custom blocks
import "blockly/javascript"; // or python, etc.

export default function BlocklyEditor() {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!blocklyDiv.current) return;
    // Basic config
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: `<xml xmlns="http://www.w3.org/1999/xhtml">
        <category name="Logic" colour="#5C81A6">
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
        </category>
        <!-- Add your own categories and blocks here -->
      </xml>`,
      trashcan: true,
    });

    return () => {
      // Dispose on unmount
      workspaceRef.current?.dispose();
    };
  }, []);

  return <div className="w-full h-full" ref={blocklyDiv} />;
}
