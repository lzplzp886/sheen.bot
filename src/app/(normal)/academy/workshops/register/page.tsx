// src/app/(normal)/academy/workshops/register/page.tsx

'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

/* ───────── 内部组件：带 query 的跳转按钮 ───────── */
function StartButton() {
  const searchParams = useSearchParams();          // safe inside Suspense
  const qs = searchParams.toString();              // e.g. "id=WSH2"
  const href = `/academy/workshops/register/step2${qs ? '?' + qs : ''}`;

  return (
    <Link href={href}>
      <button className="btn">Start Registration</button>
    </Link>
  );
}

/* ───────── 页面主体 ───────── */
export default function WorkshopRegisterLanding() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-background text-body">
      <div className="text-center p-5">
        <h1 className="text-2xl font-bold mb-4">Workshop Registration</h1>

        <p className="mb-6">
          Secure your seat for our hands-on holiday workshop. The form takes
          only a couple of minutes to complete.
        </p>

        {/* useSearchParams 需放在 Suspense 边界内 */}
        <Suspense fallback={null}>
          <StartButton />
        </Suspense>
      </div>
    </section>
  );
}