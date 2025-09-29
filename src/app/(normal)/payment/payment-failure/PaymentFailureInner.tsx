// src/app/(normal)/payment/payment-failure/PaymentFailureInner.tsx

"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function safePath(p?: string | null) {
  if (!p) return "/";
  try {
    // 仅允许站内路径，防止开放跳转
    return p.startsWith("/") ? p : "/";
  } catch {
    return "/";
  }
}

export default function PaymentFailureInner() {
  const sp = useSearchParams();
  const router = useRouter();

  // Step9 已把 back=/academy/workshops/register/step9 带过来
  const back = safePath(sp.get("back"));

  return (
    <section className="min-h-screen flex items-center justify-center bg-background text-body px-4">
      <div className="w-full max-w-md rounded-2xl shadow p-6 bg-white">
        <div className="text-center">
          <div className="mb-3">
            <Image
              src="/images/404.svg"
              alt="404 icon"
              width={64}
              height={64}
              priority
            />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Payment Failed</h1>
          <p className="text-sm text-darklight mb-6">
            Your payment was not completed. No confirmation was sent and your registration
            has not been finalized.
          </p>

          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-3">
            <button
              className="btn w-full sm:w-auto"
              onClick={() => router.push(back)}
            >
              Back to Registration
            </button>

            <Link className="btn btn-outline w-full sm:w-auto" href="/">
              Go to Home
            </Link>
          </div>

          <p className="text-xs text-darklight mt-6">
            If this keeps happening, please contact support at&nbsp;
            <a className="underline" href="mailto:info@sheen.co.za">academy@sheen.co.za</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
