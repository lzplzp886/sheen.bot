// src/app/(normal)/sheenbotInfinity/manual/page.tsx

import { redirect } from 'next/navigation'
import { getManualTree } from '@/lib/manual'

export const metadata = {
  title: 'sheenbot∞ User Manual',
  description: 'A powerful, all-in-one, AI-native development board designed for education, robotics, IoT, and smart automation.'
}

export default async function Index() {
  const tree = await getManualTree()
  // 取根节点第一个 slug
  const first = tree[0]?.slug
  if (first) redirect(`/sheenbotInfinity/manual/${encodeURIComponent(first)}`)
  return null
}