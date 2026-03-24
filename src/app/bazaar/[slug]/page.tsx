import { notFound } from 'next/navigation';
import { getBazaarItemBySlug } from '@/lib/queries/bazaar';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BazaarDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getBazaarItemBySlug(slug);

  if (!item) return notFound();

  return (
    <section className="py-16">
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
          <div
            className="aspect-video w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#E10600]">
            Bazar strojů
          </span>
          <h1 className="mt-3 text-5xl font-bold uppercase">{item.title}</h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {item.description}
          </p>

          <div className="mt-6 text-sm font-semibold uppercase text-zinc-500 dark:text-zinc-400">
            Lokalita: {item.location}
          </div>

          <div className="mt-8 flex items-end gap-4">
            <span className="text-4xl font-bold text-[#E10600]">
              {item.price.toLocaleString('cs-CZ')} Kč
            </span>
            {item.originalPrice && (
              <span className="text-lg text-zinc-400 line-through">
                {item.originalPrice.toLocaleString('cs-CZ')} Kč
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
