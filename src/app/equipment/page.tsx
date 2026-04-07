import Link from 'next/link';
import { getAllEquipment } from '@/lib/queries/equipment';
import AddToCartButton from '@/components/shop/AddToCartButton';

export default async function EquipmentPage() {
  const equipmentItems = await getAllEquipment();

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
        <div className="max-w-3xl">
          <div className="inline-block border-l-4 border-[#E10600] pl-3 text-sm font-black uppercase tracking-[0.22em] text-[#E10600]">
            Performance Gear
          </div>

          <h1 className="mt-4 text-5xl font-black uppercase leading-tight text-zinc-950 md:text-6xl not-italic">
            Vybavení
            <br />
            pro šampiony
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
            Špičkové příslušenství pro tvůj trénink. Odolné materiály, funkční design a nekompromisní kvalita.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-0 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 border-t border-l border-zinc-100">
          {equipmentItems.map((item) => (
            <article key={item.id} className="group relative flex flex-col overflow-hidden bg-white p-4 transition-all duration-500 border-r border-b border-zinc-100 rounded-none not-italic">
              <Link href={`/equipment/${item.slug}`} className="relative z-10 block">
                <div className="relative aspect-[4/5] overflow-hidden bg-white transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-none p-6">
                  <div
                    className="h-full w-full bg-contain bg-center bg-no-repeat p-4 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                </div>
              </Link>

              <div className="relative z-10 mt-3 sm:mt-5 flex flex-1 flex-col px-0.5 sm:px-1">
                <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-[#E10600]">
                  Performance Gear
                </div>

                <h3 className="mt-1 sm:mt-2 text-sm sm:text-lg font-black uppercase leading-tight text-zinc-950 transition-colors duration-300 group-hover:text-[#E10600] line-clamp-2 min-h-[2.5em]">
                  {item.name}
                </h3>

                <div className="mt-auto pt-3 sm:pt-4">
                  <div className="flex items-center gap-3">
                    <span className="text-base sm:text-xl font-black text-zinc-950">
                      {item.price.toLocaleString('cs-CZ')} Kč
                    </span>
                  </div>

                  <div className="mt-4 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                    <AddToCartButton
                      product={{
                        id: item.id,
                        name: item.name,
                        slug: item.slug,
                        price: item.price,
                        image: item.image,
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
