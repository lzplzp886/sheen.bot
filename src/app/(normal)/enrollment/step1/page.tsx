import React, { Suspense } from "react";
import Step1Client from "./step1Client";

/**
 * Server Component
 */
export default function Step1Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step1Client />
    </Suspense>
  );
}
