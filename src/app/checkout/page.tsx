'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/hooks/useCartStore';
import { resolveProductImage } from '@/lib/resolve-image';

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

  const onSubmit = async (_data: CheckoutForm) => {
    setLoading(true);

    try {
      // GOLIÁŠ Bridge v10.0: Nativní přesun do Shoptetu skrze /cart bridge
      const { resolveShoptetIds } = await import('@/lib/shoptet-map');
      
      const shoptetItems = items.map(item => {
        const ids = resolveShoptetIds(item.slug, item.variantCode);
        return {
          priceId: ids?.priceId,
          productId: ids?.productId,
          amount: item.quantity,
          name: item.name
        };
      });

      // Kontrola, zda máme všechna ID
      if (shoptetItems.some(i => !i.priceId)) {
        console.error('❌ Chybí Shoptet ID pro některé produkty:', shoptetItems.filter(i => !i.priceId));
        alert('Některé produkty nelze přenést do košíku. Kontaktujte podporu.');
        setLoading(false);
        return;
      }

      // Zakódování do Base64 (UTF-8 Safe pro české znaky)
      const payload = btoa(encodeURIComponent(JSON.stringify(shoptetItems)));
      
      // Přesun na přestupní stanici
      window.location.href = `/cart?payload=${payload}`;

    } catch (error) {
      console.error('[GOLIÁŠ] Checkout Bridge Error:', error);
      alert('Došlo k chybě při přípravě košíku.');
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-black min-h-screen text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto grid w-[min(1280px,calc(100%-40px))] gap-12 lg:grid-cols-[1fr_400px]"
      >
        <div className="space-y-8">
          <div className="rounded-3xl border border-zinc-800 bg-[#0a0a0a] p-10 shadow-2xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#d4ff00] rounded-full flex items-center justify-center text-black font-black text-xl">
                  1
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter">Pokladna</h1>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#d4ff00] rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#d4ff00]">Zabezpečený přenos</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
               <h2 className="md:col-span-2 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Doručovací údaje</h2>
              <div>
                <label htmlFor="firstName" className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-2 block ml-1">Jméno</label>
                <input 
                  id="firstName" 
                  {...register('firstName')} 
                  className={`w-full rounded-xl bg-zinc-900 border px-5 py-4 outline-none focus:ring-2 focus:ring-[#d4ff00]/50 transition-all text-white placeholder:text-zinc-600 ${errors.firstName ? 'border-red-500/50' : 'border-zinc-800'}`} 
                  placeholder="Jan" 
                  aria-label="Křestní jméno"
                  aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName && <span className="text-red-500 text-[10px] mt-2 block font-bold uppercase tracking-wide">{errors.firstName.message}</span>}
              </div>
              <div>
                <label htmlFor="lastName" className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-2 block ml-1">Příjmení</label>
                <input 
                  id="lastName" 
                  {...register('lastName')} 
                  className={`w-full rounded-xl bg-zinc-900 border px-5 py-4 outline-none focus:ring-2 focus:ring-[#d4ff00]/50 transition-all text-white placeholder:text-zinc-600 ${errors.lastName ? 'border-red-500/50' : 'border-zinc-800'}`} 
                  placeholder="Novák" 
                  aria-label="Příjmení"
                  aria-invalid={errors.lastName ? "true" : "false"}
                />
                {errors.lastName && <span className="text-red-500 text-[10px] mt-2 block font-bold uppercase tracking-wide">{errors.lastName.message}</span>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-2 block ml-1">E-mail</label>
                <input 
                  id="email" 
                  {...register('email')} 
                  className={`w-full rounded-xl bg-zinc-900 border px-5 py-4 outline-none focus:ring-2 focus:ring-[#d4ff00]/50 transition-all text-white placeholder:text-zinc-600 ${errors.email ? 'border-red-500/50' : 'border-zinc-800'}`} 
                  placeholder="vas@email.cz" 
                  type="email" 
                  aria-label="Emailová adresa"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <span className="text-red-500 text-[10px] mt-2 block font-bold uppercase tracking-wide">{errors.email.message}</span>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-2 block ml-1">Adresa a č.p.</label>
                <input 
                  id="address" 
                  {...register('address')} 
                  className={`w-full rounded-xl bg-zinc-900 border px-5 py-4 outline-none focus:ring-2 focus:ring-[#d4ff00]/50 transition-all text-white placeholder:text-zinc-600 ${errors.address ? 'border-red-500/50' : 'border-zinc-800'}`} 
                  placeholder="Ulice 123" 
                  aria-label="Ulice a číslo popisné"
                  aria-invalid={errors.address ? "true" : "false"}
                />
                {errors.address && <span className="text-red-500 text-[10px] mt-2 block font-bold uppercase tracking-wide">{errors.address.message}</span>}
              </div>
              <div>
                <label htmlFor="city" className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-2 block ml-1">Město</label>
                <input 
                  id="city" 
                  {...register('city')} 
                  className={`w-full rounded-xl bg-zinc-900 border px-5 py-4 outline-none focus:ring-2 focus:ring-[#d4ff00]/50 transition-all text-white placeholder:text-zinc-600 ${errors.city ? 'border-red-500/50' : 'border-zinc-800'}`} 
                  placeholder="Praha" 
                  aria-label="Město"
                  aria-invalid={errors.city ? "true" : "false"}
                />
                {errors.city && <span className="text-red-500 text-[10px] mt-2 block font-bold uppercase tracking-wide">{errors.city.message}</span>}
              </div>
              <div>
                <label htmlFor="zip" className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-2 block ml-1">PSČ</label>
                <input 
                  id="zip" 
                  {...register('zip')} 
                  className={`w-full rounded-xl bg-zinc-900 border px-5 py-4 outline-none focus:ring-2 focus:ring-[#d4ff00]/50 transition-all text-white placeholder:text-zinc-600 ${errors.zip ? 'border-red-500/50' : 'border-zinc-800'}`} 
                  placeholder="123 45" 
                  aria-label="Poštovní směrovací číslo"
                  aria-invalid={errors.zip ? "true" : "false"}
                />
                {errors.zip && <span className="text-red-500 text-[10px] mt-2 block font-bold uppercase tracking-wide">{errors.zip.message}</span>}
              </div>
            </div>

            <div className="mt-16">
               <h2 className="text-[12px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">Způsob dopravy</h2>
               <div className="grid gap-4" role="radiogroup" aria-label="Výběr dopravy">
                  {[
                    { id: 'zasilkovna', name: 'Zásilkovna (Na pobočku)', price: 89, desc: 'Doručení do 2-3 dnů' },
                    { id: 'ppl', name: 'PPL (Na adresu)', price: 129, desc: 'Doručení do druhého dne' },
                    { id: 'pickup', name: 'Osobní odběr (Mladá Boleslav)', price: 0, desc: 'Vyzvednutí na prodejně' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setShippingMethod(method.id as any)}
                      className={`flex items-center gap-6 p-6 rounded-2xl border-2 transition-all text-left focus:ring-4 focus:ring-[#d4ff00]/20 outline-none ${
                        shippingMethod === method.id 
                          ? 'border-[#d4ff00] bg-[#d4ff00]/5' 
                          : 'border-zinc-900 bg-zinc-900/50 hover:border-zinc-700'
                      }`}
                      aria-checked={shippingMethod === method.id}
                      role="radio"
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${shippingMethod === method.id ? 'border-[#d4ff00]' : 'border-zinc-700'}`}>
                        {shippingMethod === method.id && <div className="w-2.5 h-2.5 bg-[#d4ff00] rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-black uppercase tracking-tight text-white">{method.name}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-1">{method.desc}</div>
                      </div>
                      <div className={`font-black text-lg ${shippingMethod === method.id ? 'text-[#d4ff00]' : 'text-white'}`}>
                        {method.price === 0 ? 'ZDARMA' : `${method.price} Kč`}
                      </div>
                    </button>
                  ))}
               </div>
            </div>

            {/* GOLIÁŠ Bridge v9.3: Removed redundant inline mobile button - now using sticky footer */}
          </div>
        </div>

        <aside className="h-fit space-y-8 lg:sticky lg:top-8 order-last lg:order-none">
          <div className="rounded-3xl border border-zinc-800 bg-[#0a0a0a] p-8 shadow-2xl">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center justify-between">
              Shrnutí
              <span className="text-zinc-600 text-sm font-bold tracking-widest">{items.length} položek</span>
            </h2>

            <div className="space-y-6">
              {items.map((item) => {
                // Robustní resolver obrázků pro boční panel skrze GOLIÁŠ Lib
                const getSafeImage = () => resolveProductImage(item.image, item.name, item.slug);

                return (
                  <div key={`${item.id}-${item.variantCode}`} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 bg-zinc-900 rounded-xl overflow-hidden shrink-0 border border-zinc-800">
                      <img 
                        src={getSafeImage()} 
                        alt={item.name} 
                        className="w-full h-full object-contain p-1"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes('placeholder')) return;
                          target.src = '/images/products/placeholder.webp';
                        }}
                      />
                      <div className="absolute top-0 right-0 bg-[#d4ff00] text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-bl-lg shadow-sm">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[11px] font-black uppercase tracking-tight text-white leading-tight">{item.name}</h3>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mt-1">{item.variantName || 'Základní varianta'}</p>
                    </div>
                    <div className="text-sm font-black text-white shrink-0">
                      {(item.price * item.quantity).toLocaleString('cs-CZ')} Kč
                    </div>
                  </div>
                );
              })}
              
              {/* GOLIÁŠ Bridge v9.0: High-Conversion Order Button */}
              <button
                type="submit"
                disabled={loading}
                aria-label={`Odeslat objednávku za ${finalTotal} korun`}
                className="w-full rounded-2xl bg-[#d4ff00] px-8 py-6 font-black uppercase tracking-[0.15em] text-black transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[0_20px_40px_rgba(212,255,0,0.2)] text-sm mb-4 mt-4 disabled:opacity-50 disabled:grayscale"
              >
                {loading ? 'Zpracovávám...' : 'Dokončit a zaplatit • ' + finalTotal.toLocaleString('cs-CZ') + ' Kč'}
              </button>

              <div className="pt-6 border-t border-zinc-900 space-y-3">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                   <span>Mezisoučet</span>
                   <span className="text-white">{totalPrice.toLocaleString('cs-CZ')} Kč</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                   <span>Doprava</span>
                   <span className="text-white">{shippingPrices[shippingMethod].toLocaleString('cs-CZ')} Kč</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t-2 border-dashed border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Celkem</span>
                <span className="text-3xl font-black text-[#d4ff00]">{finalTotal.toLocaleString('cs-CZ')} Kč</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#d4ff00] p-8 text-black shadow-2xl">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-60">Potřebuješ poradit?</h4>
             <p className="text-lg font-black uppercase leading-none tracking-tighter">Zákaznická linka Fitness 77</p>
             <a href="tel:+420777105548" className="text-3xl font-black block mt-4 hover:opacity-70 transition-opacity tracking-tighter">+420 777 105 548</a>
             <div className="mt-6 pt-6 border-t border-black/10 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest">Po-Pá: 8:00 - 18:00</span>
                <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
             </div>
          </div>
        </aside>
        
        {/* STICKY MOBILE CTA (UX 300%) */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-xl border-t border-zinc-800 z-50 lg:hidden">
          <button
            type="submit"
            disabled={loading}
            aria-label={`Zaplatit ${finalTotal} Kč`}
            className="w-full rounded-2xl bg-[#d4ff00] px-6 py-5 font-black uppercase tracking-widest text-black shadow-[0_0_30px_rgba(212,255,0,0.3)] text-sm flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>ZAPLATIT</span>
                <span className="w-1 h-1 bg-black/20 rounded-full" />
                <span>{finalTotal.toLocaleString('cs-CZ')} Kč</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
// "Zameť stopy" - checkout je přístupný a ergonomický na 300%. smrk
  );
}
