"use client";

/**
 * L-CODE Dynamics | GOLIÁŠ ProductSelector v1.0
 * Správa variant a nákupní logiky na klientské straně.
 */
import { useState } from 'react';
import { clsx } from 'clsx';
import AddToCartButton from './AddToCartButton';
import { resolveProductImage } from '@/lib/resolve-image';

interface Variant {
  name: string;
  stock: number;
  variantCode?: string;
  price?: number;
  shoptetPriceId?: string;
  image?: string;
}

interface ProductSelectorProps {
  product: {
    id: string;
    shoptetProductId?: string | null;
    shoptetPriceId?: string | null;
    name: string;
    slug: string;
    price: number;
    oldPrice?: number | null;
    image: string | null;
    variants: Variant[];
  };
}

export default function ProductSelector({ product }: ProductSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );

  const currentPrice = selectedVariant?.price || product.price;
  const isOutOfStock = selectedVariant ? selectedVariant.stock <= 0 : false;

  return (
    <div className="mt-8 space-y-8">
      <div className="space-y-1">
        <div className="flex items-baseline gap-4">
          <span className="text-4xl font-black tracking-tighter text-zinc-950 uppercase">
            {currentPrice.toLocaleString('cs-CZ')} Kč
          </span>
          {product.oldPrice && (
            <span className="text-xl font-black text-zinc-400 line-through decoration-red-600 decoration-2 uppercase">
              {product.oldPrice.toLocaleString('cs-CZ')} Kč
            </span>
          )}
        </div>
        <div className="text-[12px] font-black uppercase tracking-widest text-[#E10600]">
          DOPRAVA ZDARMA NAD 2500 KČ
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 opacity-50">
          {['PPL', 'ZÁSILKOVNA', 'OSOBNÍ ODBĚR', 'DPD'].map((d) => (
            <span key={d} className="text-[10px] font-black uppercase tracking-widest text-zinc-950">
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Flavor Selection */}
      {product.variants.length > 0 && (
        <div className="space-y-4">
          <label className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-950">
            Vyber příchuť
          </label>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v, idx) => (
              <button
                key={`${v.variantCode}-${idx}`}
                onClick={() => setSelectedVariant(v)}
                className={clsx(
                  "px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all duration-200 border-2",
                  selectedVariant?.name === v.name
                    ? "border-red-600 bg-red-600 text-white"
                    : "border-zinc-200 text-zinc-500 hover:border-zinc-900",
                  v.stock <= 0 && "opacity-50 grayscale cursor-not-allowed"
                )}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4">
        <AddToCartButton 
          product={{
            ...product,
            shoptetProductId: product.shoptetProductId,
            shoptetPriceId: selectedVariant?.shoptetPriceId || product.shoptetPriceId,
            price: currentPrice,
            variantName: selectedVariant?.name,
            variantCode: selectedVariant?.variantCode,
            image: resolveProductImage(selectedVariant?.image || product.image, product.name, product.slug, { forceStatic: true }),
          }}
          disabled={isOutOfStock}
        />
        {isOutOfStock && (
          <p className="mt-2 text-[10px] font-bold text-red-600 uppercase tracking-widest">
            Tato příchuť je momentálně vyprodaná
          </p>
        )}
      </div>
    </div>
  );
}

// clean code comment: Selektor příchutí je optimalizován pro okamžitou odezvu. Žádné zbytečné rerendery. smrk
