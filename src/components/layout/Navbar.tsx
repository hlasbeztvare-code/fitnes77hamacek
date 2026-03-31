'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/hooks/useCartStore';
import useMounted from '@/hooks/useMounted';

const navItems = [
  { label: 'SUPLEMENTY', href: '/supplements' },
  { label: 'VYBAVENÍ', href: '/equipment' },
  { label: 'BAZAR', href: '/bazaar' },
  { label: 'GYM / TRENÉŘI', href: '/gym' },
];

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());
  const mounted = useMounted();

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="flex w-full items-center rounded-b-[2.5rem] border-b border-white/20 bg-black/40 py-1 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-12">
        <div className="flex w-[300px] items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/brand/logo-fitness77.png"
              alt="Fitness 77"
              width={120}
              height={30}
              className="h-7 w-auto object-contain"
              priority
            />
            <span className="text-xl font-black uppercase tracking-[0.14em] text-white">
              FITNESS <span className="text-[#E10600]">77</span>
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex flex-1 justify-center items-center">
          <div className="flex gap-12 uppercase font-bold tracking-wide text-white text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#E10600]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex w-[300px] items-center justify-end gap-5 relative z-50">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link href="/cart" className="relative block">
              <ShoppingCart className="h-6 w-6 text-white hover:text-[#E10600] transition-colors" />
              {mounted && totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#E10600] text-[10px] font-black text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div 
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#E10600] transition-colors group"
              onClick={() => console.log('User profile opened')}
            >
              <User className="h-5 w-5 text-black group-hover:text-white transition-colors" />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
