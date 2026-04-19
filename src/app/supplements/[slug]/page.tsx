import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddToCartButton from '@/components/shop/AddToCartButton';
import StickyMobileBuy from '@/components/shop/StickyMobileBuy';
import { db } from '@/lib/db';
import { Metadata } from 'next';
import ProductDetailImage from '@/components/shop/ProductDetailImage';
import TrustBadges from '@/components/shop/TrustBadges';

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
    <section className="py-24 bg-white min-h-screen text-zinc-950">
      <div className="mx-auto w-[min(1280px,calc(100%-40px))]">
        {/* Back Button */}
        <div className="mb-12">
          <Link 
            href="/supplements" 
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-[#E10600] not-italic"
          >
            ← ZPĚT NA SUPLEMENTY
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <ProductDetailImage product={product} />

          {/* Detaily produktu */}
          <div className="flex flex-col justify-center">
            <div className="inline-block border-l-4 border-[#E10600] pl-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#E10600]">
              Performance Supplement
            </div>
            <h1 className="mt-6 text-5xl font-black uppercase leading-[1.1] text-zinc-950 md:text-6xl lg:text-7xl not-italic tracking-tighter">
              {product.name}
            </h1>
            
            <div className="mt-8">
              <span className="text-3xl font-black uppercase tracking-wider text-zinc-300 not-italic">
                Připravujeme
              </span>
            </div>

            <p className="mt-8 text-lg leading-relaxed text-zinc-500 max-w-xl">
              {product.description}
            </p>

            <div className="mt-12 max-w-md">
              <button
                disabled
                className="w-full cursor-not-allowed bg-zinc-100 border border-zinc-200 px-6 py-4 font-black uppercase tracking-widest text-zinc-300"
              >
                Připravujeme
              </button>
            </div>

            <TrustBadges />

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 opacity-40">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 mb-3">Dopravci</div>
                  <div className="flex flex-wrap gap-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                     <span className="text-[11px] font-black border border-zinc-200 px-2 py-1">ZÁSILKOVNA</span>
                     <span className="text-[11px] font-black border border-zinc-200 px-2 py-1">PPL</span>
                     <span className="text-[11px] font-black border border-zinc-200 px-2 py-1">GLS</span>
                  </div>
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
                  <div className="relative h-[300px] flex items-center justify-center overflow-visible p-6 transition-colors">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={400}
                      height={400}
                      className="w-auto h-[85%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_40px_70px_rgba(0,0,0,0.1)]"
                    />
                  </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 group-hover:text-[#E10600] transition-colors">{relatedProduct.name}</h3>
                      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#E10600] animate-pulse">
                        BRZY V PRODEJI
                      </p>
                    </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky mobile button for HYPE */}
      <StickyMobileBuy product={{
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.image,
        price: 1, // Force it to show even if price is hidden
      }} />
    </section>
  );
}
