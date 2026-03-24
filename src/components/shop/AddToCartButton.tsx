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
      className="w-full bg-[#E10600] px-6 py-3 font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(225,6,0,0.18)] transition duration-300 hover:-translate-y-[1px] hover:brightness-110 [clip-path:polygon(8%_0%,100%_0%,92%_100%,0%_100%)]"
    >
      Do košíku
    </button>
  );
}
