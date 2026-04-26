'use client';

import { useCartStore } from '@/hooks/useCartStore';

type Props = {
  product: {
    id: string;
    shoptetId?: string | null;
    name: string;
    slug: string;
    price: number;
    image: string | null;
    variantName?: string;
    variantCode?: string;
  };
  disabled?: boolean;
};

import { useRouter } from 'next/navigation';

export default function AddToCartButton({ product, disabled }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handleAdd = () => {
    if (disabled) return;
    
    addItem({
      id: product.id,
      shoptetId: product.shoptetId || undefined,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image || '/images/products/placeholder.webp',
      variantName: product.variantName,
      variantCode: product.variantCode,
    });

    // OTEVŘENÍ SIDEBARU PRO KONTROLU (GOLIÁŠ UX FIX)
    useCartStore.getState().openCart();
  };

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className={`w-full px-6 py-5 text-lg md:text-xl font-black uppercase tracking-[0.2em] transition-all duration-300 [clip-path:polygon(3%_0%,100%_0%,97%_100%,0%_100%)] ${
        disabled 
        ? "bg-zinc-100 text-zinc-300 cursor-not-allowed" 
        : "bg-[#E10600] text-white shadow-[0_18px_40px_rgba(225,6,0,0.18)] hover:-translate-y-1 hover:brightness-110"
      }`}
    >
      {disabled ? "Vyprodáno" : "DO KOŠÍKU"}
    </button>
  );
}
