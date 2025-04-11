"use client";

import React from "react";
import { WizardProvider } from "./context";
import ProgressBar from "./progress-bar";

export default function EnrollmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WizardProvider>
      <div className="p-5">
        <ProgressBar />
        {children}
      </div>
    </WizardProvider>
  );
}
