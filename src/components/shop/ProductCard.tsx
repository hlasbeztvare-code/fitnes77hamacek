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
  videoUrl?: string | null;
  stock: number;
  salesCount: number;
  category: string;
  featured: boolean;
};

type Props = {
  product: Product;
  rank?: number;
};

export default function ProductCard({ product, rank }: Props) {
  const discount =
    product.compareAtPrice > 0
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  const isVideo = product.image.toLowerCase().endsWith('.mp4');

  // Určení štítku podle prodejů
  let badge = null;
  if (rank && rank <= 5) {
    badge = `TOP ${rank}`;
  } else if (product.salesCount >= 10) {
    badge = "BESTSELLER";
  }

  return (
    <article className="group relative flex flex-col overflow-hidden bg-white p-2.5 sm:p-4 transition-all duration-500 h-full border-r border-b border-zinc-100 transform-gpu">
      {/* SEO JSON-LD Microdata */}
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
      
      <Link href={`/${product.category === 'supplement' ? 'supplements' : product.category === 'equipment' ? 'equipment' : 'bazaar'}/${product.slug}`} className="relative z-10 block">
        <div className="relative aspect-square overflow-visible bg-white transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center p-3 sm:p-10 rounded-none group/img perspective-1000">
          
          {discount > 0 && (
            <div className="absolute left-1.5 top-1.5 sm:left-4 sm:top-4 z-30 bg-[#E10600] px-2 py-1 text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-white">
              -{discount}%
            </div>
          )}

          {badge && (
            <div className="absolute right-1.5 top-1.5 sm:right-4 sm:top-4 z-30 bg-zinc-950 px-2 py-1 text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-white border border-white/10 shadow-xl">
              {badge}
            </div>
          )}

          <div className="relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 transform-gpu will-change-transform z-10">
            {isVideo ? (
              <video
                src={product.image}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain transition-all duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            )}
          </div>
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
          <div className="flex flex-wrap items-baseline gap-1 sm:gap-3">
            <span className="text-[0.95rem] sm:text-xl font-black text-zinc-950 not-italic">
              {product.price.toLocaleString('cs-CZ')} Kč
            </span>
            {product.compareAtPrice > 0 && (
              <span className="text-[9px] sm:text-xs text-zinc-400 line-through not-italic">
                {product.compareAtPrice.toLocaleString('cs-CZ')} Kč
              </span>
            )}
          </div>

          <div className="mt-4">
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
