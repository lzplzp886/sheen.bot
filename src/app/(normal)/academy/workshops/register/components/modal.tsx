// src/app/(normal)/academy/workshops/register/components/modal.tsx

"use client";
import React from "react";

export default function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-body/50">
      <div className="bg-background w-11/12 max-w-md rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {children}
        <button onClick={onClose} className="btn-pri w-full">OK</button>
      </div>
    </div>
  );
}