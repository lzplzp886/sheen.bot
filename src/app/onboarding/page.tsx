"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectDashboardPopup from "@/app/onboarding/popup";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function LandingPage() {
  const router = useRouter();
  const [showDashboard, setShowDashboard] = useState(false);

  const handleNewProject = () => {
    router.push("/canvas");
  };

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        {/* Container for buttons and divider */}
        <div className="flex flex-col lg:flex-row items-center lg:space-x-14 space-y-8 lg:space-y-0">
          {/* HOME icon/button */}
          <button
            onClick={() => setShowDashboard(true)}
            className="flex flex-col items-center p-8 bg-background rounded-lg shadow-md hover:shadow-lg min-w-[220px] text-body"
          >
            <img
              src="/images/onboarding/home.svg"
              alt="Home Icon"
              className="h-16 w-16 mb-6"
            />
            <span className="text-lg font-bold">HOME</span>
            <span className="text-sm">
              Explore Learning Materials
            </span>
          </button>

          {/* Divider */}
          <div className="hidden lg:block h-[120px] w-[3px] bg-light mx-6"></div>
          <div className="block lg:hidden w-[240px] h-[3px] bg-light my-4"></div>

          {/* NEW PROJECT icon/button */}
          <button
            onClick={handleNewProject}
            className="flex flex-col items-center p-8 bg-background rounded-lg shadow-md hover:shadow-lg min-w-[220px] text-body"
          >
            <img
              src="/images/onboarding/new-project.svg"
              alt="New Project Icon"
              className="h-16 w-16 mb-6"
            />
            <span className="text-lg font-bold">NEW PROJECT</span>
            <span className="text-sm">
              Create Programming Canvas
            </span>
          </button>
        </div>

        {/* Popup overlay for the Project Dashboard */}
        {showDashboard && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            {/* Dim background */}
            <div
              className="absolute top-0 left-0 w-full h-full bg-body opacity-50"
              onClick={() => setShowDashboard(false)}
            />
            <div className="relative bg-background w-[80%] h-[80%] p-4 rounded shadow-lg">
              <ProjectDashboardPopup
                onClose={() => setShowDashboard(false)}
              />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
