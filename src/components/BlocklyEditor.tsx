'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks'; // Imports all default blocks
import { javascriptGenerator } from 'blockly/javascript';
import * as En from 'blockly/msg/en';

// Fix locale typing mismatch if needed:
// @ts-expect-error just exception
Blockly.setLocale(En);

export default function BlocklyEditor() {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const [executionOutput, setExecutionOutput] = useState('');

  // A more comprehensive toolbox from the official Blockly docs
  // https://developers.google.com/blockly/guides/get-started/web#toolbox
  const toolboxXml = `
  <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
    <category name="Logic" colour="%{BKY_LOGIC_HUE}">
      <block type="controls_if"></block>
      <block type="logic_compare"></block>
      <block type="logic_operation"></block>
      <block type="logic_negate"></block>
      <block type="logic_boolean"></block>
      <block type="logic_null"></block>
      <block type="logic_ternary"></block>
    </category>
    <category name="Loops" colour="%{BKY_LOOPS_HUE}">
      <block type="controls_repeat_ext"></block>
      <block type="controls_whileUntil"></block>
      <block type="controls_for"></block>
      <block type="controls_forEach"></block>
      <block type="controls_flow_statements"></block>
    </category>
    <category name="Math" colour="%{BKY_MATH_HUE}">
      <block type="math_number"></block>
      <block type="math_arithmetic"></block>
      <block type="math_single"></block>
      <block type="math_trig"></block>
      <block type="math_constant"></block>
      <block type="math_number_property"></block>
      <block type="math_round"></block>
      <block type="math_on_list"></block>
      <block type="math_modulo"></block>
      <block type="math_constrain"></block>
      <block type="math_random_int"></block>
      <block type="math_random_float"></block>
      <block type="math_atan2"></block>
    </category>
    <category name="Text" colour="%{BKY_TEXTS_HUE}">
      <block type="text"></block>
      <block type="text_join"></block>
      <block type="text_append">
        <value name="TEXT">
          <shadow type="text"></shadow>
        </value>
      </block>
      <block type="text_length"></block>
      <block type="text_isEmpty"></block>
      <block type="text_indexOf">
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR">text</field>
          </block>
        </value>
      </block>
      <block type="text_charAt">
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR">text</field>
          </block>
        </value>
      </block>
      <block type="text_getSubstring">
        <value name="STRING">
          <block type="variables_get">
            <field name="VAR">text</field>
          </block>
        </value>
      </block>
      <block type="text_changeCase"></block>
      <block type="text_trim"></block>
      <block type="text_print"></block>
      <block type="text_prompt_ext"></block>
    </category>
    <category name="Lists" colour="%{BKY_LISTS_HUE}">
      <block type="lists_create_empty"></block>
      <block type="lists_create_with"></block>
      <block type="lists_repeat"></block>
      <block type="lists_length"></block>
      <block type="lists_isEmpty"></block>
      <block type="lists_indexOf"></block>
      <block type="lists_getIndex"></block>
      <block type="lists_setIndex"></block>
      <block type="lists_getSublist"></block>
      <block type="lists_split"></block>
      <block type="lists_sort"></block>
    </category>
    <sep gap="32"></sep>
    <category name="Variables" colour="%{BKY_VARIABLES_HUE}" custom="VARIABLE"></category>
    <category name="Functions" colour="%{BKY_PROCEDURES_HUE}" custom="PROCEDURE"></category>
  </xml>
  `;

  useEffect(() => {
    // Convert the toolbox text into DOM
    const toolboxDom = Blockly.utils.xml.textToDom(toolboxXml);

    // Reset Tailwind SVG impact on scroll bar
    const style = document.createElement('style');
    style.innerHTML = `
      svg[display="none"] {
        display: none;
      }
    `;
    document.head.appendChild(style);

    // Inject Blockly workspace
    workspaceRef.current = Blockly.inject(blocklyDiv.current!, {
      toolbox: toolboxDom,
      zoom: {
        controls: true,
        wheel: false,
        startScale: 1.0,
        maxScale: 2,
        minScale: 0.5,
        scaleSpeed: 1.2,
        pinch: true,
      },
      trashcan: true,
    });

    // Cleanup on unmount
    return () => {
      // Remove the style tag to avoid polluting the global DOM
      document.head.removeChild(style);
    };
    
    return () => {
      // Dispose of the Blockly workspace
      workspaceRef.current?.dispose();
    };
  }, [toolboxXml]);

  const handleRunCode = () => {
    if (!workspaceRef.current) return;
    const code = javascriptGenerator.workspaceToCode(workspaceRef.current);

    try {
      // Evaluate the generated JS code
      // eslint-disable-next-line no-new-func
      const result = new Function(code)();
      setExecutionOutput(
        result !== undefined ? String(result) : 'Code executed successfully.'
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setExecutionOutput(`Error: ${err.message}`);
      } else {
        setExecutionOutput('Unknown error occurred.');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        ref={blocklyDiv}
        style={{
          height: '500px',
          width: '80%',
          border: '1px solid #ccc',
          backgroundColor: '#f9f9f9',
          marginTop: '20px',
        }}
      />
      <button
        onClick={handleRunCode}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          }}
      >
        Run Code
      </button>
      <textarea
        value={executionOutput}
        readOnly
        style={{
          marginTop: '20px',
          width: '80%',
          height: '100px',
          fontSize: '16px',
          fontFamily: 'monospace',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '10px',
        }}
        placeholder="Output will appear here..."
      />
    </div>
  );
}
