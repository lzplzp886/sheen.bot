import React from "react";
import Link from "next/link";

// 让 Next.js 不再尝试静态预渲染或 SSG 此页面
export const dynamic = "force-dynamic";

// 如果你想避免 TS 对 "searchParams" 的类型报错，
// 可以使用 "props: any"，并局部禁用 no-explicit-any 规则。
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Page(props: any) {
/* eslint-enable @typescript-eslint/no-explicit-any */
  const referral = props.searchParams?.referral || "";

  return (
    <div className="p-5 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Thank you for choosing Sheen Academy
      </h1>
      <p className="mb-6">
        Please follow the steps to complete your child&rsquo;s enrollment.
      </p>

      <Link
        href={
          referral
            ? `/enrollment/step1?referral=${encodeURIComponent(referral)}`
            : "/enrollment/step1"
        }
      >
        <button className="btn">Start Enrollment</button>
      </Link>
    </div>
  );
}
