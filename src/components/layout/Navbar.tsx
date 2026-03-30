'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/hooks/useCartStore';
import useMounted from '@/hooks/useMounted';

const navItems = [
  { label: 'Suplementy', href: '/supplements' },
  { label: 'Vybavení', href: '/equipment' },
  { label: 'Bazar', href: '/bazaar' },
  { label: 'Gym / Trenéři', href: '/gym' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());
  const mounted = useMounted();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex w-[min(1400px,calc(100%-32px))] items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/brand/logo-fitness77.png"
            alt="Fitness 77"
            width={180}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
          <span className="text-2xl font-black uppercase tracking-[0.14em] text-zinc-900">
            FITNESS <span className="text-[#E10600]">77</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-wide text-zinc-800 transition hover:text-[#E10600]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link 
            href="/cart" 
            className="group relative flex items-center gap-2 bg-[#E10600] px-4 py-2 transition-transform hover:scale-105 active:scale-95"
            style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
          >
            <ShoppingCart className="h-4 w-4 text-white" />
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Košík
            </span>
            {mounted && totalItems > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#E10600]">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
