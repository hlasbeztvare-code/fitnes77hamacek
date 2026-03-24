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
        <div className="mx-auto w-[min(800px,calc(100%-32px))] rounded-xl border border-zinc-200 bg-white p-8">
          <h1 className="text-4xl font-bold uppercase">Checkout</h1>
          <p className="mt-4 text-zinc-600">
            Nemáš zatím žádné produkty v košíku.
          </p>
        </div>
      </section>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      firstName: String(formData.get('firstName') || ''),
      lastName: String(formData.get('lastName') || ''),
      email: String(formData.get('email') || ''),
      address: String(formData.get('address') || ''),
      city: String(formData.get('city') || ''),
      zip: String(formData.get('zip') || ''),
      total: totalPrice,
      items,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        router.push(`/success?orderId=${data.orderId}`);
        return;
      }

      alert('Objednávku se nepodařilo vytvořit.');
    } catch (error) {
      console.error(error);
      alert('Došlo k chybě při odeslání objednávky.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-8 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-zinc-200 bg-white p-8"
        >
          <h1 className="text-4xl font-bold uppercase">Checkout</h1>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <input name="firstName" className="rounded-md border border-zinc-300 px-4 py-3" placeholder="Jméno" required />
            <input name="lastName" className="rounded-md border border-zinc-300 px-4 py-3" placeholder="Příjmení" required />
            <input name="email" className="rounded-md border border-zinc-300 px-4 py-3 md:col-span-2" placeholder="Email" type="email" required />
            <input name="address" className="rounded-md border border-zinc-300 px-4 py-3 md:col-span-2" placeholder="Adresa" required />
            <input name="city" className="rounded-md border border-zinc-300 px-4 py-3" placeholder="Město" required />
            <input name="zip" className="rounded-md border border-zinc-300 px-4 py-3" placeholder="PSČ" required />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 rounded-md bg-[#E10600] px-6 py-3 font-bold uppercase tracking-wide text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? 'Zpracovávám...' : 'Dokončit objednávku'}
          </button>
        </form>

        <aside className="h-fit rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-2xl font-bold uppercase">Shrnutí objednávky</h2>

          <div className="mt-6 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{(item.price * item.quantity).toLocaleString('cs-CZ')} Kč</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-zinc-200 pt-6">
            <div className="flex items-center justify-between text-xl font-bold">
              <span>Celkem</span>
              <span className="text-[#E10600]">{totalPrice.toLocaleString('cs-CZ')} Kč</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
