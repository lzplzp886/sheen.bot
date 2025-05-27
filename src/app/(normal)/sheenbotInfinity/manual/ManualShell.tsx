// src/app/(normal)/sheenbotInfinity/manual/ManualShell.tsx

'use client'

import React, { ReactNode, useState } from 'react'
import { Sidebar } from './Sidebar'
import type { ManualTreeNode } from '@/lib/manual'

export default function ManualShell({
  tree,
  current,
  headings,
  children,
}: {
  tree: ManualTreeNode[]
  current?: string
  headings: { depth: number; text: string; id: string }[]
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className="flex h-screen relative">
      {/* Toggle button */}
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(v => !v)}
        className={`fixed top-24 p-2 bg-background rounded shadow-md z-30 md:hidden transition-all duration-200 ease-in-out ${
          open ? 'left-[66.666667%] sm:left-[33.333333%]' : 'left-4'
        }`}
      >{open ? '←' : '☰'}</button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-background z-20 transform transition-transform duration-200 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } w-2/3 sm:w-1/3 md:relative md:translate-x-0 md:top-0 md:w-64 border-r overflow-auto`}>
        <div>
          <Sidebar tree={tree} current={current} headings={headings} onItemClick={close} />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto prose max-w-none" onClick={() => open && close()}>
        {children}
      </main>
    </div>
  )
}