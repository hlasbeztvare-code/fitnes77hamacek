import Link from 'next/link';
import { getProducts } from '@/lib/queries/products';
import ProductCard from '@/components/shop/ProductCard';
import Reveal from '@/components/ui/Reveal';

export default async function WowHomepageSections() {
  const products = await getProducts();

  const categories = [
    {
      title: 'Gym / Trenéři',
      href: '/gym',
      description: 'Osobní vedení, rezervace a služby.',
    },
    {
      title: 'Suplementy',
      href: '/supplements',
      description: 'Protein, kreatin, pre-workout a amino produkty.',
    },
    {
      title: 'Vybavení',
      href: '/equipment',
      description: 'Silové vybavení a profesionální stroje.',
    },
    {
      title: 'Bazar',
      href: '/bazar',
      description: 'Použité stroje s transparentním stavem a cenou.',
    },
  ];

  return (
    <>
      <section className="bg-[#f4f4f5] py-24 hidden md:block">
        <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-block border-l-4 border-[#E10600] pl-3 text-sm font-black uppercase tracking-[0.22em] text-[#E10600]">
                Procházej
              </div>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] text-zinc-950 md:text-6xl">
                Naše <span className="text-[#E10600]">kategorie</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
                Výkon, vybavení, služby a obsah. Každá sekce webu má vlastní roli v tom, aby návštěvník šel blíž ke konverzi.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
            {categories.map((item, index) => (
              <Reveal key={item.href} delay={index * 0.06}>
                <Link
                  href={item.href}
                  className="group relative block overflow-hidden border border-zinc-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E10600] hover:shadow-2xl [clip-path:polygon(8%_0%,100%_0%,92%_100%,0%_100%)]"
                >
                  <div className="absolute left-0 top-0 h-1 w-full bg-zinc-950 transition group-hover:bg-[#E10600]" />
                  <div className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-[#E10600]">
                    0{index + 1}
                  </div>
                  <h3 className="text-3xl font-black uppercase leading-tight text-zinc-950">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-zinc-600">
                    {item.description}
                  </p>
                  <div className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-zinc-950 transition group-hover:text-[#E10600]">
                    Otevřít sekci →
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-block border-l-4 border-[#E10600] pl-3 text-sm font-black uppercase tracking-[0.22em] text-[#E10600]">
                Top produkty
              </div>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] text-zinc-950 md:text-6xl">
                Bestseller <span className="text-[#E10600]">kolekce</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
            {products.slice(0, 8).map((product, index) => (
              <Reveal key={product.id} delay={index * 0.06}>
                <ProductCard
                  product={{
                    ...product,
                    compareAtPrice: product.compareAtPrice ?? 0,
                  }}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="founder" id="onas" aria-label="O zakladateli">
        <div className="founder-sk"></div>
        <div className="founder-ct">
          <div className="founder-img">
            <img src="/images/trainers/hamacek.webp" alt="Jaroslav Hamáček" loading="lazy" />
          </div>

          <div>
            <div className="founder-lbl">Founder / Head Coach</div>

            <h2 className="founder-h2">
              Jaroslav Hamáček postavil <span className="hl">Fitness 77</span> pro lidi, kteří odmítají průměr
            </h2>

            <blockquote className="founder-quote">
              „Fitness 77 jsem postavil pro lidi, kteří nechtějí průměr. Neprodáváme náhodné suplementy ani prázdné řeči. Stavíme výkon, disciplínu a výsledky na produktech, které dávají smysl v reálném tréninku. Pokud má značka nést moje jméno a moji reputaci, musí obstát pod tlakem.“
            </blockquote>

            <div className="founder-feats">
              <div className="founder-feat">
                <div className="founder-feat-n">15+</div>
                <div className="founder-feat-l">let zkušeností</div>
              </div>
              <div className="founder-feat">
                <div className="founder-feat-n">5000+</div>
                <div className="founder-feat-l">zákazníků</div>
              </div>
              <div className="founder-feat">
                <div className="founder-feat-n">100%</div>
                <div className="founder-feat-l">focus na výkon</div>
              </div>
            </div>

            <div className="founder-name">Jaroslav Hamáček</div>
            <div className="founder-role">Founder & Head Coach</div>
          </div>
        </div>
      </section>

      {/* 
      <section className="cta-banner hidden md:block" id="akce" aria-label="Akce">
        <div className="cta-sk"></div>
        <div className="cta-in">
          <div>
            <div className="cta-lbl">⏰ limitovaná nabídka</div>
            <h2 className="cta-h2">
              Mega sleva
              <br />
              <span className="hl">30% na vše</span>
            </h2>
            <p className="cta-desc">
              Nepromeškej výraznou nabídku na vybrané produkty. Performance setup pro lidi, kteří chtějí víc než běžný standard.
            </p>
            <Link href="/supplements" className="btn btn-p">
              <span>Chci slevu →</span>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="border border-red-500/30 bg-[var(--ink-m)] p-5 text-center">
              <div className="text-4xl font-black text-white">03</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Dny</div>
            </div>
            <div className="border border-red-500/30 bg-[var(--ink-m)] p-5 text-center">
              <div className="text-4xl font-black text-white">12</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Hod</div>
            </div>
            <div className="border border-red-500/30 bg-[var(--ink-m)] p-5 text-center">
              <div className="text-4xl font-black text-white">47</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Min</div>
            </div>
          </div>
        </div>
      </section>
      */}
    </>
  );
}
