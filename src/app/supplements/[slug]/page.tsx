import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddToCartButton from '@/components/shop/AddToCartButton';
import StickyMobileBuy from '@/components/shop/StickyMobileBuy';
import { db } from '@/lib/db';
import { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

// Funkce pro generování metadat (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const product = await db.product.findFirst({
    where: { slug, category: 'supplement' },
  });

  if (!product) {
    return {
      title: 'Produkt nenalezen',
    };
  }

  return {
    title: `${product.name} | Fitness 77`,
    description: product.shortDescription,
  };
}

// Funkce pro generování statických stránek (lepší performance)
export async function generateStaticParams() {
  const supplements = await db.product.findMany({
    where: { category: 'supplement' },
  });

  return supplements.map((supplement) => ({
    slug: supplement.slug,
  }));
}

export default async function SupplementDetailPage({ params }: Props) {
  const { slug } = params;
  const product = await db.product.findFirst({
    where: { slug, category: 'supplement' },
  });

  // Fetch related products
  const relatedProducts = await db.product.findMany({
    where: {
      category: 'supplement',
      NOT: {
        slug: slug,
      },
    },
    take: 3,
  });

  if (!product) return notFound();

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="mx-auto w-[min(1280px,calc(100%-40px))]">
        {/* Back Button */}
        <div className="mb-12">
          <Link 
            href="/supplements" 
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-[#E10600] not-italic"
          >
            ← ZPĚT NA SUPLEMENTY
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Produktový obrázek s laser hover efektem (odhalení složení) */}
          <div className="relative aspect-square flex items-center justify-center bg-zinc-50/50 p-12 group overflow-hidden">
            <div className="relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-4 group-hover:opacity-0 transform-gpu">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.25)]"
                priority
              />
            </div>

            {/* ── LASER PROJECTION hover image (Složení) ── */}
            <div className="absolute inset-0 flex items-center justify-center p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
              {/* Scanline laser efekt */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                <div
                  className="absolute left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, #00ffe7 20%, #00ffe7 50%, #7fff00 80%, transparent 100%)',
                    boxShadow: '0 0 15px 3px #00ffe7, 0 0 30px 6px rgba(0,255,231,0.4)',
                    animation: 'laserScan 0.8s ease-out forwards',
                    top: 0,
                  }}
                />
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,231,0.3) 2px, rgba(0,255,231,0.3) 4px)' }} />
              </div>

              {/* Ingredient Image */}
              <div 
                className="relative w-full h-full transform scale-95 group-hover:scale-100 transition-transform duration-500"
                style={{ filter: 'drop-shadow(0 0 20px rgba(0,255,231,0.3))' }}
              >
                <Image
                  src={`/images/products/slozeni${product.slug.split('-')[0]}.webp`}
                  alt={`${product.name} – složení`}
                  fill
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
              
              {/* Info Label */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#00ffe7] border border-[#00ffe7]/30 z-30">
                Nutriční hodnoty / Složení
              </div>
            </div>
          </div>

          {/* Detaily produktu */}
          <div className="flex flex-col justify-center">
            <div className="inline-block border-l-4 border-[#E10600] pl-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#E10600]">
              Performance Supplement
            </div>
            <h1 className="mt-6 text-5xl font-black uppercase leading-[1.1] text-zinc-950 md:text-6xl lg:text-7xl not-italic tracking-tighter">
              {product.name}
            </h1>
            
            {product.price > 0 ? (
              <div className="mt-8 flex items-center gap-6">
                <span className="text-4xl font-black text-zinc-950 not-italic">
                  {product.price.toLocaleString('cs-CZ')} Kč
                </span>
                {product.compareAtPrice && product.compareAtPrice > 0 && (
                  <span className="text-xl text-zinc-400 line-through not-italic">
                    {product.compareAtPrice.toLocaleString('cs-CZ')} Kč
                  </span>
                )}
              </div>
            ) : (
              <div className="mt-8">
                <span className="text-3xl font-black uppercase tracking-wider text-zinc-500 not-italic">
                  Připravujeme
                </span>
              </div>
            )}

            <p className="mt-8 text-lg leading-relaxed text-zinc-600 max-w-xl">
              {product.description}
            </p>

            {product.price > 0 ? (
              <div className="mt-12 max-w-md">
                <AddToCartButton product={{ id: product.id, name: product.name, slug: product.slug, price: product.price, image: product.image }} />
              </div>
            ) : (
              <div className="mt-12 max-w-md">
                <button
                  disabled
                  className="w-full cursor-not-allowed bg-zinc-200 px-6 py-4 font-bold uppercase tracking-wider text-zinc-500"
                >
                  Již brzy v prodeji
                </button>
              </div>
            )}

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-zinc-100 pt-12 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E10600]" />
                Skladem v Mladé Boleslavi
              </div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E10600]" />
                Doprava zdarma nad 2000 Kč
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 border-t border-zinc-100">
          <div className="mx-auto w-[min(1280px,calc(100%-40px))] py-24">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-950">
              Mohlo by se ti líbit
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/supplements/${relatedProduct.slug}`} className="group block">
                  <div className="relative aspect-square flex items-center justify-center overflow-hidden bg-zinc-50 p-8 transition-colors group-hover:bg-zinc-100">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={400}
                      height={400}
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">{relatedProduct.name}</h3>
                    {relatedProduct.price > 0 ? (
                      <p className="mt-2 text-lg font-black text-zinc-900">
                        {relatedProduct.price.toLocaleString('cs-CZ')} Kč
                      </p>
                    ) : (
                      <p className="mt-2 text-base font-bold uppercase tracking-wider text-zinc-500">
                        Připravujeme
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky mobilní tlačítko KOUPIT */}
      {product.price > 0 && (
        <StickyMobileBuy product={{ id: product.id, name: product.name, slug: product.slug, price: product.price, image: product.image }} />
      )}
    </section>
  );
}
