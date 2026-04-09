import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

type Product = {
  id: string;
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
  const discount =
    product.compareAtPrice > 0
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  const isVideo = product.image.toLowerCase().endsWith('.mp4');

  return (
    <article className="group relative flex flex-col overflow-hidden bg-white p-2.5 sm:p-4 transition-all duration-500 hover:z-10 h-full border-none transform-gpu">
      {/* SEO JSON-LD Microdata (Neviditelné pro uživatele, klíčové pro Google Nákupy) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.image,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "CZK",
              availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />
      {/* Luxusní hloubka a stín při hoveru */}
      <div className="absolute inset-0 z-0 bg-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] group-hover:ring-1 group-hover:ring-zinc-100" />
      
      <Link href={`/${product.category === 'supplement' ? 'supplements' : product.category === 'equipment' ? 'equipment' : 'bazaar'}/${product.slug}`} className="relative z-10 block">
        <div className="relative aspect-square overflow-hidden bg-zinc-50/50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-lg flex items-center justify-center p-3 sm:p-8">
          {/* Odlesk (Shine effect) */}
          <div className="absolute inset-0 z-20 translate-x-[-100%] bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" />
          
          {discount > 0 && (
            <div className="absolute left-1.5 top-1.5 sm:left-3 sm:top-3 z-30 bg-[#E10600] px-1.5 py-0.5 sm:px-2 sm:py-1 text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-white shadow-md">
              -{discount}%
            </div>
          )}

          {/* Hlavní obrázek / video */}
          <div className="relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-2 group-hover:opacity-0 transform-gpu will-change-transform">
            {isVideo ? (
              <video
                src={product.image}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
              />
            ) : (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
              />
            )}
          </div>

          {/* ── LASER PROJECTION hover image ── */}
          {!isVideo && (
            <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
              {/* Scanline laser efekt */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                {/* Hlavní laser scanner linka */}
                <div
                  className="absolute left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, #00ffe7 20%, #00ffe7 50%, #7fff00 80%, transparent 100%)',
                    boxShadow: '0 0 8px 2px #00ffe7, 0 0 20px 4px rgba(0,255,231,0.4)',
                    animation: 'laserScan 0.6s ease-out forwards',
                    top: 0,
                  }}
                />
                {/* Subtilní scanlines overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,231,0.5) 2px, rgba(0,255,231,0.5) 4px)',
                  }}
                />
                {/* Cyan glow rám */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: 'inset 0 0 20px rgba(0,255,231,0.15)',
                  }}
                />
              </div>

              {/* Druhý obrázek – složení produktu */}
              <div
                className="relative w-full h-full transform scale-95 group-hover:scale-100 transition-transform duration-500"
                style={{ filter: 'drop-shadow(0 0 12px rgba(0,255,231,0.4)) drop-shadow(0 0 4px rgba(127,255,0,0.3))' }}
              >
                {/* Zkoušíme různé varianty názvů pro složení */}
                <Image
                  src={`/images/products/slozeni${product.slug.split('-')[0]}.webp`}
                  alt={`${product.name} – složení`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    // Try next: slozeni[slug_without_dashes]
                    if (!img.src.includes('1.webp') && !img.src.includes('slozeni' + product.slug.replace(/-/g, ''))) {
                      img.src = `/images/products/slozeni${product.slug.replace(/-/g, '')}.webp`;
                    } 
                    // Try next: [slug]1.webp
                    else if (!img.src.includes('1.webp')) {
                      img.src = product.image.replace(/(\.\w+)$/, '1$1');
                    }
                    else {
                      img.style.display = 'none';
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className="relative z-10 mt-3 sm:mt-5 flex flex-1 flex-col px-0.5 sm:px-1">
        <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-[#E10600]">
          {product.category === 'supplement' ? 'Performance Supplement' : product.category === 'equipment' ? 'Performance Gear' : 'Bazar / Second Hand'}
        </div>

        <h3 className="mt-1 sm:mt-2 text-[0.85rem] sm:text-lg font-black uppercase leading-tight text-zinc-950 transition-colors duration-300 group-hover:text-[#E10600] not-italic line-clamp-2 h-[2.4em] overflow-hidden">
          {product.name}
        </h3>

        <p className="mt-2 sm:mt-3 line-clamp-2 min-h-[32px] sm:min-h-[40px] text-[11px] sm:text-[13px] leading-relaxed text-zinc-500 not-italic hidden sm:block">
          {product.shortDescription}
        </p>

        <div className="mt-auto pt-3 sm:pt-4">
          <div className="flex flex-wrap items-baseline gap-1 sm:gap-3 lg:min-h-[28px]">
            {product.category === 'supplement' ? (
              <span className="text-[0.95rem] sm:text-xl font-black text-zinc-400 uppercase tracking-widest not-italic">
                Připravujeme
              </span>
            ) : (
              <>
                <span className="text-[0.95rem] sm:text-xl font-black text-zinc-950 not-italic">
                  {product.price.toLocaleString('cs-CZ')} Kč
                </span>
                {product.compareAtPrice > 0 && (
                  <span className="text-[9px] sm:text-xs text-zinc-400 line-through not-italic">
                    {product.compareAtPrice.toLocaleString('cs-CZ')} Kč
                  </span>
                )}
              </>
            )}
          </div>

          <div className="mt-4 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.image,
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
