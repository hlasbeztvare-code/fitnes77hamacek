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
    { name: 'BLOG', href: '/blog' },
  ];

  const handleCartClick = () => {
    if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
    console.log("NAVBAR_UNIT_01: ACCESSING CART...");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-zinc-100 px-6 py-4 flex justify-between items-center font-black uppercase tracking-tighter text-[11px]">
      {/* BRAND - ESHOP FONT MONOLITH (smrk) */}
      <Link href="/" className="text-2xl tracking-tighter font-black">
        FITNESS<span className="text-[#E10600]">77</span>
      </Link>
      
      {/* MENU - PŘESNÉ POŘADÍ DLE JANA LANČARIČE (smrk) */}
      <div className="hidden md:flex gap-10">
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`transition-all relative py-1 font-black ${pathname === link.href ? 'text-[#E10600]' : 'text-zinc-400 hover:text-black'}`}
          >
            {link.name}
            {/* PŮVODNÍ DESIGN PODTRŽENÍ (smrk) */}
            {pathname === link.href && (
              <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#E10600]"></div>
            )}
          </Link>
        ))}
      </div>

      {/* IKONY & FUNKČNÍ KOŠÍK */}
      <div className="flex gap-4 items-center">
        <button className="p-2.5 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-all">☀️</button>
        <button 
          onClick={handleCartClick}
          className="relative p-2.5 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-all cursor-pointer"
        >
          <span className="text-lg">🛒</span>
          <span className="absolute -top-1 -right-1 bg-[#E10600] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">1</span>
        </button>
      </div>
    </nav>
  );
}
