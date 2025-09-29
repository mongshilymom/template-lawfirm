"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '../../lib/siteConfig';

/**
 * A sticky navigation bar that appears at the top of the page.  As the user
 * scrolls down, a translucent background is applied to improve contrast.
 * Drop down menus are revealed on hover for nested navigation options.
 */
export default function Navigation() {
  // Track when the user has scrolled down so we can apply a background.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    // Initialize state immediately on mount.
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition backdrop-blur-md ${
        scrolled ? 'bg-white/70 dark:bg-black/40 border-b border-black/5' : ''
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="font-heading text-xl">
          {siteConfig.name}
        </Link>
        {/* Desktop navigation */}
        <ul className="hidden md:flex items-center gap-6">
          <li className="group relative">
            <Link href="/about">펌 소개</Link>
            {/* Dropdown */}
            <div className="absolute top-full left-0 hidden group-hover:block bg-white dark:bg-zinc-900 shadow rounded p-3">
              <div className="grid min-w-[200px] gap-2">
                <Link href="/about">연혁·비전</Link>
                <Link href="/lawyers">구성원</Link>
              </div>
            </div>
          </li>
          <li className="group relative">
            <Link href="/practice">업무분야</Link>
            {/* Dropdown */}
            <div className="absolute top-full left-0 hidden group-hover:block bg-white dark:bg-zinc-900 shadow rounded p-3">
              <div className="grid min-w-[220px] gap-2">
                <Link href="/practice">기업법무</Link>
                <Link href="/practice">형사</Link>
                <Link href="/practice">가사</Link>
                <Link href="/practice">부동산</Link>
              </div>
            </div>
          </li>
          <li>
            <Link href="/cases">성공사례</Link>
          </li>
          <li>
            <Link href="/news">뉴스/칼럼</Link>
          </li>
          <li>
            <Link href="/consultation" className="btn-primary">
              상담신청
            </Link>
          </li>
        </ul>
        {/* Mobile menu placeholder */}
        <button className="md:hidden border px-3 py-2 rounded">Menu</button>
      </nav>
    </header>
  );
}
