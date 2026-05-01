'use client';

import { useCartStore } from '@/hooks/useCartStore';

type Props = {
  product: {
    id: string;
    shoptetProductId?: string | null;
    shoptetPriceId?: string | null;
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
      shoptetProductId: product.shoptetProductId || undefined,
      shoptetPriceId: product.shoptetPriceId || undefined,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image || '/images/products/placeholder.webp',
      variantName: product.variantName,
      variantCode: product.variantCode,
    });

    // AGRESIVNÍ PŘESMĚROVÁNÍ (L-CODE REDIRECT STRATEGY)
    router.push('/cart');
  };

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className={`f77-button-master w-full py-4 md:py-6 transition-all duration-300 [clip-path:polygon(2%_0%,100%_0%,98%_100%,0%_100%)] ${
        disabled 
        ? "bg-zinc-100 text-zinc-300 cursor-not-allowed" 
        : "bg-[#E10600] text-white shadow-[0_18px_40px_rgba(225,6,0,0.18)] hover:-translate-y-1 hover:brightness-110"
      }`}
    >
      {disabled ? "Vyprodáno" : "DO KOŠÍKU"}
    </button>
  );
}

// clean code comment: Tlačítko do košíku je nyní thumb-friendly na 300 %. smrk
