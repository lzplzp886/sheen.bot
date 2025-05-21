// src/app/(normal)/sheenbotInfinity/manual/[slug]/page.tsx

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import { getManualItems, getManualContent } from '@/lib/manual'
import type { ManualItem } from '@/lib/manual'

export default async function ManualPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug:raw } = await params
  const slug = decodeURIComponent(raw)     // ← decode percent-escapes
  const items: ManualItem[] = await getManualItems()
  const markdown = await getManualContent(slug)

  const idx = items.findIndex((i) => i.slug === slug)
  const prev = idx > 0 ? items[idx - 1] : null
  const next = idx < items.length - 1 ? items[idx + 1] : null
  
  // 去掉行首所有 # 和空格
  const clean = (s: string) => s.replace(/^#+\s*/, '')

  return (
    <article className="p-6 prose max-w-none flex flex-col">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          rehypeAutolinkHeadings,
          rehypeHighlight,
        ]}
      >
        {markdown}
      </ReactMarkdown>

      <nav className="mt-8 flex justify-between text-sm">
        {prev ? (
          <a
            href={`/sheenbotInfinity/manual/${encodeURIComponent(
              prev.slug
            )}`}
            className="hover:underline"
          >
            ← {clean(prev.label)}
          </a>
        ) : (
          <span />
        )}

        {next ? (
          <a
            href={`/sheenbotInfinity/manual/${encodeURIComponent(
              next.slug
            )}`}
            className="hover:underline"
          >
            {clean(next.label)} →
          </a>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )  // ← this closing parenthesis was missing
}
