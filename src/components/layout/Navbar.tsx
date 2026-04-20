'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/hooks/useCartStore';
import useMounted from '@/hooks/useMounted';
import { useState } from 'react';
import NavbarTopBar from './NavbarTopBar';

const navItems = [
  { label: 'GYM', href: '/' },
  { label: 'SUPLEMENTY', href: '/supplements' },
  { label: 'VYBAVENÍ', href: '/equipment' },
  { label: 'BAZAR', href: '/bazaar' },
];

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());
  const mounted = useMounted();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <NavbarTopBar />
        <header className="w-full">
          <div className="flex w-full items-center rounded-b-[2.5rem] border-b border-white/20 bg-black/40 py-1 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-4 md:px-12">
            {/* Logo */}
            <div className="flex flex-1 md:w-[300px] items-center">
              <Link href="/" className="flex items-center gap-2 md:gap-3 px-1 md:px-0">
                <Image
                  src="/images/brand/logo-fitness77.png"
                  alt="Fitness 77"
                  width={120}
                  height={30}
                  className="h-10 w-auto md:h-7 object-contain brightness-0 invert"
                  priority
                />
                <span className="text-base md:text-xl font-black uppercase tracking-[0.1em] md:tracking-[0.14em] text-white whitespace-nowrap">
                  FITNESS 77
                </span>
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex flex-[2] justify-start items-center px-12">
              <div className="flex w-full max-w-3xl items-center justify-between uppercase font-black tracking-[0.1em] text-white text-[1.1rem]">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition-all hover:text-[#E10600] whitespace-nowrap hover:scale-110 duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center justify-end gap-4 md:gap-5 relative z-50 md:w-[300px]">
              <Link href="/cart" className="relative group p-2">
                <ShoppingCart className="h-6 w-6 text-white group-hover:text-[#E10600] transition-colors" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E10600] text-[10px] font-black text-white ring-2 ring-black animate-in zoom-in duration-300">
                    {totalItems}
                  </span>
                )}
              </Link>

              <motion.div
                className="hidden md:block"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className="w-9 h-9 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#E10600] transition-colors group"
                  title="Můj účet (připravujeme)"
                >
                  <User className="h-5 w-5 text-black group-hover:text-white transition-colors" />
                </div>
              </motion.div>

              <button
                className="lg:hidden p-2 text-white"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Otevřít menu"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-10 lg:hidden"
          >
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Zavřít menu"
            >
              <X className="h-8 w-8" />
            </button>

            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 mb-4">
              <Image
                src="/images/brand/logo-fitness77.png"
                alt="Fitness 77"
                width={120}
                height={30}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
              <span className="text-2xl font-black uppercase tracking-widest text-white">FITNESS 77</span>
            </Link>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-4xl font-black uppercase tracking-[0.1em] text-white hover:text-[#E10600] transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-4 text-4xl font-black uppercase tracking-[0.1em] text-white hover:text-[#E10600] transition-colors"
            >
              <span>Košík</span>
              {mounted && totalItems > 0 && (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E10600] text-sm text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
