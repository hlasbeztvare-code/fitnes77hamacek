import Link from 'next/link';
import { equipmentItems } from '@/lib/mock/equipment';
import AddToCartButton from '@/components/shop/AddToCartButton';

export default function EquipmentPage() {
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

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {equipmentItems.map((item) => (
            <article key={item.id} className="group relative flex flex-col overflow-hidden bg-white p-4 transition-all duration-500 hover:z-10 rounded-none not-italic">
              <div className="absolute inset-0 z-0 bg-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] group-hover:ring-1 group-hover:ring-zinc-100 rounded-none" />
              
              <Link href={`/equipment/${item.slug}`} className="relative z-10 block">
                <div className="relative aspect-[4/5] overflow-hidden bg-white transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-lg rounded-none p-6 transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="absolute inset-0 z-20 translate-x-[-100%] bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" />
                  
                  <div
                    className="h-full w-full bg-contain bg-center bg-no-repeat p-4 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)]"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                </div>
              </Link>

              <div className="relative z-10 mt-5 flex flex-1 flex-col px-1">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#E10600]">
                  Performance Gear
                </div>

                <h3 className="mt-2 text-lg font-black uppercase leading-tight text-zinc-950 transition-colors duration-300 group-hover:text-[#E10600]">
                  {item.name}
                </h3>

                <div className="mt-auto pt-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-zinc-950">
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
