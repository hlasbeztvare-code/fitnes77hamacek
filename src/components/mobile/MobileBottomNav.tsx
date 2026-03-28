'use client';
import React from 'react';
import { ShoppingBag, Home, Zap, User } from 'lucide-react';
import { useCartStore } from '@/hooks/useCartStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav() {
  const items = useCartStore((s) => s.items);
  const pathname = usePathname();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { name: 'Domů', icon: Home, href: '/' },
    { name: 'Shop', icon: Zap, href: '/supplements' },
    { name: 'Profil', icon: User, href: '/gym' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[90] md:hidden bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1">
              <Icon size={20} className={isActive ? 'text-[#E10600]' : 'text-zinc-500'} />
              <span className={`text-[9px] font-black uppercase tracking-tighter ${isActive ? 'text-white' : 'text-zinc-600'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
        
        {/* Centrální Košík - Dominantní konverzní prvek */}
        <Link href="/cart" className="relative -mt-10 group">
          <div className="bg-[#E10600] p-4 rounded-2xl rotate-45 border-4 border-zinc-950 shadow-[0_0_20px_rgba(225,6,0,0.4)] group-active:scale-90 transition-transform">
            <div className="-rotate-45">
              <ShoppingBag size={24} className="text-white" strokeWidth={2.5} />
            </div>
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-[#E10600]">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
