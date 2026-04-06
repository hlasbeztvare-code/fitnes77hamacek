'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/hooks/useCartStore';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'Jméno musí mít alespoň 2 znaky'),
  lastName: z.string().min(2, 'Příjmení musí mít alespoň 2 znaky'),
  email: z.string().email('Zadejte platný e-mail'),
  address: z.string().min(5, 'Zadejte platnou adresu (ulice a č.p.)'),
  city: z.string().min(2, 'Zadejte platné město'),
  zip: z.string().regex(/^\d{3}\s?\d{2}$/, 'Zadejte platné PSČ (např. 293 01)'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

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

  const onSubmit = async (data: CheckoutForm) => {
    setLoading(true);

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      city: data.city,
      zip: data.zip,
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
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl border border-zinc-200 bg-white p-8"
        >
          <h1 className="text-4xl font-bold uppercase">Checkout</h1>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div>
              <input {...register('firstName')} className={`w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-[#E10600]/20 transition-all ${errors.firstName ? 'border-[#E10600] bg-[#E10600]/5' : 'border-zinc-300'}`} placeholder="Jméno" />
              {errors.firstName && <span className="text-[#E10600] text-xs mt-1 block font-semibold">{errors.firstName.message}</span>}
            </div>
            <div>
              <input {...register('lastName')} className={`w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-[#E10600]/20 transition-all ${errors.lastName ? 'border-[#E10600] bg-[#E10600]/5' : 'border-zinc-300'}`} placeholder="Příjmení" />
              {errors.lastName && <span className="text-[#E10600] text-xs mt-1 block font-semibold">{errors.lastName.message}</span>}
            </div>
            <div className="md:col-span-2">
              <input {...register('email')} className={`w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-[#E10600]/20 transition-all ${errors.email ? 'border-[#E10600] bg-[#E10600]/5' : 'border-zinc-300'}`} placeholder="Email" type="email" />
              {errors.email && <span className="text-[#E10600] text-xs mt-1 block font-semibold">{errors.email.message}</span>}
            </div>
            <div className="md:col-span-2">
              <input {...register('address')} className={`w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-[#E10600]/20 transition-all ${errors.address ? 'border-[#E10600] bg-[#E10600]/5' : 'border-zinc-300'}`} placeholder="Adresa" />
              {errors.address && <span className="text-[#E10600] text-xs mt-1 block font-semibold">{errors.address.message}</span>}
            </div>
            <div>
              <input {...register('city')} className={`w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-[#E10600]/20 transition-all ${errors.city ? 'border-[#E10600] bg-[#E10600]/5' : 'border-zinc-300'}`} placeholder="Město" />
              {errors.city && <span className="text-[#E10600] text-xs mt-1 block font-semibold">{errors.city.message}</span>}
            </div>
            <div>
              <input {...register('zip')} className={`w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-[#E10600]/20 transition-all ${errors.zip ? 'border-[#E10600] bg-[#E10600]/5' : 'border-zinc-300'}`} placeholder="PSČ" />
              {errors.zip && <span className="text-[#E10600] text-xs mt-1 block font-semibold">{errors.zip.message}</span>}
            </div>
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
