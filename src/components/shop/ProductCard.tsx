'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/hooks/useCartStore';
import { useRouter } from 'next/navigation';
import AddToCartButton from './AddToCartButton';

type Product = {
  id: string;
  shoptetId?: string | null;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  oldPrice: number | null;
  image: string;
  stock: number;
  category: string;
  featured: boolean;
  variants?: any;
};

type Props = {
  product: Product;
  showFrame?: boolean;
  index?: number;
};

export default function ProductCard({ product, showFrame = false, index }: Props) {
  const cardRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const nameUpper = product.name.toUpperCase();
  const slugLower = product.slug.toLowerCase();
  
  // Robustní Image Path Resolver s prioritou pro Master Assety
  const getProductImage = () => {
    // 0. PRIORITA: VIDEO ZE SHOPTETU
    const isShoptetVideo = product.image.toLowerCase().match(/.(mp4|webm)$/i);
    if (isShoptetVideo) return product.image;

    // 0.5 PRIORITA: MASTER VIDEO (Např. OPASEK)
    if (nameUpper.includes('OPASEK')) return '/videos/pasek.webm';

    // 1. MASTER ASSETS (Vždy přednost před statickým Shoptetem)
    if (nameUpper.includes('BCA') || slugLower.includes('bca')) return '/images/products/bcaa.png';
    if (nameUpper.includes('CREATINE') || slugLower.includes('kreatin')) return '/images/products/creatine-pure.png';
    if (nameUpper.includes('PUMP') || slugLower.includes('deadpump')) return '/images/products/Deadpump.webp';
    if (nameUpper.includes('DEAD') || slugLower.includes('blackdead')) return '/images/products/Blackdead.webp';
    if (nameUpper.includes('KAŠE') || nameUpper.includes('RICE')) return '/images/products/kase1.png';

    // 2. SHOPTET / DB FALLBACK
    const img = product.image;
    if (!img || img === '/images/products/placeholder.webp') return '/images/products/placeholder.webp';
    if (img.startsWith('http') || img.startsWith('/')) return img;
    return `/images/products/${img}`;
  };

  const finalImage = getProductImage();
  const isVideo = typeof finalImage === 'string' && finalImage.toLowerCase().match(/.(mp4|webm)$/i);

  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const detailUrl = nameUpper.includes('OPASEK') || product.category === 'equipment' || (typeof product.category === 'string' && product.category.toLowerCase().includes('vybavení'))
    ? `/equipment/${product.slug}`
    : `/supplements/${product.slug}`;

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const hasVariants = product.variants && (product.variants as any[]).length > 0;

    if (hasVariants) {
      router.push(detailUrl);
    } else {
      addItem({
        id: product.id,
        shoptetId: product.shoptetId || undefined,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: finalImage,
      });
      router.push('/cart');
    }
  };

  return (
    <article 
      ref={cardRef} 
      className="group relative flex flex-col overflow-visible transition-all duration-500 hover:z-10 h-full border-none transform-gpu bg-transparent p-2.5 sm:p-4"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: finalImage,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "CZK",
              availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />
      
      <Link href={detailUrl} className="relative z-10 block">
        <div className="relative h-[150px] sm:h-[220px] lg:h-[260px] w-full overflow-visible transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center p-3">
          {/* Shine effect */}
          <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 translate-x-[-100%] bg-linear-to-r from-transparent via-[#E10600]/5 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" />
          </div>
          
          <div className="absolute left-1 top-1 z-30 flex flex-col gap-1">
            {product.featured && (
              <div className="bg-[#E10600] text-[8px] sm:text-[9px] font-black text-white px-1.5 py-0.5 uppercase tracking-[0.2em] shadow-2xl">
                BESTSELLER
              </div>
            )}
          </div>
          
          <motion.div 
            style={{ y }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-full h-[92%] transform-gpu will-change-transform z-10"
          >
            {isVideo ? (
              <video src={finalImage} autoPlay loop muted playsInline className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]" />
            ) : (
              <Image 
                src={finalImage} 
                alt={product.name} 
                fill 
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" 
                className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
                style={{ objectPosition: 'center center' }}
                priority={product.featured || (typeof index === 'number' && index < 4)}
              />
            )}
          </motion.div>
        </div>
      </Link>

      <div className="relative z-10 mt-2 sm:mt-3 flex flex-1 flex-col px-0.5 sm:px-1">
        <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-[#E10600]">
          {product.category.toUpperCase()} 
        </div>

        <h3 className="mt-1 sm:mt-2 text-[0.85rem] sm:text-lg font-black uppercase leading-tight text-zinc-950 transition-colors duration-300 group-hover:text-[#E10600] line-clamp-2 h-[2.4em]">
          {product.name}
        </h3>

        <p className="mt-2 sm:mt-3 line-clamp-2 min-h-[32px] sm:min-h-[40px] text-[12px] sm:text-[14px] leading-relaxed text-zinc-500">
          {product.shortDescription}
        </p>

        <div className="mt-auto pt-3 sm:pt-4">
          <div className="flex flex-wrap items-center gap-1 sm:gap-3 lg:min-h-[28px]">
            <span className="text-xl font-black tracking-tighter text-zinc-950">
              {product.price.toLocaleString('cs-CZ')} Kč
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-xs font-medium text-zinc-400 line-through decoration-red-600">
                {product.oldPrice.toLocaleString('cs-CZ')} Kč
              </span>
            )}
          </div>
          <div className="mt-1 text-[10px] font-black uppercase tracking-widest text-zinc-400">
            DOPRAVA ZDARMA NAD 2500 KČ
          </div>

          <div className="mt-4">
            <button onClick={handleAction} className="w-full cursor-pointer focus:outline-none focus:ring-0">
              <div className="flex justify-between items-center group/btn pointer-events-auto">
                <div className="w-full bg-zinc-950 text-white py-3 px-4 [clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)] flex items-center justify-between transition-all duration-300 group-hover/btn:bg-[#E10600]">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {product.variants && (product.variants as any[]).length > 0 ? 'Vybrat Příchuť' : 'Do Košíku'}
                  </span>
                  <span className="transform translate-x-0 group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
