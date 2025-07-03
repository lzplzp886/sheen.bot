// src/app/(normal)/academy/workshops/register/step2/page.tsx

'use client';

import { Suspense } from 'react';
import Step2Inner from './Step2Inner';

export default function Step2Page() {
  /* 也可以用 Skeleton 做更友好的 fallback */
  return (
    <Suspense fallback={null}>
      <Step2Inner />
    </Suspense>
  );
}