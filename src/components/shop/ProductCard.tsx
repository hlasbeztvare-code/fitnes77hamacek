'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/hooks/useCartStore';
import { useRouter } from 'next/navigation';
import AddToCartButton from './AddToCartButton';
import { resolveProductImage } from '@/lib/resolve-image';

type Product = {
  id: string;
  shoptetProductId?: string | null;
  shoptetPriceId?: string | null;
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
  isDark?: boolean;
};

export default function ProductCard({ product, showFrame = false, index, isDark = false }: Props) {
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

  const nameUpper = product.name?.toUpperCase() || '';
  const slugLower = product.slug?.toLowerCase() || '';
  
  const finalImage = resolveProductImage(product.image, product.name, product.slug);
  const finalImageStatic = resolveProductImage(product.image, product.name, product.slug, { forceStatic: true });
  const isVideo = typeof finalImage === 'string' && finalImage.toLowerCase().match(/.(mp4|webm)$/i);

  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const isEquipment = nameUpper?.includes('OPASEK') || 
                     product.category === 'equipment' || 
                     (typeof product.category === 'string' && product.category?.toLowerCase()?.includes('vybavení'));

  const detailUrl = isEquipment
    ? `/equipment/${product.slug}`
    : `/supplements/${product.slug}`;

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const hasVariants = product.variants && Array.isArray(product.variants) && product.variants.length > 0;

    if (hasVariants) {
      router.push(detailUrl);
    } else {
      addItem({
        id: product.id,
        shoptetProductId: product.shoptetProductId || undefined,
        shoptetPriceId: product.shoptetPriceId || undefined,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: finalImageStatic,
      });
      useCartStore.getState().openCart();
    }
  };

  const accentColor = isDark ? '#d4ff00' : '#E10600';
  const buttonTextColor = isDark ? 'text-black' : 'text-white';

  return (
    <article 
      ref={cardRef} 
      className="group relative flex flex-col overflow-visible transition-all duration-500 hover:z-10 h-full border-none transform-gpu bg-transparent p-1 sm:p-4"
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
        <div className="relative h-[120px] sm:h-[220px] lg:h-[260px] w-full overflow-visible transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center p-2">
          {/* Shine effect */}
          <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 translate-x-[-100%] transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" style={{ backgroundImage: `linear-gradient(to right, transparent, ${accentColor}10, transparent)` }} />
          </div>
          
          <div className="absolute left-1 top-1 z-30 flex flex-col gap-1">
            {product.featured && (
              <div className="text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 uppercase tracking-[0.2em] shadow-2xl" style={{ backgroundColor: accentColor, color: isDark ? '#000' : '#fff' }}>
                BESTSELLER
              </div>
            )}
          </div>
          
          <motion.div 
            style={{ y }}
            whileHover={{ scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-full h-[110%] transform-gpu will-change-transform z-10"
          >
            {isVideo ? (
              <video src={finalImage} autoPlay loop muted playsInline className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]" />
            ) : (
              <Image 
                src={finalImage} 
                alt={product.name} 
                fill 
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" 
                className="object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.4)]"
                style={{ objectPosition: 'center center' }}
                priority={product.featured || (typeof index === 'number' && index < 4)}
              />
            )}
          </motion.div>
        </div>
      </Link>

      <div className="relative z-10 mt-2 sm:mt-3 flex flex-1 flex-col px-0.5 sm:px-1">
        <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: accentColor }}>
          {product.category?.toUpperCase() || 'SUPLEMENT'} 
        </div>

        <h3 className="mt-1 text-[0.7rem] sm:text-lg font-black uppercase leading-tight transition-colors duration-300 line-clamp-2 h-[2.5em] tracking-tight" style={{ color: accentColor }}>
          {product.name || 'Produkt'}
        </h3>

        <div className="mt-auto pt-2">
          <div className="flex flex-wrap items-center gap-1 sm:gap-3">
            <span className={`text-sm sm:text-xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              {(product.price || 0).toLocaleString('cs-CZ')} Kč
            </span>
          </div>
          <div className="mt-1 text-[8px] font-black uppercase tracking-widest opacity-80" style={{ color: accentColor }}>
            DOPRAVA ZDARMA
          </div>

          <div className="mt-3">
            <button onClick={handleAction} className="w-full cursor-pointer focus:outline-none focus:ring-0">
              <div className="flex justify-between items-center group/btn pointer-events-auto">
                <div className={`f77-button-master bg-zinc-950 ${buttonTextColor} py-3 [clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)] transition-all duration-300 ${isDark ? 'group-hover/btn:bg-[#d4ff00] group-hover/btn:text-black' : 'group-hover/btn:bg-[#E10600] group-hover/btn:text-white'}`}>
                  <span>DO KOŠÍKU</span>
                  <span className="ml-2 transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
