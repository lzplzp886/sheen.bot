// src/app/(normal)/sheenbotInfinity/manual/Sidebar.tsx

import Link from 'next/link'

export function Sidebar({
  items,
  current,
}: {
  items: { title: string; slug: string }[]
  current?: string
}) {
  return (
    <aside className="w-64 border-r overflow-auto">
      <nav className="p-4 space-y-2">
        {items.map((i) => (
          <Link
            key={i.slug}
            href={`/sheenbotInfinity/manual/${i.slug}`}
            className={
              'block text-sm hover:text-primary ' +
              (i.slug === current ? 'font-bold text-primary' : '')
            }
          >
            {i.title}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
