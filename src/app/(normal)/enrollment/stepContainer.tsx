// src/app/(normal)/enrollment/stepContainer.tsx

// Re-usable container that auto-scales on mobile

"use client";

import React from "react";

export default function StepContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        w-full                      /* always span the viewport */
        sm:max-w-xl lg:max-w-2xl    /* reinstate a cap only ≥ 640 px */
        mx-auto bg-white shadow-md rounded-lg
        px-4 sm:px-6 py-5           /* inner padding */
      "
    >
      {children}
    </div>
  );
}
