// src/app/(normal)/sheenbotInfinity/manual/page.tsx

import { redirect } from 'next/navigation'
import { getManualItems } from '@/lib/manual'

export default async function Index() {
  const items = await getManualItems()
  if (items.length) redirect(`/sheenbotInfinity/manual/${items[0].slug}`)
  return null
}
