// src/components/Header.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import userPool from '@/lib/cognitoClient';
import { useUser } from '@/context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const router = useRouter();
  const { username, firstName, setUsername } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
    setUsername(null);
    router.push('/');
  };

  // 如果全局状态还在 loading，可以选择不渲染或显示 Loading...
  // 这里假设 UserContext 已经处理 loading 状态

  return (
    <header className="bg-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="m-0">
          <Link href="/" passHref>
            <a>
              <Image src="/images/logo.png" alt="sheen.bot Logo" width={80} height={80} />
            </a>
          </Link>
        </h1>
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-background focus:outline-none">
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        <nav className="hidden lg:flex">
          <ul className="flex space-x-8 items-center">
            <li className="text-background text-lg font-semibold hover:text-secondary transition-colors duration-300">
              <Link href="/">Home</Link>
            </li>
            {!username && (
              <li className="text-background text-lg font-semibold hover:text-secondary transition-colors duration-300">
                <Link href="/login">Login</Link>
              </li>
            )}
            {username && (
              <>
                <li className="text-background text-lg font-semibold transition-colors duration-300">
                  Welcome, {firstName ? firstName : username}!
                </li>
                <li>
                  <button onClick={handleSignOut} className="bg-background text-body px-4 py-2 rounded-full font-semibold shadow hover:bg-light transition duration-300">
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav key="mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="lg:hidden bg-primary overflow-hidden">
            <ul className="flex flex-col space-y-2 p-4">
              <li className="text-background text-lg font-semibold hover:text-secondary transition-colors duration-300">
                <Link href="/">Home</Link>
              </li>
              {!username && (
                <li className="text-background text-lg font-semibold hover:text-secondary transition-colors duration-300">
                  <Link href="/login">Login</Link>
                </li>
              )}
              {username && (
                <>
                  <li className="text-background text-lg font-semibold transition-colors duration-300">
                    Welcome, {firstName ? firstName : username}!
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="bg-background text-body px-4 py-2 rounded-full font-semibold shadow hover:bg-light transition duration-300">
                      Sign Out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
