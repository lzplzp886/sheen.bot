// src/app/(normal)/payment/payment-failure/page.tsx

import { Suspense } from "react";
import PaymentFailureInner from "./PaymentFailureInner";

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <PaymentFailureInner />
    </Suspense>
  );
}
