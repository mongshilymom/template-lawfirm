"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const menu = [
  { name: "펌 소개", href: "/about" },
  { name: "구성원", href: "/lawyers" },
  { name: "업무분야", href: "/practice" },
  { name: "성공사례", href: "/cases" },
  { name: "뉴스", href: "/news" },
  { name: "법률계산기", href: "/calculator/divorce" },
  { name: "상담신청", href: "/consultation" },
];

export default function Navigation(){
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-50 transition ${scrolled ? "backdrop-blur bg-white/70 dark:bg-black/40 border-b border-black/5" : ""}`}>
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-heading text-xl">QUANTUM Legal</Link>
        <ul className="hidden md:flex items-center gap-6">
          {menu.map(m => <li key={m.href}><Link href={m.href} className="hover:underline">{m.name}</Link></li>)}
        </ul>
        <Link href="/consultation" className="hidden md:inline-block px-4 py-2 rounded bg-amber-500 text-white">상담신청</Link>
      </nav>
    </header>
  );
}
