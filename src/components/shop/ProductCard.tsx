'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

type Product = {
  id: string;
  shoptetId?: string | null;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice: number;
  image: string;
  stock: number;
  category: string;
  featured: boolean;
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
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

  const discount =
    product.compareAtPrice > 0
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  const isVideo = product.image.toLowerCase().match(/.(mp4|webm)$/i);
  
  // Hardcoded override to ensure BCAA photo is ALWAYS there 
  // More aggressive match for "BCA" in Name OR Slug
  const isBcaa = product.name.toUpperCase().includes('BCA') || product.slug.toLowerCase().includes('bca');
  const finalImage = isBcaa ? '/images/products/bcaa411.webp' : product.image;

  return (
    <article ref={cardRef} className="group relative flex flex-col overflow-visible p-2.5 sm:p-4 transition-all duration-500 hover:z-10 h-full border-none transform-gpu bg-transparent">
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
      
      <Link href={`/supplements/${product.slug}`} className="relative z-10 block">
        <div className="relative h-[250px] sm:h-[350px] lg:h-[420px] w-full overflow-visible transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center p-6">
          {/* Shine effect */}
          <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 translate-x-[-100%] bg-linear-to-r from-transparent via-[#E10600]/5 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" />
          </div>
          
          <div className="absolute left-2 top-2 z-30 flex flex-col gap-1">
            {product.featured && (
              <div className="bg-[#E10600] text-[9px] sm:text-[10px] font-black text-white px-2 py-1 uppercase tracking-[0.2em] shadow-2xl">
                BESTSELLER
              </div>
            )}
          </div>
          
          <motion.div 
            style={{ y }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-full h-[85%] transform-gpu will-change-transform z-10"
          >
            {isVideo ? (
              <video src={finalImage} autoPlay loop muted playsInline className="w-full h-full object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.15)]" />
            ) : (
              <Image 
                src={finalImage} 
                alt={product.name} 
                fill 
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" 
                className="object-contain drop-shadow-[0_45px_100px_rgba(0,0,0,0.18)]"
                style={{ objectPosition: 'center center' }}
                priority={product.featured}
              />
            )}
          </motion.div>
        </div>
      </Link>

      <div className="relative z-10 mt-3 sm:mt-5 flex flex-1 flex-col px-0.5 sm:px-1">
        <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-[#E10600]">
          {product.category.toUpperCase()} 
        </div>

        <h3 className="mt-1 sm:mt-2 text-[0.85rem] sm:text-lg font-black uppercase leading-tight text-zinc-950 transition-colors duration-300 group-hover:text-[#E10600] line-clamp-2 h-[2.4em]">
          {product.name}
        </h3>

        <p className="mt-2 sm:mt-3 line-clamp-2 min-h-[32px] sm:min-h-[40px] text-[11px] sm:text-[13px] leading-relaxed text-zinc-500 hidden sm:block">
          {product.shortDescription}
        </p>

        <div className="mt-auto pt-3 sm:pt-4">
          <div className="flex flex-wrap items-baseline gap-1 sm:gap-3 lg:min-h-[28px]">
            <span className="text-[10px] font-bold text-[#E10600] uppercase tracking-widest animate-pulse">
              Brzy v prodeji
            </span>
          </div>

          <div className="mt-4">
            <div className="w-full bg-zinc-100 border border-zinc-200 px-6 py-3 font-black uppercase tracking-[0.14em] text-zinc-300 text-center text-[10px] sm:text-xs [clip-path:polygon(8%_0%,100%_0%,92%_100%,0%_100%)]">
              Připravujeme
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
