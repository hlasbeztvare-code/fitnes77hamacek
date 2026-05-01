import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/db';
import AddToCartButton from '@/components/shop/AddToCartButton';
import { Metadata } from 'next';
import TrustBadges from '@/components/shop/TrustBadges';
import ProductCard from '@/components/shop/ProductCard';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findFirst({
    where: { slug },
  });

  if (!product) return { title: 'Vybavení | Fitness 77' };

  return {
    title: `${product.name} | Vybavení | Fitness 77`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.image ?? '/images/brand/og_image.png' }],
    },
  };
}

export async function generateStaticParams() {
  const items = await db.product.findMany({ where: { category: 'equipment' } });
  return items.map((i) => ({ slug: i.slug }));
}

export default async function EquipmentDetailPage({ params }: Props) {
  const { slug } = await params;

  const item = await db.product.findFirst({
    where: { slug, category: 'equipment' },
  });

  if (!item) return notFound();

  const related = await db.product.findMany({
    where: { category: 'equipment', NOT: { slug } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  const displayImage = item.name.toLowerCase().includes('opasek') ? '/videos/pasek.webm' : item.image;
  const isVideo = displayImage?.toLowerCase().match(/.(mp4|webm)$/i);

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="mx-auto w-[min(1280px,calc(100%-40px))]">
        <div className="mb-12">
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-[#E10600] not-italic"
          >
            ← ZPĚT NA VYBAVENÍ
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Obrázek / Video */}
          <div className="relative aspect-square flex items-center justify-center bg-zinc-50/50 p-12 group overflow-hidden">
            <div className="relative w-full h-full transition-transform duration-700 group-hover:-translate-y-4">
              {isVideo ? (
                <video
                  src={displayImage || ''}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.25)]"
                />
              ) : (
                <Image
                  src={displayImage || '/images/products/placeholder.webp'}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.25)]"
                  priority
                />
              )}
            </div>
          </div>

          {/* Detaily - Synchronizace s GOLIÁŠ standardem */}
          <div className="flex flex-col justify-center">
            <div className="inline-block border-l-4 border-[#E10600] pl-4 text-[12px] font-black uppercase tracking-[0.3em] text-[#E10600]">
              Performance Gear
            </div>
            <h1 className="mt-6 text-5xl font-black uppercase leading-[1.1] text-zinc-950 md:text-6xl lg:text-7xl not-italic tracking-tighter">
              {item.name}
            </h1>

            <div className="mt-8 flex items-baseline gap-4">
               <span className="text-4xl font-black tracking-tighter text-zinc-950 uppercase">
                {item.price.toLocaleString('cs-CZ')} Kč
               </span>
               {item.oldPrice && (
                <span className="text-xl font-black text-zinc-400 line-through decoration-red-600 decoration-2 uppercase">
                  {item.oldPrice.toLocaleString('cs-CZ')} Kč
                </span>
               )}
            </div>

            <div className="mt-8 max-w-md">
                <AddToCartButton 
                    product={{
                      ...item,
                      image: item.image,
                      variants: []
                    } as any}
                    disabled={item.stock <= 0}
                />
            </div>

            {/* Doomsday Two-Column Layout */}
            <div className="mt-12 md:columns-2 gap-12 text-zinc-500 leading-relaxed text-lg font-medium [column-rule:1px_solid_#f4f4f5] border-t border-zinc-100 pt-8">
              <div className="break-inside-avoid-column whitespace-pre-wrap">
                {item.description}
              </div>
            </div>

            <div className="mt-8 pt-0">
              <TrustBadges />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-zinc-100 pt-8 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E10600]" />
                Skladem v Mladé Boleslavi
              </div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E10600]" />
                Záruka kvality GOLIÁŠ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mohlo by se Vám líbit */}
      {related.length > 0 && (
        <div className="mt-24 border-t border-zinc-100">
          <div className="mx-auto w-[min(1280px,calc(100%-40px))] py-24">
            <div className="inline-block border-l-4 border-[#E10600] pl-3 text-sm font-black uppercase tracking-[0.22em] text-[#E10600] mb-4">
              Ostatní zákazníci zakoupili
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-950 mb-12">
              Mohlo by se Vám líbit
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel, index) => (
                <ProductCard key={rel.id} product={rel as any} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
