import React from "react";
import Link from "next/link";

/**
 * Enrollment "Home" page (Server Component)
 */
export default function EnrollmentIndexPage() {
  return (
    <div className="p-5 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Sheen Academy</h1>
      <p className="mb-6">
        Please follow the steps to complete your child&rsquo;s enrollment.
      </p>

      {/* 使用 Next.js 内置的 <Link> 导航到 step1 */}
      <Link href="/enrollment/step1">
        <button className="btn">Start Enrollment</button>
      </Link>
    </div>
  );
}
