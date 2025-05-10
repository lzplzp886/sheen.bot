// src/app/(normal)/sheenbotInfinity/manual/ManualShell.tsx

'use client'

import React, { ReactNode, useState } from 'react'
import { Sidebar } from './Sidebar'

export default function ManualShell({
  items,
  current,
  children,
}: {
  items: { title: string; slug: string }[]
  current?: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen">
      {/* hamburger toggle */}
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className="fixed top-4 left-4 z-30 p-2 bg-white rounded shadow-md md:hidden"
      >
        {open ? '×' : '☰'}
      </button>

      {/* sidebar drawer */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white z-20 transform
          transition-transform duration-200 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          w-2/3        /* mobile: ~66% */
          sm:w-1/3     /* ≥640px: ~33% */
          md:relative md:translate-x-0 md:w-64 /* ≥768px: fixed 256px */
          border-r overflow-auto
        `}
      >
        <Sidebar items={items} current={current} />
      </aside>

      {/* main content */}
      <main className="flex-1 p-6 overflow-auto prose max-w-none">
        {children}
      </main>
    </div>
  )
}
