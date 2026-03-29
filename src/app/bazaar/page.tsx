import ConditionBadge from '@/components/bazaar/ConditionBadge';
import { getAllBazaarItems } from '@/lib/queries/bazaar';

export const dynamic = 'force-dynamic';

export default async function BazaarPage() {
  const items = await getAllBazaarItems();

  return (
    <section className="py-16">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#E10600]">
            Bazar strojů
          </span>
          <h1 className="mt-3 text-5xl font-bold uppercase">
            Použité stroje a vybavení
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Transparentní bazar se zaměřením na funkčnost, stav a důvěryhodnou nabídku.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:border-[#E10600] hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div
                className="aspect-video w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold uppercase">{item.title}</h2>
                  <ConditionBadge condition={item.condition as 'A' | 'B' | 'C'} />
                </div>

                <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>

                <div className="mt-4 text-sm font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                  Lokalita: {item.location}
                </div>

                <div className="mt-6 flex items-end gap-3">
                  <span className="text-2xl font-bold text-[#E10600]">
                    {item.price.toLocaleString('cs-CZ')} Kč
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-zinc-400 line-through">
                      {item.originalPrice.toLocaleString('cs-CZ')} Kč
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
