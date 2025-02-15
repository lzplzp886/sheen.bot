// src/app/not-found.tsx

"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center">
        <Image
          src="/images/404.svg"
          alt="Page Not Found"
          width={150}
          height={150}
          className="mb-6"
        />
        <h1 className="text-2xl font-bold text-body mb-4 text-center">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-body mb-8 text-center">
          The page you are looking for doesn not exist.
        </p>
        <button onClick={() => router.back()} className="btn">
          Go Back
        </button>
      </div>
    </div>
  );
}
