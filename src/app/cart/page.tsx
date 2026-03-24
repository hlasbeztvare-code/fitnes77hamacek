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

  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const missing = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);

  return (
    <section className="py-20">
      <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
        <div className="inline-block border-l-4 border-[#E10600] pl-3 text-sm font-black uppercase tracking-[0.22em] text-[#E10600]">
          Cart system
        </div>
        <h1 className="mt-4 text-5xl font-black uppercase text-zinc-950">Košík</h1>

        {items.length === 0 ? (
          <div className="mt-8 border border-zinc-200 bg-white p-8 shadow-sm [clip-path:polygon(4%_0%,100%_0%,96%_100%,0%_100%)]">
            <p className="text-zinc-600">Košík je zatím prázdný.</p>
            <Link
              href="/supplements"
              className="mt-4 inline-block bg-[#E10600] px-6 py-3 font-black uppercase tracking-[0.14em] text-white [clip-path:polygon(8%_0%,100%_0%,92%_100%,0%_100%)]"
            >
              Jít nakupovat
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 border border-zinc-200 bg-white p-6 shadow-sm [clip-path:polygon(3%_0%,100%_0%,97%_100%,0%_100%)]">
              <div className="flex items-center justify-between text-sm font-black uppercase tracking-[0.14em]">
                <span>Doprava zdarma progress</span>
                <span>{progress >= 100 ? 'Splněno' : `Chybí ${missing.toLocaleString('cs-CZ')} Kč`}</span>
              </div>

              <div className="mt-4 h-3 overflow-hidden bg-zinc-200">
                <div
                  className="h-full bg-[#E10600] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border border-zinc-200 bg-white p-4 shadow-sm [clip-path:polygon(4%_0%,100%_0%,96%_100%,0%_100%)]"
                  >
                    <div
                      className="h-24 w-24 bg-cover bg-center bg-zinc-100"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />

                    <div className="flex-1">
                      <h2 className="text-xl font-black uppercase">{item.name}</h2>
                      <p className="mt-1 text-sm text-zinc-500">
                        {item.price.toLocaleString('cs-CZ')} Kč / ks
                      </p>

                      <div className="mt-4 flex items-center gap-2">
                        <button
                          onClick={() => decreaseItem(item.id)}
                          className="border border-zinc-300 px-3 py-1 font-black"
                        >
                          -
                        </button>
                        <span className="min-w-8 text-center font-black">{item.quantity}</span>
                        <button
                          onClick={() => increaseItem(item.id)}
                          className="border border-zinc-300 px-3 py-1 font-black"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-black text-[#E10600]">
                        {(item.price * item.quantity).toLocaleString('cs-CZ')} Kč
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-3 text-sm font-black uppercase tracking-[0.12em] text-zinc-500 hover:text-[#E10600]"
                      >
                        Odstranit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="h-fit border border-zinc-200 bg-white p-6 shadow-sm [clip-path:polygon(5%_0%,100%_0%,95%_100%,0%_100%)]">
                <h2 className="text-2xl font-black uppercase">Shrnutí</h2>

                <div className="mt-6 flex items-center justify-between text-sm text-zinc-500">
                  <span>Mezisoučet</span>
                  <span>{totalPrice.toLocaleString('cs-CZ')} Kč</span>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm text-zinc-500">
                  <span>Doprava</span>
                  <span>{totalPrice >= FREE_SHIPPING_THRESHOLD ? 'Zdarma' : 'V checkoutu'}</span>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-6 text-xl font-black">
                  <span>Celkem</span>
                  <span className="text-[#E10600]">{totalPrice.toLocaleString('cs-CZ')} Kč</span>
                </div>

                <Link
                  href="/checkout"
                  className="mt-6 block w-full bg-[#E10600] px-6 py-3 text-center font-black uppercase tracking-[0.14em] text-white transition hover:brightness-110 [clip-path:polygon(8%_0%,100%_0%,92%_100%,0%_100%)]"
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
