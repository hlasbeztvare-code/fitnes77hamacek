#!/bin/bash
set -e

echo "⚡ Applying Fitness 77 commerce phase..."

mkdir -p src/app/checkout
mkdir -p src/app/success

cat > src/hooks/useCartStore.ts <<'EOF'
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      increaseItem: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : 
item
          ),
        })),

      decreaseItem: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : 
item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * 
item.quantity, 0),
    }),
    {
      name: 'fitness77-cart',
    }
  )
);
EOF

cat > src/app/cart/page.tsx <<'EOF'
'use client';

import Link from 'next/link';
import { useCartStore } from '@/hooks/useCartStore';

const FREE_SHIPPING_THRESHOLD = 2000;

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseItem = useCartStore((state) => state.increaseItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const totalPrice = useCartStore((state) => state.totalPrice());

  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 
100);
  const missing = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);

  return (
    <section className="py-16">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <h1 className="text-5xl font-bold uppercase">Košík</h1>

        {items.length === 0 ? (
          <div className="mt-8 rounded-xl border border-zinc-200 bg-white 
p-8 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-zinc-600 dark:text-zinc-400">Košík je zatím 
prázdný.</p>
            <Link
              href="/supplements"
              className="mt-4 inline-block rounded-md bg-[#E10600] px-6 
py-3 font-bold uppercase tracking-wide text-white"
            >
              Jít nakupovat
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 rounded-xl border border-zinc-200 
bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center justify-between text-sm 
font-semibold uppercase tracking-wide">
                <span>Doprava zdarma progress</span>
                <span>{progress >= 100 ? 'Splněno' : `Chybí 
${missing.toLocaleString('cs-CZ')} Kč`}</span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full 
bg-zinc-200 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full bg-[#E10600] 
transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-xl border 
border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <div
                      className="h-24 w-24 rounded-lg bg-cover bg-center 
bg-zinc-100 dark:bg-zinc-900"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />

                    <div className="flex-1">
                      <h2 className="text-xl font-bold 
uppercase">{item.name}</h2>
                      <p className="mt-1 text-sm text-zinc-500 
dark:text-zinc-400">
                        {item.price.toLocaleString('cs-CZ')} Kč / ks
                      </p>

                      <div className="mt-4 flex items-center gap-2">
                        <button
                          onClick={() => decreaseItem(item.id)}
                          className="rounded-md border border-zinc-300 
px-3 py-1 dark:border-zinc-700"
                        >
                          -
                        </button>
                        <span className="min-w-8 text-center 
font-bold">{item.quantity}</span>
                        <button
                          onClick={() => increaseItem(item.id)}
                          className="rounded-md border border-zinc-300 
px-3 py-1 dark:border-zinc-700"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-[#E10600]">
                        {(item.price * 
item.quantity).toLocaleString('cs-CZ')} Kč
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-3 text-sm font-semibold 
text-zinc-500 hover:text-[#E10600]"
                      >
                        Odstranit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="h-fit rounded-xl border border-zinc-200 
bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                <h2 className="text-2xl font-bold uppercase">Shrnutí</h2>

                <div className="mt-6 flex items-center justify-between 
text-sm text-zinc-500 dark:text-zinc-400">
                  <span>Mezisoučet</span>
                  <span>{totalPrice.toLocaleString('cs-CZ')} Kč</span>
                </div>

                <div className="mt-3 flex items-center justify-between 
text-sm text-zinc-500 dark:text-zinc-400">
                  <span>Doprava</span>
                  <span>{totalPrice >= FREE_SHIPPING_THRESHOLD ? 'Zdarma' 
: 'V checkoutu'}</span>
                </div>

                <div className="mt-6 flex items-center justify-between 
border-t border-zinc-200 pt-6 text-xl font-bold dark:border-zinc-800">
                  <span>Celkem</span>
                  <span 
className="text-[#E10600]">{totalPrice.toLocaleString('cs-CZ')} Kč</span>
                </div>

                <Link
                  href="/checkout"
                  className="mt-6 block w-full rounded-md bg-[#E10600] 
px-6 py-3 text-center font-bold uppercase tracking-wide text-white 
transition hover:brightness-110"
                >
                  Pokračovat k platbě
                </Link>
              </aside>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
EOF

cat > src/app/checkout/page.tsx <<'EOF'
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/hooks/useCartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <section className="py-16">
        <div className="mx-auto w-[min(800px,calc(100%-32px))] rounded-xl 
border border-zinc-200 bg-white p-8 dark:border-zinc-800 
dark:bg-zinc-950">
          <h1 className="text-4xl font-bold uppercase">Checkout</h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Nemáš zatím žádné produkty v košíku.
          </p>
        </div>
      </section>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      clearCart();
      router.push('/success');
    }, 1200);
  };

  return (
    <section className="py-16">
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-8 
lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-zinc-200 bg-white p-8 
dark:border-zinc-800 dark:bg-zinc-950"
        >
          <h1 className="text-4xl font-bold uppercase">Checkout</h1>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <input className="rounded-md border border-zinc-300 px-4 py-3 
dark:border-zinc-700 dark:bg-black" placeholder="Jméno" required />
            <input className="rounded-md border border-zinc-300 px-4 py-3 
dark:border-zinc-700 dark:bg-black" placeholder="Příjmení" required />
            <input className="rounded-md border border-zinc-300 px-4 py-3 
dark:border-zinc-700 dark:bg-black md:col-span-2" placeholder="Email" 
type="email" required />
            <input className="rounded-md border border-zinc-300 px-4 py-3 
dark:border-zinc-700 dark:bg-black md:col-span-2" placeholder="Adresa" 
required />
            <input className="rounded-md border border-zinc-300 px-4 py-3 
dark:border-zinc-700 dark:bg-black" placeholder="Město" required />
            <input className="rounded-md border border-zinc-300 px-4 py-3 
dark:border-zinc-700 dark:bg-black" placeholder="PSČ" required />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 rounded-md bg-[#E10600] px-6 py-3 font-bold 
uppercase tracking-wide text-white transition hover:brightness-110 
disabled:opacity-60"
          >
            {loading ? 'Zpracovávám...' : 'Dokončit objednávku'}
          </button>
        </form>

        <aside className="h-fit rounded-xl border border-zinc-200 bg-white 
p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-2xl font-bold uppercase">Shrnutí 
objednávky</h2>

          <div className="mt-6 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center 
justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{(item.price * 
item.quantity).toLocaleString('cs-CZ')} Kč</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-zinc-200 pt-6 
dark:border-zinc-800">
            <div className="flex items-center justify-between text-xl 
font-bold">
              <span>Celkem</span>
              <span 
className="text-[#E10600]">{totalPrice.toLocaleString('cs-CZ')} Kč</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
EOF

cat > src/app/success/page.tsx <<'EOF'
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <section className="py-16">
      <div className="mx-auto w-[min(800px,calc(100%-32px))] rounded-xl 
border border-zinc-200 bg-white p-10 text-center dark:border-zinc-800 
dark:bg-zinc-950">
        <div className="text-sm font-bold uppercase tracking-[0.2em] 
text-[#E10600]">
          Objednávka přijata
        </div>

        <h1 className="mt-4 text-5xl font-bold uppercase">
          Díky za nákup
        </h1>

        <p className="mt-6 text-zinc-600 dark:text-zinc-400">
          Tvoje objednávka byla úspěšně odeslána. Detaily a další 
informace přijdou na email.
        </p>

        <Link
          href="/supplements"
          className="mt-8 inline-block rounded-md bg-[#E10600] px-6 py-3 
font-bold uppercase tracking-wide text-white transition 
hover:brightness-110"
        >
          Zpět do shopu
        </Link>
      </div>
    </section>
  );
}
EOF

echo "✅ Commerce phase complete."
