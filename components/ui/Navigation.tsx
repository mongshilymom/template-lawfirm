"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const menu = [
  { name:"펌 소개", href:"/about" },
  { name:"구성원", href:"/lawyers" },
  { name:"업무분야", href:"/practice" },
  { name:"성공사례", href:"/cases" },
  { name:"뉴스", href:"/news" },
  { name:"법률계산기", href:"/calculator/divorce" },
  { name:"상담신청", href:"/consultation" }
];

export default function Navigation(){
  const [scrolled,setScrolled] = useState(false);
  const [open,setOpen] = useState(false);
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>8);
    onScroll(); window.addEventListener("scroll",onScroll);
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);
  return (
    <>
      <header className={`sticky top-0 z-50 transition ${scrolled ? "backdrop-blur bg-white/70 dark:bg-black/40 border-b border-black/5" : ""}`}>
        <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-heading text-xl">QUANTUM Legal</Link>
          <ul className="hidden md:flex items-center gap-6">
            {menu.map(m => <li key={m.href}><Link href={m.href} className="hover:underline">{m.name}</Link></li>)}
          </ul>
          <button onClick={()=>setOpen(true)} className="md:hidden border px-3 py-2 rounded">Menu</button>
        </nav>
      </header>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-zinc-900 p-6 shadow-xl">
            <button onClick={()=>setOpen(false)} className="mb-4 border px-3 py-1 rounded">닫기</button>
            <ul className="flex flex-col gap-4">
              {menu.map(m => (
                <li key={m.href}>
                  <Link href={m.href} onClick={()=>setOpen(false)} className="block hover:underline">{m.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
