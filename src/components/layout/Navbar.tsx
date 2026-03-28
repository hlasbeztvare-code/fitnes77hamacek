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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-[100] w-full transition-all duration-300 bg-white border-b border-zinc-200 ${
      isScrolled ? "py-2 shadow-sm" : "py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <span className="text-2xl font-black uppercase tracking-tighter text-black">
              FITNESS<span className="text-[#E10600]">77</span>
            </span>
          </Link>
          <nav className="hidden md:flex space-x-8 font-bold uppercase text-[11px] tracking-widest text-zinc-500">
            <Link href="/supplements" className="hover:text-[#E10600] transition-colors">Suplementy</Link>
            <Link href="/equipment" className="hover:text-[#E10600] transition-colors">Vybavení</Link>
            <Link href="/gym" className="text-black border-b-2 border-[#E10600]">Trenéři & Gym</Link>
            <Link href="/bazaar" className="hover:text-[#E10600] transition-colors">Bazar</Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/cart" className="relative p-2 bg-zinc-100 rounded-lg hover:bg-[#E10600] group transition-all">
              <ShoppingCart className="w-5 h-5 text-black group-hover:text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E10600] text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
