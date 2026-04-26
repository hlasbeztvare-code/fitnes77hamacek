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

  const [shippingMethod, setShippingMethod] = useState<'zasilkovna' | 'ppl' | 'pickup'>('zasilkovna');
  const [loading, setLoading] = useState(false);
  const shippingPrices = {
    zasilkovna: 89,
    ppl: 129,
    pickup: 0,
  };

  const finalTotal = totalPrice + shippingPrices[shippingMethod];

  const onSubmit = async (data: CheckoutForm) => {
    setLoading(true);

    const payload = {
      ...data,
      total: finalTotal,
      shippingMethod,
      shippingPrice: shippingPrices[shippingMethod],
      items,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      if (resData.success) {
        clearCart();
        router.push(`/success?orderId=${resData.orderId}`);
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
    <section className="py-16 bg-zinc-50 min-h-screen">
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm"
          >
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-8">Pokladna</h1>

            <div className="grid gap-4 md:grid-cols-2">
               <h2 className="md:col-span-2 text-lg font-bold uppercase tracking-widest text-zinc-400 mb-2">Kontaktní údaje</h2>
              <div>
                <input {...register('firstName')} className={`w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-black/5 transition-all ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`} placeholder="Jméno" />
                {errors.firstName && <span className="text-red-500 text-xs mt-1 block font-semibold">{errors.firstName.message}</span>}
              </div>
              <div>
                <input {...register('lastName')} className={`w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-black/5 transition-all ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`} placeholder="Příjmení" />
                {errors.lastName && <span className="text-red-500 text-xs mt-1 block font-semibold">{errors.lastName.message}</span>}
              </div>
              <div className="md:col-span-2">
                <input {...register('email')} className={`w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-black/5 transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`} placeholder="Email" type="email" />
                {errors.email && <span className="text-red-500 text-xs mt-1 block font-semibold">{errors.email.message}</span>}
              </div>
              <div className="md:col-span-2">
                <input {...register('address')} className={`w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-black/5 transition-all ${errors.address ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`} placeholder="Adresa" />
                {errors.address && <span className="text-red-500 text-xs mt-1 block font-semibold">{errors.address.message}</span>}
              </div>
              <div>
                <input {...register('city')} className={`w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-black/5 transition-all ${errors.city ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`} placeholder="Město" />
                {errors.city && <span className="text-red-500 text-xs mt-1 block font-semibold">{errors.city.message}</span>}
              </div>
              <div>
                <input {...register('zip')} className={`w-full rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-black/5 transition-all ${errors.zip ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`} placeholder="PSČ" />
                {errors.zip && <span className="text-red-500 text-xs mt-1 block font-semibold">{errors.zip.message}</span>}
              </div>
            </div>

            <div className="mt-12">
               <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-400 mb-6">Způsob dopravy</h2>
               <div className="grid gap-3">
                  {[
                    { id: 'zasilkovna', name: 'Zásilkovna (Na pobočku)', price: 89 },
                    { id: 'ppl', name: 'PPL (Doručení na adresu)', price: 129 },
                    { id: 'pickup', name: 'Osobní odběr (Fitness 77)', price: 0 },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setShippingMethod(method.id as any)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        shippingMethod === method.id 
                          ? 'border-black bg-black text-white' 
                          : 'border-zinc-100 bg-zinc-50 hover:border-zinc-300'
                      }`}
                    >
                      <div className="font-bold uppercase tracking-tight">{method.name}</div>
                      <div className="font-black">{method.price === 0 ? 'ZDARMA' : `${method.price} Kč`}</div>
                    </button>
                  ))}
               </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-12 w-full rounded-xl bg-black px-6 py-5 font-black uppercase tracking-widest text-white transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? 'Pracujeme na tom...' : `Objednat s povinností platby – ${finalTotal.toLocaleString('cs-CZ')} Kč`}
            </button>
          </form>
        </div>

        <aside className="h-fit rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black uppercase tracking-tighter border-bottom pb-4 border-zinc-100">Shrnutí</h2>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.variantCode}`} className="flex items-start justify-between text-sm">
                <span className="text-zinc-500 font-medium">
                  {item.name} <span className="text-zinc-300">× {item.quantity}</span>
                </span>
                <span className="font-bold">{(item.price * item.quantity).toLocaleString('cs-CZ')} Kč</span>
              </div>
            ))}
            
            <div className="pt-4 border-t border-zinc-50 flex justify-between text-sm italic text-zinc-400">
               <span>Doprava ({shippingMethod})</span>
               <span>{shippingPrices[shippingMethod].toLocaleString('cs-CZ')} Kč</span>
            </div>
          </div>

          <div className="mt-8 border-t border-zinc-100 pt-6">
            <div className="flex items-center justify-between text-2xl font-black">
              <span className="uppercase tracking-tighter">Celkem</span>
              <span>{finalTotal.toLocaleString('cs-CZ')} Kč</span>
            </div>
          </div>

          <div className="mt-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
             <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">Potřebuješ poradit?</h4>
             <p className="text-sm font-bold uppercase leading-tight">Zákaznická linka Fitness 77</p>
             <a href="tel:+420777105548" className="text-lg font-black block mt-2 hover:text-zinc-600 transition-colors">+420 777 105 548</a>
             <p className="text-[10px] text-zinc-400 mt-2 uppercase">Po-Pá: 8:00 - 18:00</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
