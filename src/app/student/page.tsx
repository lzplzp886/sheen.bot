"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function StudentDashboard() {
  const router = useRouter();

  function handleGoToOnboarding() {
    router.push("/onboarding");
  }

  function handleGoToCanvas() {
    // This will navigate to /projectCanvas
    router.push("/canvas");
  }

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="p-5 text-center">
        
        <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
        
        <p className="mb-6">welcome to your personal learning space</p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoToOnboarding}
            className="px-6 py-2 bg-primary text-background rounded transition-colors duration-200 hover:bg-secondary"
          >
            Onboarding
          </button>
          <button
            onClick={handleGoToCanvas}
            className="px-6 py-2 bg-primary text-background rounded transition-colors duration-200 hover:bg-secondary"
          >
            New Project
          </button>

        </div>
      
      </div>
    </ProtectedRoute>
  );
}