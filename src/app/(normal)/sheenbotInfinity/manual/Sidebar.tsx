// src/app/(normal)/sheenbotInfinity/manual/Sidebar.tsx

import Link from 'next/link'
import type { ManualTreeNode } from '@/lib/manual'

type Heading = { depth: number; text: string; id: string }

export function Sidebar({
  tree,
  current,
  headings = [],
  onItemClick,
}: {
  tree: ManualTreeNode[]
  current?: string
  headings?: Heading[]
  onItemClick?: () => void
}) {
  const renderNode = (node: ManualTreeNode, level = 0) => (
    <li key={node.slug}>
      <Link
        href={`/sheenbotInfinity/manual/${encodeURIComponent(node.slug)}`}
        className={`block text-sm hover:text-primary ${node.slug === current ? 'font-bold text-primary' : ''}`}
        style={{ paddingLeft: `${level * 1.5}rem` }}
        onClick={() => onItemClick?.()}
      >{node.label}</Link>

      {node.slug === current && headings.length > 0 && (
        <ul className="list-none mt-1">
          {headings.map(h => (
            <li key={h.id} style={{ paddingLeft: `${h.depth * 1.5}rem` }}>
              <a href={`#${h.id}`} className="text-sm hover:underline" onClick={() => onItemClick?.()}>
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}

      {node.children.length > 0 && (
        <ul className="list-none">
          {node.children.map(c => renderNode(c, level + 1))}
        </ul>
      )}
    </li>
  )

  return <nav className="p-4"><ul className="space-y-2">{tree.map(n => renderNode(n))}</ul></nav>
}