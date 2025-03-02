"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import { javascriptGenerator } from "blockly/javascript"; // 支持 JavaScript 代码生成
import * as En from "blockly/msg/en"; // 加载英文语言包
import toolboxXml from "./canvasToolbox";

// 设置语言
// @ts-expect-error just exception
Blockly.setLocale(En);

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

function BlocklyEditor({ onWorkspaceChange }: BlocklyEditorProps, ref: React.Ref<unknown>) {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  // 初始化工作区并配置 toolbox
  useEffect(() => {
    if (!blocklyDiv.current) return;
    console.log("[BlocklyEditor] MOUNT");
    
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolboxXml,
      trashcan: true,
      zoom: { 
        controls: true,
        wheel: false,
        startScale: 1.0,
        maxScale: 2,
        minScale: 0.5,
        scaleSpeed: 1.2,
      }, 
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
      grid: {
        spacing: 20,
        length: 3,
        colour: "#F2F2F2",
        snap: true,
      }
    });

    // 设置背景图
    if (workspaceRef.current) {
      const svg = workspaceRef.current.getParentSvg();
      if (svg) {
        svg.style.backgroundImage = 'url("/images/canvas/background.svg")';
        svg.style.backgroundSize = "cover";
        svg.style.backgroundPosition = "center";
        svg.style.backgroundRepeat = "no-repeat";
      }
    }

    // 监听工作区变化
    workspaceRef.current.addChangeListener(() => {
      onWorkspaceChange?.();
    });

    return () => {
      console.log("[BlocklyEditor] UNMOUNT, disposing workspace...");
      workspaceRef.current?.dispose();
    };
  }, [onWorkspaceChange]);

  // 通过 useImperativeHandle 向父组件暴露方法
  useImperativeHandle(ref, () => ({
    getWorkspaceXml: () => {
      if (!workspaceRef.current) return "";
      const xmlDom = Blockly.Xml.workspaceToDom(workspaceRef.current);
      return Blockly.Xml.domToText(xmlDom);
    },
    loadWorkspaceXml: (xml: string) => {
      console.log("[BlocklyEditor] loadWorkspaceXml called with =>", xml);
      if (!workspaceRef.current) return;
      workspaceRef.current.clear();
      if (xml) {
        const xmlDom = Blockly.utils.xml.textToDom(xml);
        Blockly.Xml.domToWorkspace(xmlDom, workspaceRef.current);
      }
    },
    insertBlock: (type: string) => {
      console.log("[BlocklyEditor] InsertBlock called with =>", type);
      if (!workspaceRef.current) return;
      const block = workspaceRef.current.newBlock(type);
      block.initSvg();
      block.render();
      block.moveBy(50, 50);
    },
    undo: () => {
      workspaceRef.current?.undo(false);
    },
    redo: () => {
      workspaceRef.current?.undo(true);
    },
    generateCode: () => {
      if (!workspaceRef.current) return "";
      return javascriptGenerator.workspaceToCode(workspaceRef.current);
    },
    runCode: () => {
      if (!workspaceRef.current) return;
      const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
      try {
        // 直接在浏览器中执行 eval，注意安全问题
        eval(code);
      } catch (err) {
        alert("Error running code: " + err);
      }
    },
  }));

  return <div className="w-full h-full" ref={blocklyDiv} />;
}

export default React.memo(forwardRef(BlocklyEditor));
