"use client";

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { siteConfig } from '../../lib/siteConfig';

/**
 * Enhanced sticky navigation with scroll effects and full mobile a11y support
 * Features: focus trap, ESC key handling, ARIA attributes, keyboard navigation
 */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle mobile menu keyboard navigation and focus trap
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        mobileToggleRef.current?.focus();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && mobileMenuRef.current) {
        const focusableElements = mobileMenuRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md ${
          scrolled
            ? 'bg-white/90 dark:bg-dark-900/90 border-b border-gray-200/50 dark:border-dark-700/50 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav
          className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <Link
            href="/"
            className="font-heading text-xl font-bold text-primary-800 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label={`${siteConfig.name} 홈페이지`}
          >
            {siteConfig.name}
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden md:flex items-center gap-6" role="menubar">
            <li className="group relative" role="none">
              <Link
                href="/about"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded="false"
              >
                펌 소개
              </Link>
              {/* Desktop Dropdown */}
              <div className="absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white dark:bg-dark-800 shadow-xl rounded-xl border border-gray-200 dark:border-dark-700 p-3 min-w-[200px]">
                <div className="grid gap-2" role="menu">
                  <Link
                    href="/about"
                    className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
                    role="menuitem"
                  >
                    연혁·비전
                  </Link>
                  <Link
                    href="/lawyers"
                    className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
                    role="menuitem"
                  >
                    구성원
                  </Link>
                </div>
              </div>
            </li>
            <li className="group relative" role="none">
              <Link
                href="/practice"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded="false"
              >
                업무분야
              </Link>
              {/* Desktop Dropdown */}
              <div className="absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white dark:bg-dark-800 shadow-xl rounded-xl border border-gray-200 dark:border-dark-700 p-3 min-w-[220px]">
                <div className="grid gap-2" role="menu">
                  <Link
                    href="/practice"
                    className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
                    role="menuitem"
                  >
                    기업법무
                  </Link>
                  <Link
                    href="/practice"
                    className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
                    role="menuitem"
                  >
                    형사
                  </Link>
                  <Link
                    href="/practice"
                    className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
                    role="menuitem"
                  >
                    가사
                  </Link>
                  <Link
                    href="/practice"
                    className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
                    role="menuitem"
                  >
                    부동산
                  </Link>
                </div>
              </div>
            </li>
            <li role="none">
              <Link
                href="/cases"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                role="menuitem"
              >
                성공사례
              </Link>
            </li>
            <li role="none">
              <Link
                href="/news"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                role="menuitem"
              >
                뉴스/칼럼
              </Link>
            </li>
            <li role="none">
              <Link
                href="/consultation"
                className="btn-primary focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                role="menuitem"
                aria-label="법률 상담 신청하기"
              >
                상담신청
              </Link>
            </li>
          </ul>

          {/* Mobile menu toggle */}
          <button
            ref={mobileToggleRef}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg transition-colors"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="메뉴 열기"
          >
            <span className="sr-only">{mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}</span>
            {/* Hamburger Icon */}
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`fixed top-0 right-0 z-50 w-80 max-w-[85vw] h-full bg-white dark:bg-dark-900 border-l border-gray-200 dark:border-dark-700 transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
            <span className="font-heading text-lg font-bold text-primary-800 dark:text-primary-300">
              {siteConfig.name}
            </span>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="메뉴 닫기"
            >
              <span className="sr-only">메뉴 닫기</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile menu content */}
          <nav className="flex-1 overflow-y-auto p-4" role="menubar">
            <ul className="space-y-2">
              <li role="none">
                <Link
                  href="/about"
                  className="block px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-800 rounded-lg transition-colors"
                  role="menuitem"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  펌 소개
                </Link>
              </li>
              <li role="none">
                <Link
                  href="/lawyers"
                  className="block px-3 py-3 ml-4 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-800 rounded-lg transition-colors"
                  role="menuitem"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  구성원
                </Link>
              </li>
              <li role="none">
                <Link
                  href="/practice"
                  className="block px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-800 rounded-lg transition-colors"
                  role="menuitem"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  업무분야
                </Link>
              </li>
              <li role="none">
                <Link
                  href="/cases"
                  className="block px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-800 rounded-lg transition-colors"
                  role="menuitem"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  성공사례
                </Link>
              </li>
              <li role="none">
                <Link
                  href="/news"
                  className="block px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-800 rounded-lg transition-colors"
                  role="menuitem"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  뉴스/칼럼
                </Link>
              </li>
              <li className="pt-4" role="none">
                <Link
                  href="/consultation"
                  className="btn-primary w-full text-center focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  role="menuitem"
                  aria-label="법률 상담 신청하기"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  상담신청
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
