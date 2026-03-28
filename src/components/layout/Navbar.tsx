"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const navLinks = [
    { name: "Suplementy", href: "/supplements" },
    { name: "Vybavení", href: "/equipment" },
    { name: "Trenéři & Gym", href: "/gym" },
    { name: "Bazar", href: "/bazaar" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header className={`sticky top-0 z-[100] w-full transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-200 dark:border-white/10 py-3 shadow-sm" : "bg-white dark:bg-zinc-950 py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white group-active:scale-95 transition-transform">
              FITNESS<span className="text-[#E10600]">77</span>
            </span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-[#E10600] ${pathname === link.href ? "text-[#E10600]" : "text-zinc-600 dark:text-zinc-400"}`}>
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/cart" className="relative hidden md:flex items-center group">
              <div className="bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded-xl group-hover:bg-[#E10600] transition-colors duration-300">
                <ShoppingCart className="w-5 h-5 text-zinc-900 dark:text-white group-hover:text-white transition-colors" />
              </div>
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#E10600] text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950 shadow-sm">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
