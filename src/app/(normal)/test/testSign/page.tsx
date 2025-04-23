"use client";

import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function TestSign() {
  const sigRef = useRef<SignatureCanvas | null>(null);

  const handleClick = () => {
    console.log("sigRef.current =", sigRef.current);
    try {
      const canvas = sigRef.current?.getTrimmedCanvas();
      console.log("TrimmedCanvas:", canvas);
    } catch (err) {
      console.error("Error calling getTrimmedCanvas:", err);
    }
  };

  return (
    <div>
      <h1>Test Signature</h1>
      <SignatureCanvas
        ref={sigRef}
        penColor="blue"
        canvasProps={{ width: 400, height: 200 }}
      />
      <button onClick={handleClick}>Test getTrimmedCanvas</button>
    </div>
  );
}
