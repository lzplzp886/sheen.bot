// src/app/canvas/BlocklyEditor.tsx

"use client";

import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import { javascriptGenerator } from "blockly/javascript"; // Support JS Generator
import * as En from 'blockly/msg/en'; // Load EN language pack

// @ts-expect-error just exception
Blockly.setLocale(En);

/**
 * Export interface to allow parent comonents to call
 */
export interface BlocklyEditorRef {
  getWorkspaceXml: () => string;
  loadWorkspaceXml: (xml: string) => void;
  insertBlock: (type: string) => void;
  undo: () => void;
  redo: () => void;
  generateCode: () => string;
  runCode: () => void;
}

interface BlocklyEditorProps {
  onWorkspaceChange?: () => void;
}

// Use forwardRef + useImperativeHandle methods so parent elements can call
function BlocklyEditor(
  { onWorkspaceChange }: BlocklyEditorProps,
  ref: React.Ref<unknown>
) {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  // Initialize workspace
  useEffect(() => {
    if (!blocklyDiv.current) return;
    console.log("[BlocklyEditor] MOUNT");
    
    // Removed toolbox
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: undefined, // Not use in-house toolbox
      trashcan: true,
      zoom: { 
        controls: true,
        wheel: false, // Disable the wheel zoom
        startScale: 1.0,
        maxScale: 2,
        minScale: 0.5,
        scaleSpeed: 1.2,
      }, 
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,  // Keep wheel to control the canvas view
      },
      grid: {
        spacing: 20,
        length: 3,
        colour: "#F2F2F2",
        snap: true,
      }
    });

    // Set background
    if (workspaceRef.current) {
      const svg = workspaceRef.current.getParentSvg();
      if (svg) {
        svg.style.backgroundImage = 'url("/images/canvas/background.svg")';
        svg.style.backgroundSize = "cover"; // Fill the whole workspace with image
        svg.style.backgroundPosition = "center";
        svg.style.backgroundRepeat = "no-repeat";
      }
    }

    // Listen to workspace change, like block added or moved
    workspaceRef.current.addChangeListener(() => {
      onWorkspaceChange?.();
    });

    return () => {
      console.log("[BlocklyEditor] UNMOUNT, disposing workspace...");
      workspaceRef.current?.dispose();
    };
  }, [onWorkspaceChange]);

  // Methods exposed to external
  useImperativeHandle(ref, () => ({
    getWorkspaceXml: () => {
      if (!workspaceRef.current) return "";
      const xmlDom = Blockly.Xml.workspaceToDom(workspaceRef.current);
      return Blockly.Xml.domToText(xmlDom);
    },
    loadWorkspaceXml: (xml: string) => {
      console.log("[BlocklyEditor] loadWorkspaceXml called with =>", xml);
      if (!workspaceRef.current) return;
      console.log("[BlocklyEditor] clearing workspace...");
      workspaceRef.current.clear();
      if (xml) {
        // Convert XML to DOM
        console.log("[BlocklyEditor] now loading the given XML =>", xml.substring(0, 50));
        const xmlDom = Blockly.utils.xml.textToDom(xml);
        // Load DOM to current workspace
        Blockly.Xml.domToWorkspace(xmlDom, workspaceRef.current);
      }
    },
    // Insert block
    insertBlock: (type: string) => {
      console.log("[BlocklyEditor] InsertBlock called with => type");
      if (!workspaceRef.current) return;
      const block = workspaceRef.current.newBlock(type);
      block.initSvg();
      block.render();
      block.moveBy(50, 50);
    },
    // Use built-in undo and redo
    undo: () => {
      workspaceRef.current?.undo(false);
    },
    redo: () => {
      workspaceRef.current?.undo(true);
    },
    generateCode: () => {
      if (!workspaceRef.current) return "";
      // Generate code based on JavaScript
      return javascriptGenerator.workspaceToCode(workspaceRef.current);
    },
    runCode: () => {
      if (!workspaceRef.current) return;
      const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
      try {
        // 在浏览器直接 eval
        // 注意安全：生产环境要谨慎
        eval(code);
      } catch (err) {
        alert("Error running code: " + err);
      }
    },
  }));

  return (
    <div className="w-full h-full" ref={blocklyDiv} />
  );
}

// forwardRef包裹 + react.memo包裹，确保即使父组件重新渲染，BlocklyEditor 也不会重新挂载
export default React.memo(forwardRef(BlocklyEditor));