// src/app/(normal)/page.tsx

"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

import HeroSection from "./home/components/HeroSection";
import EntryPointsSection from "./home/components/EntryPointSection";

export default function HomePage() {
  const router = useRouter();
  const { username, role, loading } = useUser();

  /* 若已登录则直接跳转到 dashboard */
  useEffect(() => {
    if (!loading && username && role) router.replace("/dashboard");
  }, [loading, username, role, router]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <h2 className="font-semibold">Checking session…</h2>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden bg-background text-body">
      <HeroSection />
      <EntryPointsSection />
    </main>
  );
}