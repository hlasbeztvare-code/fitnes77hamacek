import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddToCartButton from '@/components/shop/AddToCartButton';
import StickyMobileBuy from '@/components/shop/StickyMobileBuy';
import { db } from '@/lib/db';
import { Metadata } from 'next';
import ProductDetailImage from '@/components/shop/ProductDetailImage';
import TrustBadges from '@/components/shop/TrustBadges';
import ProductSelector from '@/components/shop/ProductSelector';
import NutritionTable from '@/components/shop/NutritionTable';
import Reveal from '@/components/ui/Reveal';
import ProductCard from '@/components/shop/ProductCard';

type Props = {
  params: { slug: string };
};

// Funkce pro generování metadat (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findFirst({
    where: { slug },
  });

  if (!product) {
    return {
      title: 'Produkt nenalezen',
    };
  }

  return {
    title: `${product.name} | Fitness 77`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Fitness 77`,
      description: product.shortDescription,
      images: [
        {
          url: product.image ?? '/images/brand/og-image.png',
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription,
      images: [product.image ?? '/images/brand/og-image.png'],
    },
  };
}

// Funkce pro generování statických stránek (lepší performance)
export async function generateStaticParams() {
  const supplements = await db.product.findMany({});

  return supplements.map((supplement) => ({
    slug: supplement.slug,
  }));
}

export default async function SupplementDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await db.product.findFirst({
    where: { slug },
  });

  // Fetch related products
  const relatedProducts = await db.product.findMany({
    where: {
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
          <div>
            <ProductDetailImage product={product} />
            <div className="mt-12 hidden lg:block">
              <NutritionTable data={product.nutrition as any} />
            </div>
          </div>

          {/* Detaily produktu */}
          <div className="flex flex-col justify-center">
            <div className="inline-block border-l-4 border-[#E10600] pl-4 text-[12px] font-black uppercase tracking-[0.3em] text-[#E10600]">
              Performance Supplement
            </div>
            <h1 className="mt-6 text-5xl font-black uppercase leading-[1.1] text-zinc-950 md:text-6xl lg:text-7xl tracking-tighter">
              {product.name}
            </h1>
            
            {/* GOLIÁŠ Product Selection Engine */}
            <ProductSelector 
              product={{
                ...product,
                image: product.image,
                variants: (product.variants as any) || []
              }} 
            />

            <p className="mt-8 text-xl leading-relaxed text-zinc-500 max-w-xl">
              {product.description}
            </p>

            {product.ingredients && (
              <div className="mt-12 pt-0">
                <h3 className="text-[12px] font-black uppercase tracking-[0.22em] text-[#E10600] mb-3">Složení</h3>
                <p className="text-[15px] leading-relaxed text-zinc-500 font-bold uppercase tracking-tight">
                  {product.ingredients}
                </p>
              </div>
            )}

            <div className="mt-8 pt-0">
              <TrustBadges />
            </div>

            {/* Mastering Detail: Ingredients & Nutrition - MOBILE ONLY BELOW */}
            <div className="lg:hidden mt-12 pt-8 border-t border-zinc-100">
              <NutritionTable data={product.nutrition as any} />
            </div>

            {/* Lifestyle / Hype Section */}
            {(product as any).lifestyleImage && (
              <Reveal delay={0.3}>
                <div className="mt-24 relative group overflow-hidden [clip-path:polygon(5%_0%,100%_0%,95%_100%,0%_100%)]">
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/40 to-transparent z-10" />
                  <div className="relative aspect-video sm:aspect-[21/9]">
                    <Image 
                      src={(product as any).lifestyleImage} 
                      alt={`${product.name} Lifestyle`}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-10 left-10 z-20">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E10600] mb-2">Sovereign Performance</div>
                    <h3 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter leading-none">
                      Maximum <br /> <span className="text-zinc-400">Impact.</span>
                    </h3>
                  </div>
                </div>
              </Reveal>
            )}
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
                <ProductCard key={relatedProduct.id} product={relatedProduct as any} />
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
        image: product.image ?? '/images/products/placeholder.webp',
        price: 1, // Force it to show even if price is hidden
      }} />
    </section>
  );
}
