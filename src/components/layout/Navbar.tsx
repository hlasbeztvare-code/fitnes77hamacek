"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"; 
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/hooks/useCartStore";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isGym = pathname === "/gym";

  const navLinks = [
    { name: "Suplementy", href: "/supplements" },
    { name: "Vybavení", href: "/equipment" },
    { name: "Trenéři & Gym", href: "/gym" },
    { name: "Bazar", href: "/bazaar" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
      isGym 
        ? `bg-[#E10600] border-b-4 border-black ${isScrolled ? "py-3 shadow-lg" : "py-5"}`
        : isScrolled 
          ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-200 dark:border-white/10 py-3 shadow-sm" 
          : "bg-white dark:bg-zinc-950 py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center relative">
          
          <Link href="/" className="flex-shrink-0 flex items-center group relative z-10">
            <span className={`text-2xl md:text-3xl font-black uppercase tracking-tighter group-active:scale-95 transition-transform ${isGym ? "text-black" : "text-zinc-900 dark:text-white"}`}>
              FITNESS<span className={isGym ? "text-white" : "text-[#E10600]"}>77</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8 relative z-20">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                  isGym 
                    ? pathname === link.href ? "text-white" : "text-black hover:text-white"
                    : pathname === link.href ? "text-[#E10600]" : "text-zinc-600 dark:text-zinc-400 hover:text-[#E10600]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* DYNAMICKÝ PRAVÝ BLOCK - LOGO PŘETÉKÁ Z LAYOUTU */}
          <div className="flex items-center gap-6 relative z-10">
             
             {/* TVOJE NABLEJSKANÉ LOGO - UMÍSTĚNÉ VPRAVO, PŘETÉKÁ Z LAYOUTU */}
             <div className="relative group hover:scale-105 transition-transform duration-500">
               <Image 
                 src="/images/logo.png" 
                 alt="Fitness77 Sovereign Logo" 
                 width={100} 
                 height={100} 
                 className={`transition-colors ${isGym ? "text-black" : "text-zinc-900 dark:text-white"}`}
                 priority 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent"></div>
             </div>

             <div className="flex items-center gap-4">
               <ThemeToggle />
               <Link href="/cart" className="relative hidden md:flex items-center group">
                 <div className={`p-2.5 rounded-xl transition-colors duration-300 ${
                   isGym 
                     ? "bg-black group-hover:bg-white" 
                     : "bg-zinc-100 dark:bg-zinc-900 group-hover:bg-[#E10600]"
                 }`}>
                   <ShoppingCart className={`w-5 h-5 transition-colors ${
                     isGym 
                       ? "text-white group-hover:text-black" 
                       : "text-zinc-900 dark:text-white group-hover:text-white"
                   }`} />
                 </div>
                 {cartCount > 0 && (
                   <span className={`absolute -top-2 -right-2 text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 shadow-sm ${
                     isGym 
                       ? "bg-white text-black border-black" 
                       : "bg-[#E10600] text-white border-white dark:border-zinc-950"
                   }`}>
                     {cartCount}
                   </span>
                 )}
               </Link>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}
