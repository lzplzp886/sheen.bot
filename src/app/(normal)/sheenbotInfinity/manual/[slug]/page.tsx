// src/app/(normal)/sheenbotInfinity/manual/[slug]/page.tsx
import React from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { getManualItems, getManualContent, ManualItem } from '@/lib/manual'

export default async function ManualPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const items: ManualItem[] = await getManualItems()
  const markdown = await getManualContent(slug)

  const idx = items.findIndex((i) => i.slug === slug)
  const prev = idx > 0 ? items[idx - 1] : null
  const next = idx < items.length - 1 ? items[idx + 1] : null

  return (
    <article className="p-6 prose max-w-none flex flex-col">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {markdown}
      </ReactMarkdown>

      <nav className="mt-8 flex justify-between text-sm">
        {prev ? (
          <Link
            href={`/sheenbotInfinity/manual/${prev.slug}`}
            className="hover:underline"
          >
            ← {prev.label}
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/sheenbotInfinity/manual/${next.slug}`}
            className="hover:underline"
          >
            {next.label} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
