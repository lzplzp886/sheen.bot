// src/lib/manual.ts
import fs from 'fs/promises'
import path from 'path'

const PUBLIC_MANUAL = path.join(process.cwd(), 'public', 'content', 'manual')

export type ManualItem = {
  slug: string
  label: string    // 从文件内容里提取的 "# ..." 文本
}

export async function getManualItems(): Promise<ManualItem[]> {
  const files = (await fs.readdir(PUBLIC_MANUAL))
    .filter((f) => f.endsWith('.md'))
    .sort()

  const items = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.md$/, '')
      const full = await fs.readFile(path.join(PUBLIC_MANUAL, filename), 'utf-8')
      const m = full.match(/^#\s*(.+)$/m)
      const label = m ? m[1].trim() : slug
      return { slug, label }
    })
  )

  return items
}

export async function getManualContent(slug: string) {
  // URL slugs come in percent-encoded, so decode them back to real filenames
  const decoded = decodeURIComponent(slug)
  const fullPath = path.join(PUBLIC_MANUAL, decoded + '.md')
  return fs.readFile(fullPath, 'utf-8')
}
