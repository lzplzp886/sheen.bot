// src/app/(normal)/sheenbotInfinity/manual/Sidebar.tsx

import Link from 'next/link'

export function Sidebar({
  items,
  current,
  onItemClick,
}: {
  items: { slug: string; label: string }[]
  current?: string
  onItemClick?: () => void
}) {
  return (
    <nav className="p-4 space-y-2">
      {items.map((i) => (
        <Link
          key={i.slug}
          href={`/sheenbotInfinity/manual/${i.slug}`}
          className={
            'block text-sm hover:text-primary ' +
            (i.slug === current ? 'font-bold text-primary' : '')
          }
          onClick={() => onItemClick?.()}
        >
          {i.label}
        </Link>
      ))}
    </nav>
  )
}