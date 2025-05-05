// src/app/(normal)/sheenbotInfinity/brochure/page.tsx

import React from "react";

export default function BrochurePage() {
  return (
    <div className="min-h-screen p-8 bg-white text-black">
      <iframe
        src="/pdf/sheenbot-flyer-v5.pdf"
        className="w-full h-[calc(100vh-4rem)] border"
      />
    </div>
  );
}