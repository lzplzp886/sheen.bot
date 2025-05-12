// src/lib/manual.ts

import fs from 'fs/promises'
import path from 'path'

const PUBLIC_MANUAL = path.join(process.cwd(), 'public', 'content', 'manual')

export async function getManualItems() {
  const files = await fs.readdir(PUBLIC_MANUAL)
  return files
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((filename) => ({
      slug: filename.replace(/\.md$/, ''),
      title: filename
        .replace(/^\d+-/, '')        // drop leading numbers
        .replace(/-/g, ' ')          // hyphens → spaces
        .replace(/\.md$/, ''),       // drop extension
    }))
}

export async function getManualContent(slug: string) {
  const fullPath = path.join(PUBLIC_MANUAL, slug + '.md')
  return fs.readFile(fullPath, 'utf-8')
}
