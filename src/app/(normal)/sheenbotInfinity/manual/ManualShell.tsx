// src/app/(normal)/sheenbotInfinity/manual/ManualShell.tsx

'use client'

import React, { ReactNode, useState } from 'react'
import { Sidebar } from './Sidebar'

export default function ManualShell({
  items,
  current,
  children,
}: {
  items: { slug: string; label: string }[]
  current?: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const closeSidebar = () => setOpen(false)

  return (
    <div className="flex h-screen relative">
      {/* toggle button, always rendered */}
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className={`
          fixed top-24 p-2 bg-white rounded shadow-md z-30 md:hidden
          transition-all duration-200 ease-in-out
          ${open ? 'left-[66.666667%] sm:left-[33.333333%]' : 'left-4'}
        `}
      >
        {open ? '←' : '☰'}
      </button>

      {/* sidebar drawer */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white z-20 transform
          transition-transform duration-200 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          w-2/3         /* mobile */
          sm:w-1/3      /* ≥640px */
          md:relative md:translate-x-0 md:top-0 md:w-64
          border-r overflow-auto
        `}
      >
        {/* push nav down below the button/header on mobile */}
        <div>
          <Sidebar
            items={items}
            current={current}
            onItemClick={closeSidebar}   // closes when a link is clicked
          />
        </div>
      </aside>

      {/* main content; clicking here also closes sidebar if open */}
      <main
        className="flex-1 p-6 overflow-auto prose max-w-none"
        onClick={() => open && closeSidebar()}
      >
        {children}
      </main>
    </div>
  )
}
