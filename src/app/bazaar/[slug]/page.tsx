import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BazaarItem, bazaarItems } from '@/lib/mock/bazaar';
import AddToCartButton from '@/components/shop/AddToCartButton';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BazaarDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = bazaarItems.find((p: BazaarItem) => p.slug === slug);

  if (!item) return notFound();

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="mx-auto w-[min(1280px,calc(100%-40px))]">
        {/* Back Button */}
        <div className="mb-12">
          <Link 
            href="/bazaar" 
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-[#E10600] not-italic"
          >
            ← ZPĚT NA BAZAR
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Produktový obrázek s levitací a stínem */}
          <div className="relative aspect-square flex items-center justify-center bg-zinc-50/50 p-12 group">
            <div className="relative w-full h-full transition-transform duration-700 group-hover:-translate-y-4">
              <Image
                src={item.image}
                alt={item.name || item.title}
                fill
                className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.25)]"
                priority
              />
            </div>
            {/* Štítek stavu */}
            <div className="absolute left-0 top-0 z-30 bg-[#FF8C00] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black shadow-sm">
              {item.condition}
            </div>
          </div>

          {/* Detaily produktu */}
          <div className="flex flex-col justify-center">
            <div className="inline-block border-l-4 border-[#E10600] pl-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#E10600]">
              Bazar / Second Hand
            </div>
            <h1 className="mt-6 text-5xl font-black uppercase leading-[1.1] text-zinc-950 md:text-6xl lg:text-7xl not-italic tracking-tighter">
              {item.name || item.title}
            </h1>
            
            <div className="mt-8 flex items-center gap-6">
              <span className="text-4xl font-black text-zinc-950 not-italic">
                {item.price.toLocaleString('cs-CZ')} Kč
              </span>
              {item.originalPrice && item.originalPrice > 0 && (
                <span className="text-xl text-zinc-400 line-through not-italic">
                  {item.originalPrice.toLocaleString('cs-CZ')} Kč
                </span>
              )}
            </div>

            <div className="mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Lokalita: {item.location}
            </div>

            <p className="mt-8 text-lg leading-relaxed text-zinc-600 max-w-xl">
              {item.description}
            </p>

            <div className="mt-12 max-w-md">
              <AddToCartButton
                product={{
                  id: item.id,
                  name: `[BAZAR] ${item.name || item.title}`,
                  slug: item.slug,
                  price: item.price,
                  image: item.image,
                }}
              />
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-zinc-100 pt-12 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E10600]" />
                Prověřený stav
              </div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E10600]" />
                Ihned k odběru
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
