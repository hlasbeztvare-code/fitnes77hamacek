import { notFound } from 'next/navigation';
import { getEquipmentBySlug } from '@/lib/queries/equipment';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EquipmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getEquipmentBySlug(slug);

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
            Vybavení
          </span>
          <h1 className="mt-3 text-5xl font-bold uppercase">{item.name}</h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {item.description}
          </p>
          <div className="mt-8 text-4xl font-bold text-[#E10600]">
            {item.price.toLocaleString('cs-CZ')} Kč
          </div>
        </div>
      </div>
    </section>
  );
}
