import { equipmentItems } from '@/lib/mock/equipment';

export default function EquipmentPage() {
  return (
    <section className="py-16">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-[0.2em] 
text-[#E10600]">
            Vybavení
          </span>
          <h1 className="mt-3 text-5xl font-bold uppercase">
            Silové a profesionální vybavení
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Výběr vybavení pro výkonnostní trénink, silový progres a 
kvalitní gym zázemí.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {equipmentItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-zinc-200 
bg-white transition hover:-translate-y-1 hover:border-[#E10600] 
hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div
                className="aspect-video w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold 
uppercase">{item.name}</h2>
                <p className="mt-4 text-sm leading-6 text-zinc-600 
dark:text-zinc-400">
                  {item.description}
                </p>
                <div className="mt-6 text-2xl font-bold text-[#E10600]">
                  {item.price.toLocaleString('cs-CZ')} Kč
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
