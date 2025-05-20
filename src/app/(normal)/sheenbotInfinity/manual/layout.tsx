// src/app/(normal)/sheenbotInfinity/manual/layout.tsx

import React from 'react'
import { getManualTree, getManualContent } from '@/lib/manual'
import ManualShell from './ManualShell'

// 简易 slugify，用于生成锚点 id
function slugify(s: string) {
  return s.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '')
}

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ slug?: string }>
}

export default async function ManualLayout({ children, params }: LayoutProps) {
  const { slug } = await params
  const tree = await getManualTree()

  // only load headings if we have a slug
  let headings: { depth: number; text: string; id: string }[] = []
  if (slug) {
    const md = await getManualContent(slug)
    headings = Array.from(md.matchAll(/^(#{1,6})\s+(.*)$/gm)).map((m) => ({
      depth: m[1].length,
      text: m[2].trim(),
      id: slugify(m[2].trim()),
    }))
  }

  return (
    <ManualShell tree={tree} current={slug} headings={headings}>
      {children}
    </ManualShell>
  )
}