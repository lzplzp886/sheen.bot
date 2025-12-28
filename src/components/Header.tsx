// src/components/Header.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import userPool from '@/lib/cognitoClient';
import { useUser } from '@/context/UserContext';
import Avatar from '@/components/Avatar';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const router = useRouter();
  const { username, firstName, setUsername } = useUser();
  const [isOpen, setIsOpen] = useState(false); // 移动端菜单状态
  const [dropdownOpen, setDropdownOpen] = useState(false); // 桌面端下拉菜单状态

  const handleSignOut = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
    setUsername(null);
    setIsOpen(false);
    setDropdownOpen(false);
    router.push('/');
  };

  /**
   * 辅助函数：获取显示名称
   * 逻辑：
   * 1. 优先显示 firstName (given_name)。
   * 2. 如果没有 firstName，且 username 是 UUID (Cognito sub)，则返回空字符串，不显示。
   * 3. 这里的 UUID 匹配比较宽泛，只要看起来像乱码 ID 就不显示。
   */
  const getDisplayName = () => {
    if (firstName) return firstName;
    
    // 如果 username 存在，检查它是否像一个 UUID (通常包含多个连字符) 或者 sub ID
    // Cognito 的 sub ID 通常是 UUID 格式：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    const isUuid = username && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(username);
    const isGoogleId = username && username.startsWith('google_');
    
    if (isUuid || isGoogleId) {
      return ''; // 这种 ID 字符串不显示
    }

    return username || ''; // 其他情况（如普通用户名）显示 username
  };

  const displayName = getDisplayName();

  return (
    <header className="bg-primary shadow-lg relative z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1 className="m-0">
          <Link href="/" className="inline-block">
            <Image src="/images/logo.png" alt="sheen.bot Logo" width={80} height={80} />
          </Link>
        </h1>
        {/* 移动端汉堡按钮 */}
        <div className="lg:hidden pr-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-background focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* 桌面端导航 */}
        <nav className="hidden lg:flex items-center">
          <ul className="flex space-x-8 items-center mr-8">
            <li className="text-background text-lg font-normal hover:text-secondary transition-colors duration-300">
              <Link href="/" onClick={() => setIsOpen(false)}>
                home
              </Link>
            </li>
            <li className="text-background text-lg font-normal hover:text-secondary transition-colors duration-300">
              <Link href="/infinity" onClick={() => setIsOpen(false)}>
                sheenbot∞
              </Link>
            </li>
            <li className="text-background text-lg font-normal hover:text-secondary transition-colors duration-300">
              <Link href="/solutions" onClick={() => setIsOpen(false)}>
                solutions
              </Link>
            </li>
            <li className="text-background text-lg font-normal hover:text-secondary transition-colors duration-300">
              <Link href="/academy" onClick={() => setIsOpen(false)}>
                academy
              </Link>
            </li>
            <li className="text-background text-lg font-normal hover:text-secondary transition-colors duration-300">
              <Link 
                href="https://store.sheen.co.za" 
                onClick={() => setIsOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                store
              </Link>
            </li>
          </ul>

          {/* 登录/用户信息区域 */}
          {!username ? (
            <Link
              href="/login"
              className="bg-background text-body px-4 py-2 rounded-full font-semibold shadow hover:bg-light transition duration-300"
            >
              login
            </Link>
          ) : (
            // 桌面端用户头像下拉菜单
            <div 
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="flex items-center gap-2 cursor-pointer py-4">
                <span className="text-background text-lg font-semibold transition-colors duration-300">
                  {displayName ? `Welcome, ${displayName}!` : 'Welcome!'}
                </span>
                <Avatar size={40} edit={false} />
              </div>
              
              {/* 下拉菜单 */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full bg-white text-body shadow-xl rounded-lg w-48 overflow-hidden z-50 border border-gray-100"
                  >
                    <div className="flex flex-col">
                       <Link 
                        href="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="px-4 py-3 hover:bg-gray-100 transition-colors text-left"
                       >
                         Dashboard
                       </Link>
                       <button
                         onClick={handleSignOut}
                         className="px-4 py-3 hover:bg-gray-100 transition-colors text-left w-full text-red-500"
                       >
                         Sign Out
                       </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>
      </div>

      {/* 移动端下拉菜单 */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-primary overflow-hidden"
          >
            <div className="p-4">
              <ul className="flex flex-col space-y-2">
                <li className="text-background text-lg font-normal hover:text-secondary transition-colors duration-300 border-b border-secondary pb-2">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    home
                  </Link>
                </li>
                <li className="text-background text-lg font-normal hover:text-secondary transition-colors duration-300 border-b border-secondary pb-2">
                  <Link href="/infinity" onClick={() => setIsOpen(false)}>
                    sheenbot∞
                  </Link>
                </li>
                <li className="text-background text-lg font-normal hover:text-secondary transition-colors duration-300 border-b border-secondary pb-2">
                  <Link href="/solutions" onClick={() => setIsOpen(false)}>
                    solutions
                  </Link>
                </li>
                <li className="text-background text-lg font-normal hover:text-secondary transition-colors duration-300 border-b border-secondary pb-2">
                  <Link href="/academy" onClick={() => setIsOpen(false)}>
                    academy
                  </Link>
                </li>
                <li className="text-background text-lg font-normal hover:text-secondary transition-colors duration-300 border-b border-secondary pb-2">
                  <Link 
                    href="https://store.sheen.co.za" 
                    onClick={() => setIsOpen(false)}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    store
                  </Link>
                </li>
              </ul>
              {!username && (
                <div className="mt-4">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="bg-background text-body px-4 py-2 rounded-full font-semibold shadow hover:bg-light transition duration-300 block text-center"
                  >
                    login
                  </Link>
                </div>
              )}
              {username && (
                <div className="mt-4">
                  <p className="text-background text-lg font-semibold transition-colors duration-300 mb-2">
                    {displayName ? `Welcome, ${displayName}!` : 'Welcome!'}
                  </p>
                  
                  {/* 移动端 Dashboard 按钮 */}
                  <div className="flex gap-4">
                    <Link
                       href="/dashboard"
                       onClick={() => setIsOpen(false)}
                       className="flex-1 bg-secondary text-body px-4 py-2 rounded-full font-semibold shadow hover:bg-light transition duration-300 text-center"
                    >
                       Dashboard
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="bg-background text-body px-4 py-2 rounded-full font-semibold shadow hover:bg-light transition duration-300"
                    >
                        sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
