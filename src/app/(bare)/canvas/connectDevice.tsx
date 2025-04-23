// src/app/(bare)/canvas/connectDevice.tsx

"use client";

import React from "react";

interface ConnectButtonProps {
  onConnect: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ onConnect }) => {
  return (
    <div className="absolute top-2 left-2 z-10 bg-background p-2 shadow">
      <button className="text-sm" onClick={onConnect}>
        Connect
      </button>
    </div>
  );
};

export default ConnectButton;