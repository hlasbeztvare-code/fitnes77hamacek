'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { SHIPPING_METHODS, ShippingMethodId } from '@/lib/shipping';
import { useCartStore } from '@/hooks/useCartStore';
import ShippingPicker from '@/components/shipping/ShippingPicker';

const formSchema = z.object({
  firstName: z.string().min(1, 'Jméno je povinné'),
  lastName: z.string().min(1, 'Příjmení je povinné'),
  email: z.string().email('Neplatný email'),
  phone: z.string().min(6, 'Telefon je povinný'),
  address: z.string().min(1, 'Adresa je povinná'),
  city: z.string().min(1, 'Město je povinné'),
  zip: z.string().min(1, 'PSČ je povinné'),
  shippingMethod: z.enum(['ZASILKOVNA', 'PPL', 'OSOBNI']),
});

type FormValues = z.infer<typeof formSchema>;

export default function CheckoutForm({ onSubmit, isSubmitting }: { onSubmit: (data: FormValues) => void, isSubmitting: boolean }) {
  const { totalPrice } = useCartStore();
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethodId>('ZASILKOVNA');
  const [shippingPointName, setShippingPointName] = useState<string>('');

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shippingMethod: 'ZASILKOVNA',
    }
  });

  const handleShippingChange = (methodId: ShippingMethodId, shippingId?: string, shippingPointNameStr?: string) => {
    setSelectedShipping(methodId);
    setValue('shippingMethod', methodId);
    setValue('shippingId', shippingId);
    if (shippingPointNameStr !== undefined) {
      setShippingPointName(shippingPointNameStr);
    }
  };

  const cartTotal = totalPrice();
  const shippingPrice = SHIPPING_METHODS[selectedShipping].price;
  const finalTotal = cartTotal + shippingPrice;

  return (
    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8 min-w-0">
      {/* OSOBNÍ ÚDAJE */}
      <div className="bg-zinc-50 border border-zinc-200 p-5 lg:p-6 min-w-0">
        <h3 className="text-base font-black uppercase tracking-[0.2em] text-[#E10600] mb-6 border-b border-zinc-200 pb-4">
          1. Osobní údaje
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Jméno</label>
            <input 
              {...register('firstName')}
              autoComplete="given-name"
              className="w-full bg-white border border-zinc-200 p-4 text-black text-base focus:bg-zinc-50 focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] outline-none transition-all"
              placeholder="Jan"
            />
            {errors.firstName && <p className="text-[#E10600] text-[10px] mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Příjmení</label>
            <input 
              {...register('lastName')}
              autoComplete="family-name"
              className="w-full bg-white border border-zinc-200 p-4 text-black text-base focus:bg-zinc-50 focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] outline-none transition-all"
              placeholder="Novák"
            />
            {errors.lastName && <p className="text-[#E10600] text-[10px] mt-1">{errors.lastName.message}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">E-mail</label>
            <input 
              {...register('email')}
              type="email"
              autoComplete="email"
              className="w-full bg-white border border-zinc-200 p-4 text-black text-base focus:bg-zinc-50 focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] outline-none transition-all"
              placeholder="jan.novak@email.cz"
            />
            {errors.email && <p className="text-[#E10600] text-[10px] mt-1">{errors.email.message}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Telefon</label>
            <input 
              {...register('phone')}
              autoComplete="tel"
              className="w-full bg-white border border-zinc-200 p-4 text-black text-base focus:bg-zinc-50 focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] outline-none transition-all"
              placeholder="+420 777 666 555"
            />
            {errors.phone && <p className="text-[#E10600] text-[10px] mt-1">{errors.phone.message}</p>}
          </div>
        </div>
      </div>

      {/* DORUČOVACÍ ADRESA */}
      <div className="bg-zinc-50 border border-zinc-200 p-5 lg:p-6 min-w-0">
        <h3 className="text-base font-black uppercase tracking-[0.2em] text-[#E10600] mb-6 border-b border-zinc-200 pb-4">
          2. Doručovací adresa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Ulice a číslo popisné</label>
            <input 
              {...register('address')}
              autoComplete="street-address"
              className="w-full bg-white border border-zinc-200 p-4 text-black text-base focus:bg-zinc-50 focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] outline-none transition-all"
              placeholder="Dlouhá 15"
            />
            {errors.address && <p className="text-[#E10600] text-[10px] mt-1">{errors.address.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Město</label>
            <input 
              {...register('city')}
              autoComplete="address-level2"
              className="w-full bg-white border border-zinc-200 p-4 text-black text-base focus:bg-zinc-50 focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] outline-none transition-all"
              placeholder="Praha"
            />
            {errors.city && <p className="text-[#E10600] text-[10px] mt-1">{errors.city.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">PSČ</label>
            <input 
              {...register('zip')}
              autoComplete="postal-code"
              className="w-full bg-white border border-zinc-200 p-4 text-black text-base focus:bg-zinc-50 focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] outline-none transition-all"
              placeholder="110 00"
            />
            {errors.zip && <p className="text-[#E10600] text-[10px] mt-1">{errors.zip.message}</p>}
          </div>
        </div>
      </div>

      <ShippingPicker 
        selectedShipping={selectedShipping}
        shippingPointName={shippingPointName}
        error={errors.shippingMethod?.message}
        onChange={handleShippingChange}
      />

      {/* Sumář a Checkout (Z původního návrhu) */}
      <div className="bg-zinc-50 border border-zinc-200 p-5 pb-10 mt-8 min-w-0">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Shrnutí</h3>
        
        <div className="flex justify-between items-end mb-3 pb-3 border-b border-zinc-200">
          <span className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Mezisoučet</span>
          <span className="text-lg font-black text-black">{cartTotal.toLocaleString('cs-CZ')} Kč</span>
        </div>

        <div className="flex justify-between items-end mb-6 pb-4 border-b border-zinc-200">
          <span className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Doprava</span>
          <span className="text-lg font-black text-[#E10600]">{shippingPrice === 0 ? 'ZDARMA' : `${shippingPrice.toLocaleString('cs-CZ')} Kč`}</span>
        </div>
        
        <div className="flex justify-between items-end mb-6 pb-4 border-b border-zinc-200">
          <span className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Celkem k úhradě</span>
          <span className="text-2xl font-black text-black">{finalTotal.toLocaleString('cs-CZ')} Kč</span>
        </div>
        
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#E10600] text-white font-black py-4 px-6 flex items-center justify-between transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed [clip-path:polygon(6%_0,100%_0,94%_100%,0%_100%)] group"
        >
          <span className="uppercase text-base tracking-[0.2em]">{isSubmitting ? 'ZPRACOVÁNÍ...' : 'OBJEDNAT A ZAPLATIT'}</span>
          {!isSubmitting && <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
        </button>

        <p className="text-[9px] text-zinc-500 uppercase tracking-[0.1em] text-center mt-3 px-2 leading-relaxed opacity-60">
          Kliknutím berete na vědomí <a href="/obchodni-podminky" className="underline hover:text-black transition-colors">VOP</a> a <a href="/privacy" className="underline hover:text-black transition-colors">GDPR</a>.
        </p>
      </div>
    </form>
  );
}
