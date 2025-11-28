// src/app/(normal)/payment/payment-eft/page.tsx

"use client";

import React, { Suspense } from "react";
import Link from "next/link";

function PaymentEftInner() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background text-body px-4">
      <div className="w-full max-w-md rounded-2xl shadow p-6 bg-white">
        <div className="text-center">
          <div className="mb-3 flex justify-center">
            {/* 这里可以使用一个 check icon 或者 info icon，暂时复用 semantic icon */}
            <div className="h-16 w-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-3xl font-bold">
              √
            </div>
          </div>
          <h1 className="text-2xl font-semibold mb-2">Registration Submitted</h1>
          <p className="text-sm text-darklight mb-6">
            Thank you! Your registration has been received. <br />
            <strong>Please check your email for the tax invoice.</strong>
          </p>
          
          <div className="bg-gray-50 p-4 rounded text-xs text-left text-gray-600 mb-6 border">
            <p className="font-semibold mb-1">Please Note:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Your spot is not confirmed until payment is settled.</li>
              <li>Please make the payment before the due date on the invoice.</li>
              <li>Use the Reference Number on the invoice when making the EFT.</li>
            </ul>
          </div>

          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-3">
            <Link className="btn btn-primary w-full sm:w-auto" href="/">
              Back to Home
            </Link>
          </div>

          <p className="text-xs text-darklight mt-6">
            If you do not receive the email, please contact support at&nbsp;
            <a className="underline" href="mailto:academy@sheen.co.za">academy@sheen.co.za</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function PaymentEftPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <PaymentEftInner />
    </Suspense>
  );
}