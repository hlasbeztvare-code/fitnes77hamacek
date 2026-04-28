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
  { label: 'TRENÉŘI', href: '/#trainers' },
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
      <div className="fixed top-0 left-0 right-0 z-[10001] w-full flex flex-col pointer-events-none">
        <div className="pointer-events-auto">
          <NavbarTopBar />
        </div>
        <header 
          className="w-full pointer-events-auto px-2 sm:px-0"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <div className="flex w-full items-center rounded-b-[2.5rem] border-b border-white/20 bg-black/40 py-1 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-6 md:px-12">
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
            <div className="flex items-center justify-end gap-2 sm:gap-4 md:gap-5 relative z-[10002] flex-none md:w-[300px]">
              <button 
                onClick={() => useCartStore.getState().openCart()}
                className="relative group p-2 focus:outline-none"
              >
                <ShoppingCart className="h-6 w-6 text-white group-hover:text-[#E10600] transition-colors" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E10600] text-[9px] font-black text-white ring-1 ring-black animate-in zoom-in duration-300">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                className="lg:hidden p-2 text-[#d4ff00]"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Otevřít menu"
              >
                {mobileOpen ? <X className="h-8 w-8 text-white" /> : <Menu className="h-8 w-8 text-[#d4ff00]" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[10005] bg-black/98 backdrop-blur-xl flex flex-col items-center justify-start pt-12 gap-6 lg:hidden overflow-y-auto"
          >
            <button
              className="absolute top-6 right-6 text-[#d4ff00] p-4"
              onClick={() => setMobileOpen(false)}
              aria-label="Zavřít menu"
            >
              <X className="h-10 w-10" />
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

            <button
              onClick={() => {
                setMobileOpen(false);
                useCartStore.getState().openCart();
              }}
              className="flex items-center gap-4 text-4xl font-black uppercase tracking-[0.1em] text-white hover:text-[#E10600] transition-colors focus:outline-none"
            >
              <span>Košík</span>
              {mounted && totalItems > 0 && (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E10600] text-sm text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
