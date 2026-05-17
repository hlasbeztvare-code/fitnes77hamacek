'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/hooks/useCartStore';
import { useRouter } from 'next/navigation';
import AddToCartButton from './AddToCartButton';
import { resolveProductImage } from '@/lib/resolve-image';
import LazyVideo from '@/components/utils/LazyVideo';

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
  hoverVideo?: string | null;
  weight?: string;
};

type Props = {
  product: Product;
  showFrame?: boolean;
  index?: number;
  isDark?: boolean;
  isCentered?: boolean;
  isSmall?: boolean;
};

export default function ProductCard({ 
  product, 
  showFrame = false, 
  index, 
  isDark = false, 
  isCentered = false,
  isSmall = false,
  disableScale = false
}: Props) {
  const cardRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  

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

  const isRightAligned = !isCentered && index !== undefined && index % 2 !== 0;
  const alignX = isCentered ? 'items-center text-center' : (isRightAligned ? 'items-end text-right' : 'items-start text-left');
  const justifyX = isCentered ? 'justify-center' : (isRightAligned ? 'justify-end' : 'justify-start');

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
      // AGRESIVNÍ PŘESMĚROVÁNÍ (L-CODE REDIRECT STRATEGY)
      router.push('/cart');
    }
  };

  const accentColor = isDark ? '#d4ff00' : '#E10600';
  const buttonTextColor = 'text-white'; // Vždy bílá v základu, hover řeší neon.

  const isSmallProduct = false; // Všechny produkty mají stejnou váhu v gridu

  // Robustní čištění jména od Fitness 77
  const cleanString = (str: string) => {
    if (!str) return '';
    return str
      .replace(/FITNESS\s*77/gi, '')
      .replace(/FITNESS77/gi, '')
      .replace(/[-–—]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  return (
    <article 
      ref={cardRef} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col overflow-visible transition-all duration-500 hover:z-10 h-full border-none transform-gpu bg-transparent ${isSmall ? 'p-0.5' : 'p-2 sm:p-4'}`}
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
      
      {/* IMAGE FIRST */}
      <Link href={detailUrl} className="relative z-10 block">
        <div className={`relative ${isSmall ? 'h-[120px] sm:h-[200px] lg:h-[240px]' : 'h-[180px] sm:h-[400px] lg:h-[520px]'} w-full overflow-visible transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center p-1 sm:p-2`}>
          {/* Shine effect */}
          <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 translate-x-[-100%] transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" style={{ backgroundImage: `linear-gradient(to right, transparent, ${accentColor}10, transparent)` }} />
          </div>
          
          <div className="absolute left-1 top-1 z-30 flex flex-col gap-1">
            {product.featured && (
              <div className="text-[6px] sm:text-[7px] font-black px-1 py-0.5 uppercase tracking-[0.2em] shadow-2xl" style={{ backgroundColor: accentColor, color: isDark ? '#000' : '#fff' }}>
                BESTSELLER
              </div>
            )}
          </div>

          {/* BACKGROUND GLOW */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className={`w-1/2 h-1/2 rounded-full blur-[80px] ${isDark ? 'bg-[#d4ff00]/15' : 'bg-[#E10600]/10'}`} />
          </div>
          
          <motion.div 
            initial={{ 
              rotate: 0, 
              scale: isSmallProduct ? 0.9 : 1 
            }}
            whileHover={{ 
              scale: isSmallProduct ? 1.05 : 1.15, 
              y: -10, 
              rotate: 0 
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative w-full h-full transform-gpu will-change-transform z-10 flex items-center justify-center"
          >
            {/* DYNAMIC FLOOR SHADOW */}
            <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[60%] h-[8px] bg-black/40 blur-[10px] rounded-full scale-x-150 opacity-40 group-hover:opacity-80 transition-all duration-500 pointer-events-none" />
            
            {(() => {
              const filterClass = "brightness-[1.0] contrast-[1.0] drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]";
              const hoverFilterClass = "group-hover:brightness-[1.05]";
              const hoverVideoSrc = product.hoverVideo;

              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  {hoverVideoSrc && (
                    <video 
                      ref={videoRef}
                      src={hoverVideoSrc} 
                      loop 
                      muted 
                      playsInline 
                      preload="auto"
                      className={`absolute inset-0 w-full h-full object-contain object-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none ${filterClass}`}
                    />
                  )}
                  
                  <div className={`relative w-full h-full transition-all duration-500 z-10 ${hoverVideoSrc ? 'group-hover:opacity-0' : ''}`}>
                    {isVideo && (index === undefined || index < 1) ? (
                      <LazyVideo 
                        src={finalImage as string} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className={`w-full h-full object-contain object-center transition-all duration-500 ${filterClass} ${hoverFilterClass}`}
                      />
                    ) : (
                      <Image 
                        src={isVideo ? finalImageStatic : finalImage} 
                        alt={product.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw" 
                        className={`object-contain transition-all duration-500 ${filterClass} ${hoverFilterClass}`}
                        style={{ objectPosition: 'center center' }}
                        priority={product.featured || (typeof index === 'number' && index < 4)}
                      />
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </div>
      </Link>

      <div className={`relative z-10 mt-4 sm:mt-6 flex flex-col px-0.5 sm:px-1 ${alignX}`}>
        {/* Product name */}
        <h3 className={`${isSmall ? 'text-[0.75rem] sm:text-sm lg:text-base' : 'text-[1.2rem] sm:text-2xl lg:text-3xl'} font-black uppercase leading-[1.15] tracking-tight`} style={{ color: accentColor }}>
          {cleanString(product.name).split('/')[0].trim() || 'Produkt'}
        </h3>

        {/* Subtitle: flavor / weight — unified grey line */}
        {(() => {
          const parts: string[] = [];
          if (slugLower.includes('ryzova-kase') && product.shortDescription && !product.name.includes('/')) {
            parts.push(product.shortDescription.split('-')[0].trim());
          } else if (cleanString(product.name).includes('/')) {
            parts.push(...cleanString(product.name).split('/').slice(1).map(s => s.trim()));
          }
          if (product.weight) parts.push(product.weight);
          return parts.length > 0 ? (
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mt-1 not-italic">
              {parts.join(' · ')}
            </div>
          ) : null;
        })()}

        {/* Price */}
        <div className={`mt-3 w-full flex flex-col ${isCentered ? 'items-center' : (isRightAligned ? 'items-end' : 'items-start')}`}>
          <span className={`text-[14px] ${isSmall ? 'sm:text-base lg:text-lg' : 'sm:text-2xl lg:text-4xl'} font-black tracking-tight whitespace-nowrap ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            {(product.price || 0).toLocaleString('cs-CZ')} Kč
          </span>
        </div>
      </div>

      <div className={`relative z-10 mt-auto w-full`}>
        <div className="mt-4 sm:mt-6 w-full">
          <button onClick={handleAction} className="w-full cursor-pointer focus:outline-none focus:ring-0 group/btn-wrap">
            <div className={`flex items-center group/btn pointer-events-auto transition-transform duration-300 group-hover/btn-wrap:-translate-y-1 ${justifyX}`}>
              <div className={`f77-button-master bg-zinc-950 ${buttonTextColor} py-3 px-6 sm:py-5 sm:px-14 transition-all duration-500 shadow-2xl ${isDark ? 'group-hover/btn:bg-[#d4ff00] group-hover/btn:text-black group-hover/btn:shadow-[0_0_40px_rgba(212,255,0,0.4)]' : 'group-hover/btn:bg-[#E10600] group-hover/btn:text-white group-hover/btn:shadow-[0_0_40px_rgba(225,6,0,0.4)]'} ${index !== undefined && index % 2 !== 0 ? '[clip-path:polygon(8%_0%,100%_0%,100%_100%,0%_100%)] flex-row-reverse' : '[clip-path:polygon(0%_0%,100%_0%,92%_100%,0%_100%)]'}`}>
                <span className="text-[11px] sm:text-[14px] lg:text-[18px] font-black uppercase tracking-tighter">KOUPIT</span>
                <span className={`transition-transform duration-500 ${index !== undefined && index % 2 !== 0 ? 'mr-3 transform group-hover/btn:-translate-x-2 rotate-180 text-[12px] sm:text-[18px]' : 'ml-3 transform group-hover/btn:translate-x-2 text-[12px] sm:text-[18px]'}`}>→</span>
              </div>
            </div>
          </button>
        </div>
      </div>

    </article>
  );
}

// clean code comment: UX optimalizace tlačítek pro grid a detail. Žádné kompromisy. smrk
