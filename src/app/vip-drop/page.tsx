'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, ArrowRight, Star } from 'lucide-react';
import { useCartStore } from '@/hooks/useCartStore';
import { useRouter } from 'next/navigation';


const ALL_REVIEWS = [
  { name: 'Patrik S.', text: 'Smrtící kombinace. Tréninky jsou teď úplně jinde.' },
  { name: 'David M.', text: 'Nic silnějšího jsem neměl. Nechápu, že je to legální.' },
  { name: 'Martin V.', text: 'V úterý jsem zničil osobák. Tohle funguje.' },
  { name: 'Lukáš R.', text: 'Žíly vyskočily jak nikdy. Kombinace = konec světa.' },
];

export default function VipDropPage() {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handleBuyCombo = () => {
    addItem({
      id: '3',
      name: 'BLACK DEAD',
      slug: 'black-dead-pre-workout',
      price: 899,
      image: '/images/products/blackdead_static.webp',
    });
    addItem({
      id: '4',
      name: 'DEAD PUMP',
      slug: 'deadpump-v2-pump-formula',
      price: 999,
      image: '/images/products/deadpump_static.webp',
    });
    router.push('/cart');
  };

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden selection:bg-[#E10600] selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        nav, header, footer, #main-global-footer, .floating-cart-btn { display: none !important; }
        body > div[class*="fixed"][class*="top-0"][class*="z-"] { display: none !important; }
        /* Zelena lista -> cervena */
        div[class*="bg-\\[#d4ff00\\]"] { background-color: #E10600 !important; color: white !important; }
      ` }} />

      {/* LIŠTA */}
      <div className="w-full bg-[#E10600] text-white text-center py-2 text-[11px] font-black uppercase tracking-[0.3em] z-50 relative flex items-center justify-center gap-4">
        <span>⚡ POUZE PRO ZVANÉ</span><span>•</span><span>NABÍDKA NENÍ VEŘEJNÁ ⚡</span>
      </div>

      {/* ══ HERO ══ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-4 bg-black overflow-hidden">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#660000] rounded-full blur-[150px] opacity-20" />
          <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[40vw] bg-[#8a0303] rounded-full blur-[150px] opacity-15" />
        </div>

        <div className="relative z-20 w-full max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ y: '-120vh' }} animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 10, stiffness: 50, delay: 0.1 }}
            className="absolute top-[-20vh] md:top-[-40vh] w-full flex flex-col items-center origin-top z-30"
          >
            <motion.div
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="origin-top flex flex-col items-center w-full"
            >
              <div className="flex justify-between w-[80%] md:w-[65%] h-[40vh] md:h-[60vh]">
                {[0, 1].map((k) => (
                  <div key={k} className="w-[60px] h-full relative">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      <defs>
                        <pattern id={`ch${k}`} x="0" y="0" width="60" height="120" patternUnits="userSpaceOnUse">
                          <rect x="6" y="0" width="48" height="75" rx="24" fill="none" stroke="#333" strokeWidth="12" />
                          <rect x="6" y="0" width="48" height="75" rx="24" fill="none" stroke="#666" strokeWidth="2" />
                          <rect x="18" y="60" width="24" height="75" rx="12" fill="#111" stroke="#000" strokeWidth="3" />
                          <rect x="22" y="65" width="16" height="65" rx="8" fill="#222" />
                          <line x1="30" y1="65" x2="30" y2="130" stroke="#444" strokeWidth="2" />
                          <rect x="18" y="-60" width="24" height="75" rx="12" fill="#111" stroke="#000" strokeWidth="3" />
                          <rect x="22" y="-55" width="16" height="65" rx="8" fill="#222" />
                          <line x1="30" y1="-55" x2="30" y2="10" stroke="#444" strokeWidth="2" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#ch${k})`} />
                    </svg>
                  </div>
                ))}
              </div>
              <h1
                className="text-[4.5rem] md:text-[11rem] font-[1000] uppercase tracking-tighter leading-[0.8] text-white drop-shadow-[0_30px_60px_rgba(225,6,0,0.6)] relative z-10 bg-[#020202]/80 backdrop-blur-xl px-4 md:px-12 py-6 border-t-[10px] border-zinc-800 rounded-b-xl shadow-[inset_0_0_50px_rgba(0,0,0,1),_0_20px_50px_rgba(0,0,0,0.8)] border-x-2 border-b-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <div className="absolute -top-6 left-[5%] md:left-[8%] w-8 h-8 bg-zinc-400 rounded-full border-4 border-black shadow-[inset_0_0_10px_white]" />
                <div className="absolute -top-6 right-[5%] md:right-[8%] w-8 h-8 bg-zinc-400 rounded-full border-4 border-black shadow-[inset_0_0_10px_white]" />
                THE DEAD<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#E10600] to-[#550000]">PROTOCOL</span>
              </h1>
            </motion.div>
          </motion.div>

          <div className="pt-[45vh] md:pt-[60vh] flex flex-col items-center space-y-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
              className="inline-block px-4 py-1 border border-white/10 text-white/50 text-[11px] font-black uppercase tracking-[0.4em] bg-black/50 backdrop-blur-md">
              🔒 Top Secret Drop
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl font-medium text-zinc-400 max-w-2xl mx-auto bg-black/30 p-4 backdrop-blur-sm text-center">
              Tato nabídka není veřejná. Získej kombo, které tě donutí zničit fitko.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-center gap-2 pt-8"
            >
              <div className="font-black font-mono text-[#E10600] text-5xl md:text-7xl drop-shadow-[0_0_30px_rgba(225,6,0,0.8)] tracking-widest">
                {fmt(timeLeft)}
              </div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#E10600]/70 font-black">Odpočet do destrukce</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ VIDEO — čisté ══ */}
      <section className="relative w-full bg-black">
        <video autoPlay loop muted playsInline className="w-full h-auto block">
          <source src="/videos/f3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      </section>

      {/* ══ 5-SLOUPCOVÝ LAYOUT s tuby vynikajícimi z okrajů ══ */}
      <section className="bg-[#050505] py-20 relative overflow-hidden">

        {/* TUB BLACK DEAD — zasunuto z leva o 50% */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[-380px] top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-14 bg-[#E10600] blur-3xl opacity-30 rounded-full" />
          <img
            src="/images/products/Blackdead.webp"
            alt="BLACK DEAD"
            className="h-[1080px] w-auto drop-shadow-[0_40px_100px_rgba(225,6,0,0.8)] object-contain"
          />
        </motion.div>

        {/* TUB DEAD PUMP — zasunuto zprava o 50% */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute right-[-500px] top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-14 bg-[#0055ff] blur-3xl opacity-35 rounded-full" />
          <img
            src="/images/products/deadp.png"
            alt="DEAD PUMP"
            className="h-[1200px] w-auto drop-shadow-[0_40px_100px_rgba(0,102,255,0.8)] object-contain"
          />
        </motion.div>

        {/* OBSAH — 3 sloupce uprostřed */}
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1fr_300px_1fr] gap-6 relative z-20">

          {/* ── LEVÝ POPIS ── */}
          <div className="border border-white/10 p-7 relative text-left">
            <div className="absolute -top-px left-0 w-1/2 h-px bg-gradient-to-r from-[#E10600] to-transparent" />
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#E10600] mb-3">Vlajková loď #1</p>
            <h4 className="text-xl font-black uppercase text-white mb-4">BLACK DEAD<br />PRE-WORKOUT</h4>
            <p className="text-zinc-300 text-sm leading-relaxed mb-5">
              Legální zbraň pro tvůj trénink. 225&nbsp;mg kofeinu, 11&nbsp;g čistého Citrulinu, 4,5&nbsp;g Beta-Alaninu. Kombinace, která ti zajistí nejlepší trénink tvého života.
            </p>
            <ul className="space-y-2 mb-6">
              {['Extrémní energie a soustředění','Brutální napumpování a žilnatost','Oddálení únavy a vytrvalost','Maximální síla v každém setu'].map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-zinc-200">
                  <span className="text-[#E10600] flex-shrink-0 mt-0.5">▸</span>{b}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-3 gap-3 text-left border-t border-white/8 pt-5">
              {[['225 mg','Kofein'],['11 256 mg','Citrulin'],['4 502 mg','Beta-Alanin']].map(([v,l]) => (
                <div key={l}>
                  <div className="text-[#E10600] font-black text-sm">{v}</div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-wide mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── STŘED — cena a checkout ── */}
          <div className="border border-white/10 p-8 flex flex-col items-center text-center relative bg-black sticky top-4">
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#E10600] to-transparent" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E10600] mb-4">Dead Protocol Kombo</p>
            <h2 className="text-3xl font-[1000] uppercase tracking-tighter text-white mb-1">KOMBO</h2>
            <div className="text-5xl font-[1000] text-[#E10600] mb-6">1 898 KČ</div>
            <div className="text-xs text-zinc-500 mb-6">BLACK DEAD 899 Kč + DEAD PUMP 999 Kč</div>
            <div className="w-full">
              <button
                onClick={handleBuyCombo}
                className="w-full py-5 bg-[#E10600] text-white font-black uppercase tracking-[0.2em] text-sm hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_0_50px_rgba(225,6,0,0.4)]"
              >
                Koupit kombo <ArrowRight size={16} />
              </button>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-4 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
              <span className="flex items-center gap-1"><Check size={11} className="text-[#E10600]" /> Skladem</span>
              <span className="flex items-center gap-1"><Shield size={11} className="text-[#E10600]" /> Goliáš Security</span>
              <span className="flex items-center gap-1"><Check size={11} className="text-[#E10600]" /> Black Edition</span>
            </div>
          </div>

          {/* ── PRAVÝ POPIS ── */}
          <div className="border border-white/10 p-7 relative text-right">
            <div className="absolute -top-px right-0 w-1/2 h-px bg-gradient-to-l from-[#E10600] to-transparent" />
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#E10600] mb-3">Vlajková loď #2</p>
            <h4 className="text-xl font-black uppercase text-white mb-4">DEAD PUMP<br />NON-STIM</h4>
            <p className="text-zinc-300 text-sm leading-relaxed mb-5">
              Ultimátní pre-workout bez stimulantů. 13&nbsp;g čistého Citrulinu + Betain. Svalová pumpa, kterou jsi ještě nepocítil. Ideální pro večerní tréninky.
            </p>
            <ul className="space-y-2 mb-6">
              {['Maximální prokrvení a transport živin','Zvýšení svalového objemu a tvrdosti','Zlepšení regenerace během tréninku','100% bez stimulantů – nenarušuje spánek'].map((b) => (
                <li key={b} className="flex items-start justify-end gap-2 text-sm text-zinc-200">
                  {b}<span className="text-[#E10600] flex-shrink-0 mt-0.5">◂</span>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-3 text-right border-t border-white/8 pt-5">
              {[['13 220 mg','Citrulin'],['3 966 mg','Betain']].map(([v,l]) => (
                <div key={l}>
                  <div className="text-[#E10600] font-black text-sm">{v}</div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-wide mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ══ VŠECHNY RECENZE — plná šířka, rovnoměrně ══ */}
        <div className="max-w-5xl mx-auto px-8 mt-16 border-t border-white/8 pt-10 relative z-20">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6 text-center">Co říkají ostatní</p>
          <div className="grid grid-cols-4 gap-4">
            {ALL_REVIEWS.map((r, i) => (
              <div key={i} className="bg-black/60 border border-white/8 p-4 rounded-sm">
                <div className="flex text-[#E10600] mb-2 gap-0.5">
                  {Array(5).fill(0).map((_, s) => <Star key={s} size={11} fill="currentColor" />)}
                </div>
                <p className="text-white/85 text-xs leading-relaxed italic mb-2">&ldquo;{r.text}&rdquo;</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{r.name}</p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
