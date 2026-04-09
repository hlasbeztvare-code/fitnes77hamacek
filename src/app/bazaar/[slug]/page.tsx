import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/db';
import AddToCartButton from '@/components/shop/AddToCartButton';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const items = await db.bazaarListing.findMany();
  return items.map((i) => ({ slug: i.slug }));
}

export default async function BazaarDetailPage({ params }: Props) {
  const { slug } = await params;

  const item = await db.bazaarListing.findUnique({ where: { slug } });

  if (!item) return notFound();

  const related = await db.bazaarListing.findMany({
    where: { NOT: { slug } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="mx-auto w-[min(1280px,calc(100%-40px))]">
        <div className="mb-12">
          <Link
            href="/bazaar"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-[#E10600] not-italic"
          >
            ← ZPĚT NA BAZAR
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Obrázek */}
          <div className="relative aspect-square flex items-center justify-center bg-zinc-50/50 p-12 group">
            <div className="relative w-full h-full transition-transform duration-700 group-hover:-translate-y-4">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.25)]"
                priority
              />
            </div>
            <div className="absolute left-0 top-0 z-30 bg-[#FF8C00] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black shadow-sm">
              {item.condition}
            </div>
          </div>

          {/* Detaily */}
          <div className="flex flex-col justify-center">
            <div className="inline-block border-l-4 border-[#E10600] pl-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#E10600]">
              Bazar / Second Hand
            </div>
            <h1 className="mt-6 text-5xl font-black uppercase leading-[1.1] text-zinc-950 md:text-6xl lg:text-7xl not-italic tracking-tighter">
              {item.title}
            </h1>

            <div className="mt-8">
              <span className="text-3xl font-black uppercase tracking-wider text-zinc-500 not-italic">Připravujeme</span>
            </div>

            <div className="mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Lokalita: {item.location}
            </div>

            <p className="mt-8 text-lg leading-relaxed text-zinc-600 max-w-xl">{item.description}</p>

            <div className="mt-12 max-w-md">
              <button disabled className="w-full cursor-not-allowed bg-zinc-200 px-6 py-4 font-black uppercase tracking-widest text-zinc-400">
                Připravujeme
              </button>
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
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <Link key={rel.id} href={`/bazaar/${rel.slug}`} className="group block">
                  <div className="relative aspect-square flex items-center justify-center overflow-hidden bg-zinc-50 p-8 transition-colors group-hover:bg-zinc-100">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      width={400}
                      height={400}
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#FF8C00] px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-black">
                      {rel.condition}
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">{rel.title}</h3>
                    <p className="mt-2 text-base font-bold uppercase tracking-wider text-zinc-500">Připravujeme</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
