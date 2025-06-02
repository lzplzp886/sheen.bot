// src/app/(normal)/sheenbotInfinity/manual/[slug]/page.tsx

import type { Metadata } from 'next'
import { getManualItems, getManualContent, ManualItem } from '@/lib/manual'
import React from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'

/* 0. 建议放到 .env 或 util 文件中 */
const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL

// 一个默认分享图（放在 public/content/manual/images/manual-og.png）
const DEFAULT_OG_IMAGE = `${ORIGIN}/content/manual/images/manual-og.png`

/* ------------------------------------------------------------------ */
/*  1) 动态生成 <head> 元数据：Title / Description / OG / Twitter       */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  // 取得 slug
  const { slug: raw } = await params
  const slug = decodeURIComponent(raw)

  // 拿对应章节标题
  const items: ManualItem[] = await getManualItems()
  const match = items.find((i) => i.slug === slug)
  const titleBase = match ? match.label.replace(/^#+\s*/, '') : slug

  // 手册完整 URL（部署域名可改成 env 变量）
  const pageUrl = `${ORIGIN}/sheenbotInfinity/manual/${encodeURIComponent(slug)}`

  return {
    title: `${titleBase} | sheenbot∞ User Manual`,
    description: `Read sheenbot∞ user manual: ${titleBase}`,
    openGraph: {
      type: 'article',
      url: pageUrl,
      title: `${titleBase} | sheenbot∞ User Manual`,
      description: `Read sheenbot∞ user manual: ${titleBase}`,
      siteName: 'sheen.bot',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'sheenbot∞ User Manual',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titleBase} | sheenbot∞ User Manual`,
      description: `Read sheenbot∞ user manual: ${titleBase}`,
      images: [DEFAULT_OG_IMAGE],
    },
  }
}

/* -------- ② 页面组件保持原来的 Promise props -------- */
export default async function ManualPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: raw } = await params
  const slug = decodeURIComponent(raw)

  const items: ManualItem[] = await getManualItems()
  const markdown = await getManualContent(slug)

  const idx  = items.findIndex((i) => i.slug === slug)
  const prev = idx > 0 ? items[idx - 1] : null
  const next = idx < items.length - 1 ? items[idx + 1] : null

  return (
    <article className="p-6 prose max-w-none flex flex-col">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings, rehypeHighlight]}
      >
        {markdown}
      </ReactMarkdown>

      <nav className="mt-8 flex justify-between text-sm">
        {prev ? (
          <Link href={`/sheenbotInfinity/manual/${encodeURIComponent(prev.slug)}`} className="hover:underline">
            ← {prev.label}
          </Link>
        ) : <span />}

        {next ? (
          <Link href={`/sheenbotInfinity/manual/${encodeURIComponent(next.slug)}`} className="hover:underline">
            {next.label} →
          </Link>
        ) : <span />}
      </nav>
    </article>
  )
}
