#!/bin/bash
set -e

echo "🔥 Bootstrapping Fitness 77 GPT project..."

mkdir -p src/providers
mkdir -p src/components/layout
mkdir -p src/components/shop
mkdir -p src/hooks
mkdir -p src/lib/mock
mkdir -p src/app/supplements/\[slug\]
mkdir -p src/app/equipment
mkdir -p src/app/bazaar
mkdir -p src/app/gym
mkdir -p src/app/blog
mkdir -p src/app/cart

cat > src/providers/ThemeProvider.tsx <<'EOF'
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="fitness77-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
EOF

cat > src/components/layout/ThemeToggle.tsx <<'EOF'
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label="Přepnout motiv"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex h-10 w-10 items-center justify-center 
rounded-md border border-zinc-300 bg-white text-sm font-bold text-zinc-900 
transition hover:border-[#E10600] hover:text-[#E10600] 
dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
    >
      {isDark ? '☀' : '☾'}
    </button>
  );
}
EOF

cat > src/hooks/useCartStore.ts <<'EOF'
'use client';

import { create } from 'zustand';

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

export const useCartStore = create<CartStore>((set, get) => ({
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
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decreaseItem: (id) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),

  totalItems: () =>
    get().items.reduce((acc, item) => acc + item.quantity, 0),

  totalPrice: () =>
    get().items.reduce((acc, item) => acc + item.price * item.quantity, 
0),
}));
EOF

cat > src/components/layout/Navbar.tsx <<'EOF'
'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useCartStore } from '@/hooks/useCartStore';

const navItems = [
  { label: 'Suplementy', href: '/supplements' },
  { label: 'Vybavení', href: '/equipment' },
  { label: 'Bazar strojů', href: '/bazaar' },
  { label: 'Gym / Trenéři', href: '/gym' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 
bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/70">
      <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] 
items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold uppercase 
tracking-widest">
          FITNESS <span className="text-[#E10600]">77</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-wide 
text-zinc-800 transition hover:text-[#E10600] dark:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/cart"
            className="rounded-md bg-[#E10600] px-4 py-2 text-sm font-bold 
uppercase tracking-wide text-white transition hover:brightness-110"
          >
            Košík {totalItems > 0 ? `(${totalItems})` : ''}
          </Link>
        </div>
      </div>
    </header>
  );
}
EOF

cat > src/components/layout/Footer.tsx <<'EOF'
export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-12 
dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-8 
md:grid-cols-4">
        <div>
          <div className="text-2xl font-bold uppercase tracking-widest">
            FITNESS <span className="text-[#E10600]">77</span>
          </div>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Prémiový fitness ekosystém: suplementy, vybavení, bazar, 
trenéři a obsah.
          </p>
        </div>

        <div>
          <h4 className="font-bold uppercase">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500 
dark:text-zinc-400">
            <li>Suplementy</li>
            <li>Vybavení</li>
            <li>Bazar strojů</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase">Služby</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500 
dark:text-zinc-400">
            <li>Gym / Trenéři</li>
            <li>Rezervace</li>
            <li>Poradenství</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase">Obsah</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500 
dark:text-zinc-400">
            <li>Blog</li>
            <li>Guides</li>
            <li>Články</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
EOF

cat > src/lib/mock/products.ts <<'EOF'
export const products = [
  {
    id: '1',
    name: 'Creatine Monohydrate',
    slug: 'creatine-monohydrate',
    shortDescription: '500g | Čistý mikronizovaný kreatin pro sílu.',
    description: 'Prémiový kreatin pro sílu, výkon a explozivitu.',
    price: 1499,
    compareAtPrice: 1999,
    image: 
'https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&w=1200&q=80',
    stock: 120,
    category: 'supplement',
    featured: true
  },
  {
    id: '2',
    name: 'Whey Protein Isolate',
    slug: 'whey-protein-isolate',
    shortDescription: '2kg | 90% bílkovin pro růst a regeneraci.',
    description: 'Prémiový whey isolate pro podporu regenerace a růstu 
svalové hmoty.',
    price: 1499,
    compareAtPrice: 1999,
    image: 
'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=1200&q=80',
    stock: 85,
    category: 'supplement',
    featured: true
  },
  {
    id: '3',
    name: 'Pre-Workout Fury',
    slug: 'pre-workout-fury',
    shortDescription: '300g | Extrémní energie a focus před tréninkem.',
    description: 'Výbušný pre-workout pro maximální fokus, energii a 
intenzitu.',
    price: 1499,
    compareAtPrice: 1999,
    image: 
'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
    stock: 64,
    category: 'supplement',
    featured: true
  },
  {
    id: '4',
    name: 'BCAA Amino Complex',
    slug: 'bcaa-amino-complex',
    shortDescription: '400g | Regenerace a ochrana svalové hmoty.',
    description: 'BCAA komplex pro regeneraci a ochranu svalů.',
    price: 1499,
    compareAtPrice: 1999,
    image: 
'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
    stock: 93,
    category: 'supplement',
    featured: true
  }
];
EOF

cat > src/components/shop/AddToCartButton.tsx <<'EOF'
'use client';

import { useCartStore } from '@/hooks/useCartStore';

type Props = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() =>
        addItem({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.image,
        })
      }
      className="rounded-md bg-[#E10600] px-6 py-3 font-bold uppercase 
tracking-wide text-white transition hover:brightness-110"
    >
      Do košíku
    </button>
  );
}
EOF

cat > src/components/shop/ProductCard.tsx <<'EOF'
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice: number;
  image: string;
  stock: number;
  category: string;
  featured: boolean;
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const discount = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 
100
  );

  return (
    <article className="group overflow-hidden rounded-xl border 
border-zinc-200 bg-white transition hover:-translate-y-1 
hover:border-[#E10600] hover:shadow-xl dark:border-zinc-800 
dark:bg-zinc-950">
      <Link href={`/supplements/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-zinc-100 
dark:bg-zinc-900">
          <div className="absolute left-4 top-4 z-10 rounded-full 
bg-[#E10600] px-3 py-1 text-xs font-bold text-white">
            -{discount}%
          </div>
          <div
            className="h-full w-full bg-cover bg-center transition 
duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${product.image})` }}
          />
        </div>
      </Link>

      <div className="p-5">
        <h3 className="text-2xl font-bold uppercase">{product.name}</h3>
        <p className="mt-2 min-h-[48px] text-sm text-zinc-600 
dark:text-zinc-400">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex items-end gap-3">
          <span className="text-2xl font-bold text-[#E10600]">
            {product.price.toLocaleString('cs-CZ')} Kč
          </span>
          <span className="text-sm text-zinc-400 line-through">
            {product.compareAtPrice.toLocaleString('cs-CZ')} Kč
          </span>
        </div>

        <div className="mt-5">
          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              image: product.image,
            }}
          />
        </div>
      </div>
    </article>
  );
}
EOF

cat > src/app/layout.tsx <<'EOF'
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'Fitness 77',
  description: 'Fitness 77 web',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className="bg-white text-zinc-900 dark:bg-black 
dark:text-white">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
EOF

cat > src/app/page.tsx <<'EOF'
import Link from 'next/link';

export default function HomePage() {
  const sections = [
    { title: 'Suplementy', href: '/supplements', description: 'Protein, 
kreatin, pre-workout a amino produkty.' },
    { title: 'Vybavení', href: '/equipment', description: 'Silové vybavení 
a profesionální stroje.' },
    { title: 'Bazar strojů', href: '/bazaar', description: 'Použité stroje 
s transparentním stavem a cenou.' },
    { title: 'Gym / Trenéři', href: '/gym', description: 'Osobní vedení, 
rezervace a služby.' },
    { title: 'Blog', href: '/blog', description: 'Obsah, který přivádí 
traffic a buduje důvěru.' },
    { title: 'Košík / Checkout', href: '/cart', description: 'Rychlá 
konverzní cesta bez zbytečných tření.' }
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 
bg-[radial-gradient(circle_at_top_right,rgba(225,6,0,0.25),transparent_25%),radial-gradient(circle_at_left_center,rgba(225,6,0,0.15),transparent_30%)]" 
/>
        <div className="relative mx-auto flex min-h-[78vh] 
w-[min(1200px,calc(100%-32px))] flex-col justify-center py-20">
          <span className="mb-4 text-sm font-bold uppercase 
tracking-[0.25em] text-[#E10600]">
            Praha • Performance • Results
          </span>
          <h1 className="max-w-4xl text-5xl font-bold uppercase 
leading-none md:text-7xl">
            Fitness 77: tvoje cesta k výsledkům
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-300">
            Prémiové suplementy, vybavení, bazar strojů, trenéři a obsah, 
který pomáhá prodávat výkon.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/supplements" className="rounded-md bg-[#E10600] 
px-6 py-3 font-bold uppercase tracking-wide text-white transition 
hover:brightness-110">
              Nakupovat teď
            </Link>
            <Link href="/gym" className="rounded-md border border-zinc-700 
px-6 py-3 font-bold uppercase tracking-wide text-white transition 
hover:border-[#E10600] hover:text-[#E10600]">
              Gym / Trenéři
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 
dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-4 
py-4 md:grid-cols-4">
          <div className="text-center text-xs font-bold uppercase 
tracking-wider text-zinc-700 dark:text-zinc-300">DOPRAVA ZDARMA NAD 2000 
Kč</div>
          <div className="text-center text-xs font-bold uppercase 
tracking-wider text-zinc-700 dark:text-zinc-300">VÝDEJNÍ MÍSTO ATELIER 
PRAHA</div>
          <div className="text-center text-xs font-bold uppercase 
tracking-wider text-zinc-700 dark:text-zinc-300">SKLADEM V PRAZE</div>
          <div className="text-center text-xs font-bold uppercase 
tracking-wider text-zinc-700 dark:text-zinc-300">ŠIFROVANÉ PLATBY</div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
          <span className="text-sm font-bold uppercase tracking-[0.2em] 
text-[#E10600]">
            Fitness 77 ekosystém
          </span>
          <h2 className="mt-3 text-4xl font-bold uppercase">
            Hlavní sekce webu
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sections.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-zinc-200 bg-white p-6 
transition hover:-translate-y-1 hover:border-[#E10600] hover:shadow-xl 
dark:border-zinc-800 dark:bg-zinc-950"
              >
                <h3 className="text-2xl font-bold 
uppercase">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 
dark:text-zinc-400">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
EOF

cat > src/app/globals.css <<'EOF'
@import 
url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #111111;
}

.dark {
  --background: #050505;
  --foreground: #f5f5f5;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: var(--background);
  color: var(--foreground);
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
EOF

cat > src/app/supplements/page.tsx <<'EOF'
import ProductCard from '@/components/shop/ProductCard';
import { products } from '@/lib/mock/products';

export default function SupplementsPage() {
  return (
    <section className="py-16">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-[0.2em] 
text-[#E10600]">
            Suplementy
          </span>
          <h1 className="mt-3 text-5xl font-bold uppercase">
            Prémiové suplementy Fitness 77
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Výkon, regenerace a síla. Bez chaosu. Jen produkty, které mají 
jasnou roli a vysokou konverzi.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

cat > src/app/supplements/\[slug\]/page.tsx <<'EOF'
import { notFound } from 'next/navigation';
import { products } from '@/lib/mock/products';
import AddToCartButton from '@/components/shop/AddToCartButton';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SupplementDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) return notFound();

  return (
    <section className="py-16">
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-10 
lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-zinc-100 
dark:bg-zinc-900">
          <div
            className="aspect-square w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${product.image})` }}
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] 
text-[#E10600]">
            Fitness 77 Supplement
          </span>

          <h1 className="mt-3 text-5xl font-bold 
uppercase">{product.name}</h1>

          <p className="mt-6 text-lg leading-8 text-zinc-600 
dark:text-zinc-400">
            {product.description}
          </p>

          <div className="mt-8 flex items-end gap-4">
            <span className="text-4xl font-bold text-[#E10600]">
              {product.price.toLocaleString('cs-CZ')} Kč
            </span>
            <span className="text-lg text-zinc-400 line-through">
              {product.compareAtPrice.toLocaleString('cs-CZ')} Kč
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.image,
              }}
            />
            <button className="rounded-md border border-zinc-300 px-6 py-3 
font-bold uppercase tracking-wide transition hover:border-[#E10600] 
hover:text-[#E10600] dark:border-zinc-700">
              Zjistit více
            </button>
          </div>

          <div className="mt-8 grid gap-3 text-sm font-semibold uppercase 
tracking-wide text-zinc-500 dark:text-zinc-400">
            <div>✓ Skladem v Praze</div>
            <div>✓ Doprava zdarma nad 2000 Kč</div>
            <div>✓ Rychlé odbavení objednávky</div>
          </div>
        </div>
      </div>
    </section>
  );
}
EOF

cat > src/app/cart/page.tsx <<'EOF'
'use client';

import Link from 'next/link';
import { useCartStore } from '@/hooks/useCartStore';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseItem = useCartStore((state) => state.increaseItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const totalPrice = useCartStore((state) => state.totalPrice());

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
                        className="rounded-md border border-zinc-300 px-3 
py-1 dark:border-zinc-700"
                      >
                        -
                      </button>
                      <span className="min-w-8 text-center 
font-bold">{item.quantity}</span>
                      <button
                        onClick={() => increaseItem(item.id)}
                        className="rounded-md border border-zinc-300 px-3 
py-1 dark:border-zinc-700"
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
                      className="mt-3 text-sm font-semibold text-zinc-500 
hover:text-[#E10600]"
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
                <span>{totalPrice >= 2000 ? 'Zdarma' : 'Vypočte se v 
checkoutu'}</span>
              </div>

              <div className="mt-6 flex items-center justify-between 
border-t border-zinc-200 pt-6 text-xl font-bold dark:border-zinc-800">
                <span>Celkem</span>
                <span 
className="text-[#E10600]">{totalPrice.toLocaleString('cs-CZ')} Kč</span>
              </div>

              <button className="mt-6 w-full rounded-md bg-[#E10600] px-6 
py-3 font-bold uppercase tracking-wide text-white transition 
hover:brightness-110">
                Pokračovat k platbě
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
EOF

cat > src/app/equipment/page.tsx <<'EOF'
export default function EquipmentPage() {
  return <div className="mx-auto w-[min(1200px,calc(100%-32px))] py-16 
text-4xl font-bold uppercase">Vybavení</div>;
}
EOF

cat > src/app/bazaar/page.tsx <<'EOF'
export default function BazaarPage() {
  return <div className="mx-auto w-[min(1200px,calc(100%-32px))] py-16 
text-4xl font-bold uppercase">Bazar strojů</div>;
}
EOF

cat > src/app/gym/page.tsx <<'EOF'
export default function GymPage() {
  return <div className="mx-auto w-[min(1200px,calc(100%-32px))] py-16 
text-4xl font-bold uppercase">Gym / Trenéři</div>;
}
EOF

cat > src/app/blog/page.tsx <<'EOF'
export default function BlogPage() {
  return <div className="mx-auto w-[min(1200px,calc(100%-32px))] py-16 
text-4xl font-bold uppercase">Blog</div>;
}
EOF

echo "✅ Fitness 77 GPT bootstrap complete."
