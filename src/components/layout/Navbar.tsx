'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useCartStore } from '@/hooks/useCartStore';
import useMounted from '@/hooks/useMounted';

const navItems = [
  { label: 'Suplementy', href: '/supplements' },
  { label: 'Vybavení', href: '/equipment' },
  { label: 'Bazar strojů', href: '/bazaar' },
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
          <img
            src="/images/brand/logo-fitness77.png"
            alt="Fitness 77"
            className="h-12 w-auto object-contain"
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
          < ThemeToggle />
          <Link
            href="/cart"
            className="rounded-md bg-[#E10600] px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110"
          >
            Košík {mounted && totalItems > 0 ? `(${totalItems})` : ''}
          </Link>
        </div>
      </div>
    </header>
  );
}
