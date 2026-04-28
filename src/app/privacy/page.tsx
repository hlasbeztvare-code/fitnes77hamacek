'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-black py-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mb-24"
        >
          <div className="inline-block border-l-4 border-[#E10600] pl-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
            GDPR PROTOKOL / 06 / 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            OCHRANA <br />
            <span className="text-[#E10600]">SOUKROMÍ</span>
          </h1>
          <p className="text-zinc-600 font-medium max-w-2xl text-lg leading-relaxed uppercase tracking-wider text-xs">
            VAŠE DATA JSOU U NÁS V BEZPEČÍ. TRANSPARENTNÍ ZPRACOVÁNÍ OSOBNÍCH ÚDAJŮ DLE AKTUÁLNÍ LEGISLATIVY.
          </p>
        </motion.div>

        <div className="space-y-20">
          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#E10600]">1. Správce údajů</h2>
            <div className="text-zinc-600 font-medium leading-relaxed space-y-4 text-sm uppercase tracking-wide">
              <p>Správcem vašich osobních údajů je Fitness 77 (dále jen "správce"). Kontaktní údaje naleznete v sekci kontakt.</p>
              <p>Zpracováváme pouze údaje nezbytné pro vyřízení vašich objednávek a poskytování našich služeb.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#E10600]">2. Rozsah zpracování</h2>
            <div className="text-zinc-600 font-medium leading-relaxed space-y-4 text-sm uppercase tracking-wide">
              <p>Zpracováváme zejména tyto údaje: Jméno, příjmení, e-mail, telefonní číslo, doručovací adresa a historie objednávek.</p>
              <p>Tyto údaje jsou nezbytné pro splnění kupní smlouvy a doručení zboží.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#E10600]">3. Cookies a analytika</h2>
            <div className="text-zinc-600 font-medium leading-relaxed space-y-4 text-sm uppercase tracking-wide">
              <p>Náš web používá cookies pro zajištění správné funkčnosti košíku a pro analýzu návštěvnosti pomocí anonymních nástrojů.</p>
              <p>Používáním webu souhlasíte s ukládáním těchto souborů do vašeho prohlížeče.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#E10600]">4. Vaše práva</h2>
            <div className="text-zinc-600 font-medium leading-relaxed space-y-4 text-sm uppercase tracking-wide">
              <p>Máte právo na přístup k údajům, jejich opravu, výmaz nebo omezení zpracování.</p>
              <p>Máte právo vznést námitku proti zpracování a právo na přenositelnost údajů.</p>
            </div>
          </section>
        </div>

        <footer className="mt-32 pt-10 border-t border-zinc-100 text-[8px] text-zinc-400 font-black uppercase tracking-[0.5em] flex justify-between items-center">
          <p>© 2026 FITNESS 77 MB • GOLIÁŠ PRIVACY KERNEL</p>
          <Link href="/" className="hover:text-black transition-colors">ZPĚT NA HOME</Link>
        </footer>
      </div>
    </div>
  );
}
