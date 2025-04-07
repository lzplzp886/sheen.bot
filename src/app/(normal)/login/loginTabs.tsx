// src/app/(normal)/login/loginTabs.tsx

import React from 'react'
import Image from 'next/image'

interface LoginTabsProps {
  activeTab: 'email' | 'google'
  setActiveTab: (tab: 'email' | 'google') => void
}

export default function LoginTabs({ activeTab, setActiveTab }: LoginTabsProps) {
  return (
    <div className="flex">
      <button
        className={`flex-1 px-4 py-2 rounded-tl-lg border border-light border-b-0 transition-colors duration-300 ${
          activeTab === "email" ? "bg-body" : "bg-light"
        }`}
        onClick={() => setActiveTab("email")}
      >
        <div className="flex justify-center items-center">
          <Image src="/images/login/email-sign-in.svg" alt="Email" width={24} height={24} />
        </div>
      </button>
      <button
        className={`flex-1 px-4 py-2 rounded-tr-lg border border-light border-b-0 transition-colors duration-300 ${
          activeTab === "google" ? "bg-body" : "bg-light"
        }`}
        onClick={() => setActiveTab("google")}
      >
        <div className="flex justify-center items-center">
          <Image src="/images/login/google-sign-in.svg" alt="Google" width={24} height={24} />
        </div>
      </button>
    </div>
  )
}
