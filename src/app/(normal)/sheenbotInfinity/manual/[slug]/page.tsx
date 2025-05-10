// src/app/(normal)/sheenbotInfinity/manual/[slug]/page.tsx

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { getManualContent } from '@/lib/manual'

export default async function ManualPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const markdown = await getManualContent(slug)

  return (
    <article className="p-6 prose max-w-none">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </article>
  )
}