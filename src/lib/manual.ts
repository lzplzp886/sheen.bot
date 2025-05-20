// src/lib/manual.ts

import fs from 'fs/promises'
import path from 'path'

const PUBLIC_MANUAL = path.join(process.cwd(), 'public', 'content', 'manual')

export type ManualItem = {
  slug: string
  label: string      // 从首行 # 提取文本
  depth: number      // 标题级别 从 0 起
}

export type ManualTreeNode = ManualItem & {
  children: ManualTreeNode[]
}

// 读取并解析文件名前缀与首行标题
async function readAndParseFiles(): Promise<{ slug: string; label: string; parts: number[]; }[]> {
  const files = (await fs.readdir(PUBLIC_MANUAL)).filter((f) => f.endsWith('.md'))

  // 按数字前缀自然排序，支持多级编号
  files.sort((a, b) => {
    const parse = (f: string) =>
      f.replace(/\.md$/, '')
       .split('-')[0]
       .split('.')
       .map((n) => parseInt(n, 10))

    const pa = parse(a)
    const pb = parse(b)
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const na = pa[i] ?? 0
      const nb = pb[i] ?? 0
      if (na !== nb) return na - nb
    }
    return 0
  })

  const result = [] as { slug: string; label: string; parts: number[] }[]
  for (const filename of files) {
    const slug = filename.replace(/\.md$/, '')
    const parts = slug.split('-')[0].split('.').map((n) => parseInt(n, 10))
    const content = await fs.readFile(path.join(PUBLIC_MANUAL, filename), 'utf-8')
    const m = content.match(/^#\s*(.+)$/m)
    const label = m ? m[1].trim() : slug
    result.push({ slug, label, parts })
  }
  return result
}

/** 扁平列表，用于分页等 */
export async function getManualItems(): Promise<ManualItem[]> {
  const parsed = await readAndParseFiles()
  return parsed.map(({ slug, label, parts }) => ({
    slug,
    label,
    depth: parts.length - 1,
  }))
}

/** 构建任意层级的树形导航 */
export async function getManualTree(): Promise<ManualTreeNode[]> {
  const parsed = await readAndParseFiles()
  const map: Record<string, ManualTreeNode> = {}
  parsed.forEach(({ slug, label, parts }) => {
    map[slug] = { slug, label, depth: parts.length - 1, children: [] }
  })
  const roots: ManualTreeNode[] = []
  parsed.forEach(({ slug, parts }) => {
    const node = map[slug]
    if (parts.length > 1) {
      const parentPrefix = parts.slice(0, -1).join('.')
      const parentEntry = parsed.find(p => p.slug.startsWith(parentPrefix + '-'))
      if (parentEntry) {
        map[parentEntry.slug].children.push(node)
        return
      }
    }
    roots.push(node)
  })
  return roots
}

/** 获取原始 Markdown 内容（解码 slug） */
export async function getManualContent(slug: string): Promise<string> {
  const decoded = decodeURIComponent(slug)
  const filePath = path.join(PUBLIC_MANUAL, decoded + '.md')
  return fs.readFile(filePath, 'utf-8')
}