// src/app/training/page.tsx

"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/context/ProtectedRoute";
import { routeRoles } from "@/config/routeRoles";

export default function UnderConstructionPage() {
  const router = useRouter();

  return (
    <ProtectedRoute allowedRoles={routeRoles.training}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
        <div className="flex flex-col items-center">
          <Image
            src="/images/construction.svg"
            alt="Under Construction"
            width={150}
            height={150}
            className="mb-6"
          />
          <h1 className="text-2xl font-bold text-body mb-4 text-center">
            Page Under Construction
          </h1>
          <p className="text-lg text-body mb-8 text-center">
            We are working hard to build this page. Please check back later!
          </p>
          <button onClick={() => router.back()} className="btn">
            Go Back
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
