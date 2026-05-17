import Link from 'next/link';
export const dynamic = 'force-dynamic';
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
import { getProductBySlug, getRelatedProducts } from '@/lib/queries/products';
import LazyVideo from '@/components/utils/LazyVideo';
import FlavorImageSwitcher, { FlavorOption } from '@/components/shop/FlavorImageSwitcher';

type Props = {
  params: Promise<{ slug: string }>;
};

// Funkce pro generování metadat (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Produkt nenalezen',
    };
  }

  return {
    title: `${product.name} | Fitness 77`,
    description: product.shortDescription ?? undefined,
    openGraph: {
      title: `${product.name} | Fitness 77`,
      description: product.shortDescription ?? undefined,
      images: [
        {
          url: product.image ?? '/images/brand/og_image.png',
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
      description: product.shortDescription ?? undefined,
      images: [product.image ?? '/images/brand/og_image.png'],
    },
  };
}

// Funkce pro generování statických stránek (lepší performance)
export async function generateStaticParams() {
  try {
    const supplements = await db.product.findMany({});
    if (supplements.length > 0) {
      return supplements.map((supplement) => ({
        slug: supplement.slug,
      }));
    }
  } catch (error) {
    console.error("Chyba v generateStaticParams, vracím mock data:", error);
  }

  // Fallback na mock data
  const { products } = require('@/lib/mock/products');
  return products.map((p: any) => ({
    slug: p.slug,
  }));
}

export default async function SupplementDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // Fetch related products with sovereign price override
  const relatedProducts = await getRelatedProducts(slug, 3);

  if (!product) return notFound();
  
  const isFlagship = product.slug === 'black-dead-pre-workout' || product.slug === 'deadpump-v2-pump-formula';
  const isKase = product.slug.startsWith('ryzova-kase');

  // Všechny příchutě kaše pro switcher
  const kaseFlavors: FlavorOption[] = [
    { name: 'ČOKOLÁDA',       slug: 'ryzova-kase-cokolada',      image: '/images/products/rice-chocolate.jpg', isCurrent: product.slug === 'ryzova-kase-cokolada' },
    { name: 'SLANÝ KARAMEL', slug: 'ryzova-kase-slany-karamel', image: '/images/products/rice-caramel.jpg',   isCurrent: product.slug === 'ryzova-kase-slany-karamel' },
    { name: 'BORŮVKA',        slug: 'ryzova-kase-boruvka',       image: '/images/products/rice-blueberry.jpg',isCurrent: product.slug === 'ryzova-kase-boruvka' },
    { name: 'PIŠKOTOVÝ DORT',slug: 'ryzova-kase-piskotovy-dort',image: '/images/products/rice-biscuit.jpg',   isCurrent: product.slug === 'ryzova-kase-piskotovy-dort' },
  ];

  return (
    <section className="py-12 md:py-20 bg-white min-h-screen text-zinc-950">
      <div className="mx-auto w-[min(1280px,calc(100%-40px))]">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/supplements" 
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 transition-colors hover:text-[#d4ff00] not-italic"
          >
            ← ZPĚT
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">

            {/* Image area — FlavorSwitcher for kaše, standard for others */}
            {isKase ? (
              <FlavorImageSwitcher
                flavors={kaseFlavors}
                initialImage={product.image ?? '/images/products/rice-blueberry.jpg'}
                productName={product.name}
              />
            ) : (
              <div className="bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 p-4">
                <ProductDetailImage product={{ ...product, image: product.image ?? '' }} />
              </div>
            )}

            {/* Ingredients directly below product image - Universal */}
            {product.ingredients && (
              <Reveal delay={0.3}>
                <div className="p-6 bg-zinc-950 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-4 bg-[#d4ff00]" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4ff00]">Analysis / Ingredients</h3>
                  </div>
                  <div className="text-[11px] leading-relaxed text-zinc-400 font-bold uppercase tracking-tight not-italic">
                    {product.ingredients}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Nutrition Table - Desktop only, hidden for Flagships */}
            <div className="mt-4 hidden lg:block">
              {!isFlagship && (
                <NutritionTable data={product.nutrition as any} />
              )}
            </div>
          </div>

          {/* Detaily produktu */}
          <div className="flex flex-col">
            <div className="inline-block border-l-3 border-[#d4ff00] pl-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#d4ff00]">
              Performance Supplement
            </div>
            <h1 className="mt-4 text-4xl font-black uppercase leading-[1.15] text-zinc-950 md:text-6xl lg:text-8xl tracking-tight pb-1 overflow-visible">
              {product.name?.replace(/FITNESS\s*77/gi, '').replace(/FITNESS77/gi, '').replace(/[-–—]/g, ' ').replace(/\s+/g, ' ').trim()}
            </h1>
            <div className="flex items-baseline gap-4 mt-3 flex-wrap">
              {product.weight && (
                <div className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-300">
                  {product.weight}
                </div>
              )}
              {product.name.includes('/') && (
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 not-italic">
                  {product.name.split('/').slice(1).map(s => s.trim()).join(' / ')}
                </div>
              )}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mt-1 opacity-40">
              Fitness 77
            </div>
            
            {/* GOLIÁŠ Product Selection Engine */}
            {product.slug !== 'ryzova-kase' && (
              <div className="mt-8">
                <ProductSelector
                  product={{
                    ...product,
                    image: product.image,
                    variants: (product.variants as any) || []
                  }}
                  isSmall={true}
                />
              </div>
            )}

            {/* Description with bullet points - Universal layout */}
            <Reveal delay={0.4}>
              <div className="mt-10 border-t border-zinc-100 pt-8 flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-4 bg-zinc-200" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Popis produktu</h3>
                </div>
                {product.description?.split('\n').filter(l => l.trim()).map((line, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#d4ff00] font-black text-base leading-none mt-[3px] shrink-0">•</span>
                    <p className="text-zinc-600 text-sm sm:text-base leading-[1.7] font-medium not-italic">{line.replace(/^[•\-\*]\s*/, '')}</p>
                  </div>
                ))}
              </div>
            </Reveal>


            {/* Nutrition - MOBILE ONLY */}
            <div className="lg:hidden mt-12 pt-8 border-t border-zinc-100">
              {!isFlagship && (
                <NutritionTable data={product.nutrition as any} />
              )}
            </div>
            </div>
          </div>

        {/* Full Width Section for Trust Badges */}
        <div className="mt-16 border-t border-zinc-100 pt-8">
          <TrustBadges />
        </div>
        </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-zinc-100 py-16">
          <div className="mx-auto w-[min(1280px,calc(100%-40px))]">
            <div className="mb-12">
              <div className="inline-block border-l-4 border-zinc-200 pl-3 text-xs font-black uppercase tracking-[0.22em] text-zinc-400">
                Doporučujeme
              </div>
              <h2 className="mt-2 text-3xl font-black uppercase text-zinc-950 md:text-5xl tracking-tighter">
                Mohlo by se ti <span className="text-[#E10600]">líbit</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="flex justify-center">
                  <div className="w-full max-w-[380px]">
                    <ProductCard product={relatedProduct as any} isDark={false} disableScale={true} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <StickyMobileBuy product={{
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.image ?? '/images/products/placeholder.webp',
        price: product.price,
      }} />
    </section>

  );
}
