// src/app/(normal)/sheenbotInfinity/manual/layout.tsx

import React from 'react'
import { getManualItems } from '@/lib/manual'
import ManualShell from './ManualShell'

// 1. Define the shape of the props Next will pass you.
//    Note: In Next 15, both `params` and `searchParams` come in as Promises.
type ManualLayoutProps = {
  children: React.ReactNode
  params: Promise<{ slug?: string }>
}

export default async function ManualLayout({
  children,
  params,
}: ManualLayoutProps) {
  // 2. You can now await `params` to pull out slug
  const { slug } = await params

  // 3. Fetch your items server-side
  const items = await getManualItems()

  // 4. Render your client shell with no further type errors
  return (
    <ManualShell items={items} current={slug}>
      {children}
    </ManualShell>
  )
}
