"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const navLinks = [
    { name: 'SUPLEMENTY', href: '/shop' },
    { name: 'VYBAVENÍ', href: '/shop/vybaveni' },
    { name: 'TRENÉŘI & GYM', href: '/gym' },
    { name: 'BAZAR', href: '/bazar' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-zinc-100 px-6 py-4 flex justify-between items-center font-black uppercase tracking-tighter text-[11px]">
      <Link href="/" className="text-xl tracking-tighter">FITNESS<span className="text-[#E10600]">77</span></Link>
      
      <div className="hidden md:flex gap-10">
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`transition-all relative py-1 ${pathname === link.href ? 'text-[#E10600] border-b-2 border-[#E10600]' : 'text-zinc-400 hover:text-black'}`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <button className="p-2 bg-zinc-100 rounded-lg">☀️</button>
        <button className="relative p-2 bg-zinc-100 rounded-lg">
          🛒
          <span className="absolute -top-1 -right-1 bg-[#E10600] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black">1</span>
        </button>
      </div>
    </nav>
  );
}
