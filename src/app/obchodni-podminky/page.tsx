'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-black py-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mb-24"
        >
          <div className="inline-block border-l-4 border-[#E10600] pl-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
            PRÁVNÍ PROTOKOL / 06 / 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            OBCHODNÍ <br />
            <span className="text-[#E10600]">PODMÍNKY</span>
          </h1>
          <p className="text-zinc-600 font-medium max-w-2xl text-lg leading-relaxed uppercase tracking-wider text-xs">
            VŠEOBECNÉ OBCHODNÍ PODMÍNKY PRO NÁKUP NA E-SHOPU FIT77.CZ. KVALITA, TRANSPARENTNOST A FÉROVÉ JEDNÁNÍ.
          </p>
        </motion.div>

        <div className="space-y-20">
          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#E10600]">1. Úvodní ustanovení</h2>
            <div className="text-zinc-600 font-medium leading-relaxed space-y-4 text-sm uppercase tracking-wide">
              <p>Tyto obchodní podmínky platí pro nákup v internetovém obchodě Fitness 77 (fit77.cz). Podmínky blíže vymezují a upřesňují práva a povinnosti prodávajícího a kupujícího.</p>
              <p>Veškeré smluvní vztahy jsou uzavřeny v souladu s právním řádem České republiky.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#E10600]">2. Objednávka a uzavření smlouvy</h2>
            <div className="text-zinc-600 font-medium leading-relaxed space-y-4 text-sm uppercase tracking-wide">
              <p>Podáním objednávky kupující stvrzuje, že se seznámil s těmito obchodními podmínkami a že s nimi souhlasí.</p>
              <p>Objednávka je návrhem kupní smlouvy. Kupní smlouva vzniká v okamžiku potvrzení objednávky prodávajícím.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#E10600]">3. Platební podmínky</h2>
            <div className="text-zinc-600 font-medium leading-relaxed space-y-4 text-sm uppercase tracking-wide">
              <p>Ceny zboží jsou konečné, včetně DPH. Prodávající si vyhrazuje právo na změnu cen bez předchozího upozornění.</p>
              <p>Platbu lze provést převodem na účet, platební kartou online nebo dobírkou dle aktuální nabídky v košíku.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#E10600]">4. Doprava a dodání</h2>
            <div className="text-zinc-600 font-medium leading-relaxed space-y-4 text-sm uppercase tracking-wide">
              <p>Zboží expedujeme v co nejkratším možném termínu, obvykle do 24-48 hodin od potvrzení objednávky.</p>
              <p>Náklady na dopravu se řídí platným ceníkem uvedeným v procesu objednávky.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#E10600]">5. Reklamace a vrácení</h2>
            <div className="text-zinc-600 font-medium leading-relaxed space-y-4 text-sm uppercase tracking-wide">
              <p>Kupující má právo odstoupit od smlouvy do 14 dnů od převzetí zboží. Pro tento účel využijte náš <Link href="/odstoupeni-od-smlouvy" className="text-[#E10600] underline">digitální formulář</Link>.</p>
              <p>Zboží musí být vráceno v původním stavu, nepoškozené a v originálním obalu (u doplňků stravy nesmí být porušena pečeť).</p>
            </div>
          </section>
        </div>

        <footer className="mt-32 pt-10 border-t border-zinc-100 text-[8px] text-zinc-400 font-black uppercase tracking-[0.5em] flex justify-between items-center">
          <p>© 2026 FITNESS 77 MB • GOLIÁŠ LEGAL ENGINE</p>
          <Link href="/" className="hover:text-black transition-colors">ZPĚT NA HOME</Link>
        </footer>
      </div>
    </div>
  );
}
