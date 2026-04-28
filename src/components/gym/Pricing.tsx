'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Pricing = () => {
  const plans = [
    { id: 'plan-vstup-zakladni', title: 'ZÁKLADNÍ VSTUPNÉ', priceStr: '160 Kč', priceNum: 160, sub: 'STUDENT* 130 Kč', highlight: false },
    { id: 'plan-1-mesic', title: '1 MĚSÍČNÍ ČLENSTVÍ', priceStr: '1 490 Kč', priceNum: 1490, sub: 'STUDENT* 1 190 Kč', highlight: false },
    { id: 'plan-rocni-clenstvi', title: 'ROČNÍ ČLENSTVÍ', priceStr: '12 990 Kč', priceNum: 12990, sub: '1 083 Kč / měsíc', highlight: true },
    { id: 'plan-10-vstupu', title: '10 VSTUPŮ\n(PERMANENTKA)', priceStr: '1 380 Kč', priceNum: 1380, sub: 'STUDENT* 1 150 Kč\nPlatnost 2 měsíce', highlight: false },
    { id: 'plan-20-vstupu', title: '20 VSTUPŮ\n(PERMANENTKA)', priceStr: '2 490 Kč', priceNum: 2490, sub: '125 Kč za vstup\nPlatnost 3 měsíce', highlight: false },
    { id: 'plan-30-vstupu', title: '30 VSTUPŮ\n(PERMANENTKA)', priceStr: '3 650 Kč', priceNum: 3650, sub: '122 Kč za vstup\nPlatnost 6 měsíců', highlight: false },
    { id: 'plan-3-mesice', title: '3 MĚSÍČNÍ ČLENSTVÍ', priceStr: '3 990 Kč', priceNum: 3990, sub: '1 330 Kč / měsíc', highlight: false },
    { id: 'plan-6-mesicu', title: '6 MĚSÍČNÍ ČLENSTVÍ', priceStr: '6 990 Kč', priceNum: 6990, sub: '1 165 Kč / měsíc', highlight: false },
  ];

  return (
    <section id="pricing" className="bg-[#000000] text-white pt-0 pb-20 md:pb-40 px-4 md:px-32 relative overflow-hidden">
      <div className="absolute top-40 -right-20 text-[25vw] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter leading-none">
        GO HARD
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col mb-10">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[#d4ff00] text-sm font-bold tracking-[0.8em] uppercase mb-8 block"
          >
            Membership Structure
          </motion.span>
          <h2 className="text-[16vw] md:text-[12vw] font-black leading-[0.8] tracking-tighter uppercase mb-3 md:mb-6">
            CENÍK<span className="text-[#d4ff00]">.</span>
          </h2>
          <p className="text-white/40 uppercase font-medium text-xs tracking-widest">*PLATÍ PRO STUDENTY DO 26 LET, KTEŘÍ SE PROKÁŽÍ STUDENTSKOU KARTOU ISIC</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {plans.map((plan, i) => {
            const isAnnual = plan.highlight;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-[#000000] p-4 md:p-6 lg:p-8 flex flex-col justify-between h-[280px] md:h-[380px] lg:h-[450px] transition-all duration-500 border ${isAnnual
                  ? 'border-[#d4ff00] shadow-[0_0_40px_rgba(212,255,0,0.15)] lg:-translate-y-4'
                  : 'border-white/10 hover:border-white/30'
                  }`}
              >
                {isAnnual && (
                  <div className="absolute -top-4 right-8 bg-[#d4ff00] text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2">
                    Nejvýhodnější
                  </div>
                )}
                <div>
                  <span className={`text-[9px] md:text-xs font-bold uppercase tracking-[0.4em] block mb-3 md:mb-6 ${isAnnual ? 'text-[#d4ff00]' : 'text-white/40'}`}>Option 0{i + 1}</span>
                  <h3 className="text-xl md:text-3xl font-black leading-tight uppercase mb-2 md:mb-4 tracking-wider whitespace-pre-line break-words">{plan.title}</h3>
                  <p className="text-[9px] md:text-xs font-bold opacity-50 uppercase tracking-widest whitespace-pre-line">{plan.sub}</p>
                </div>

                <div>
                  <div className="text-3xl md:text-5xl font-black mb-4 md:mb-8 tracking-tighter text-[#d4ff00] uppercase">
                    {plan.priceStr}
                  </div>
                  <div className={`w-full py-3 md:py-4 border font-black uppercase tracking-widest text-base md:text-xl transition-all duration-300 cursor-default text-center ${isAnnual
                    ? 'bg-[#d4ff00] text-black border-[#d4ff00]'
                    : 'border-[#d4ff00] text-[#d4ff00]'
                    }`}
                  >
                    JOIN US
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tady jsou zpátky tvoji trenéři a karta, nindžo (smrk) */}
        <div id="trainers" className="mt-48 grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-16">
            <div>
              <span className="text-[#d4ff00] text-sm font-bold tracking-[0.8em] uppercase mb-10 block font-medium">The Mentors</span>
              <h4 className="text-[6vw] font-black uppercase font-black leading-[0.8] tracking-tighter">NAŠI<br /><span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>TRENÉŘI</span></h4>
            </div>
            <div className="space-y-16 mt-20">
              <div className="block group cursor-pointer relative">
                <Link href="/gym/ondrej-soustruznik" className="absolute inset-0 z-10" aria-label="Ondřej Soustružník Profil"></Link>
                <div className="flex items-center gap-10 mb-8">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden transition-all duration-700 rotate-3 group-hover:rotate-0 border-2 border-white/5 group-hover:border-[#d4ff00]/50 shadow-2xl bg-black relative">
                    <Image 
                      src="/images/trainers/soustruznik.webp" 
                      alt="Ondřej Soustružník" 
                      fill
                      sizes="128px"
                      loading="lazy"
                      className="object-cover object-top transition-all duration-1000" 
                    />
                  </div>
                  <div>
                    <h5 className="text-5xl font-black group-hover:text-[#d4ff00] transition-colors font-black tracking-wider uppercase leading-none">ONDŘEJ SOUSTRUŽNÍK</h5>
                    <div className="h-1 w-0 group-hover:w-full bg-[#d4ff00] transition-all duration-700 mt-2" />
                  </div>
                </div>
                <p className="text-xl font-medium text-white/40 uppercase tracking-[0.2em] font-medium max-w-sm group-hover:text-white/80 transition-colors mb-4">HEAD COACH / FYZIO / SÍLA</p>
                <div className="flex items-center gap-6 flex-wrap relative z-20">
                  <a href="tel:+420773688076" className="inline-block text-[#d4ff00] border border-[#d4ff00]/30 px-4 py-2 rounded-xl uppercase text-sm font-bold tracking-widest hover:bg-[#d4ff00] hover:text-black transition-all whitespace-nowrap">
                    Kontaktovat: +420 773 688 076
                  </a>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 group-hover:text-white/60 transition-colors">
                    Detail profilu →
                  </span>
                </div>
              </div>
              <div className="block group cursor-pointer relative">
                <Link href="/gym/jaroslav-hamacek" className="absolute inset-0 z-10" aria-label="Jaroslav Hamáček Profil"></Link>
                <div className="flex items-center gap-10 mb-8">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden transition-all duration-700 -rotate-3 group-hover:rotate-0 border-2 border-white/5 group-hover:border-[#d4ff00]/50 shadow-2xl bg-black relative">
                    <Image 
                      src="/images/trainers/hamacek.webp" 
                      alt="Jaroslav Hamáček" 
                      fill
                      sizes="128px"
                      loading="lazy"
                      className="object-cover object-top transition-all duration-1000" 
                    />
                  </div>
                  <div>
                    <h5 className="text-5xl font-black group-hover:text-[#d4ff00] transition-colors font-black tracking-wider uppercase leading-none">JAROSLAV HAMÁČEK</h5>
                    <div className="h-1 w-0 group-hover:w-full bg-[#d4ff00] transition-all duration-700 mt-2" />
                  </div>
                </div>
                <p className="text-xl font-medium text-white/40 uppercase tracking-[0.2em] font-medium max-w-sm group-hover:text-white/80 transition-colors mb-4">MAJITEL / BOX / KOMUNITA</p>
                <div className="flex items-center gap-6 flex-wrap relative z-20">
                  <a href="tel:+420777105548" className="inline-block text-[#d4ff00] border border-[#d4ff00]/30 px-4 py-2 rounded-xl uppercase text-sm font-bold tracking-widest hover:bg-[#d4ff00] hover:text-black transition-all whitespace-nowrap">
                    Kontaktovat: +420 777 105 548
                  </a>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 group-hover:text-white/60 transition-colors">
                    Detail profilu →
                  </span>
                </div>
              </div>
              <div className="block group cursor-pointer relative">
                <Link href="/gym/beata-cejnarova" className="absolute inset-0 z-10" aria-label="Beata Cejnarová Profil"></Link>
                <div className="flex items-center gap-10 mb-8">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden transition-all duration-700 rotate-2 group-hover:rotate-0 border-2 border-white/5 group-hover:border-[#d4ff00]/50 shadow-2xl bg-black relative">
                    <Image 
                      src="/images/trainers/cejnarova.webp" 
                      alt="Beata Cejnarová" 
                      fill
                      sizes="128px"
                      loading="lazy"
                      className="object-cover object-top transition-all duration-1000" 
                    />
                  </div>
                  <div>
                    <h5 className="text-5xl font-black group-hover:text-[#d4ff00] transition-colors font-black tracking-wider uppercase leading-none">BEATA CEJNAROVÁ</h5>
                    <div className="h-1 w-0 group-hover:w-full bg-[#d4ff00] transition-all duration-700 mt-2" />
                  </div>
                </div>
                <p className="text-xl font-medium text-white/40 uppercase tracking-[0.2em] font-medium max-w-sm group-hover:text-white/80 transition-colors mb-4">FITNESS TRENÉRKA / NUTRIČNÍ KOUČKA</p>
                <div className="flex items-center gap-6 flex-wrap relative z-20">
                  <a href="https://www.instagram.com/beatacejnarova" target="_blank" rel="noopener noreferrer" className="inline-block text-[#d4ff00] border border-[#d4ff00]/30 px-4 py-2 rounded-xl uppercase text-sm font-bold tracking-widest hover:bg-[#d4ff00] hover:text-black transition-all">
                    @beatacejnarova
                  </a>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 group-hover:text-white/60 transition-colors">
                    Detail profilu →
                  </span>
                </div>
              </div>
              <div className="block group cursor-pointer relative">
                <Link href="/gym/lenka-pickova" className="absolute inset-0 z-10" aria-label="Lenka Picková Profil"></Link>
                <div className="flex items-center gap-10 mb-8">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden transition-all duration-700 -rotate-2 group-hover:rotate-0 border-2 border-white/5 group-hover:border-[#d4ff00]/50 shadow-2xl bg-black relative">
                    <Image 
                      src="/images/trainers/lenka.webp" 
                      alt="Lenka Picková" 
                      fill
                      sizes="128px"
                      loading="lazy"
                      className="object-cover object-top transition-all duration-1000" 
                    />
                  </div>
                  <div>
                    <h5 className="text-5xl font-black group-hover:text-[#d4ff00] transition-colors font-black tracking-wider uppercase leading-none">LENKA PICKOVÁ</h5>
                    <div className="h-1 w-0 group-hover:w-full bg-[#d4ff00] transition-all duration-700 mt-2" />
                  </div>
                </div>
                <p className="text-xl font-medium text-white/40 uppercase tracking-[0.2em] font-medium max-w-sm group-hover:text-white/80 transition-colors mb-4">FITNESS TRENÉRKA</p>
                <div className="flex items-center gap-6 flex-wrap relative z-20">
                  <a href="https://www.instagram.com/fitby_lenka" target="_blank" rel="noopener noreferrer" className="inline-block text-[#d4ff00] border border-[#d4ff00]/30 px-4 py-2 rounded-xl uppercase text-sm font-bold tracking-widest hover:bg-[#d4ff00] hover:text-black transition-all">
                    @fitby_lenka
                  </a>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 group-hover:text-white/60 transition-colors">
                    Detail profilu →
                  </span>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-[#d4ff00] text-black p-20 flex flex-col justify-center relative rounded-[3rem] shadow-[0_0_100px_rgba(212,255,0,0.15)] overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/5 rounded-full blur-3xl" />

            <h4 className="text-[5vw] font-black uppercase mb-10 italic font-black leading-[0.8] tracking-tighter">PŘIDEJ SE K NÁM</h4>
            <p className="text-2xl font-medium text-black/70 mb-12 leading-tight uppercase font-medium tracking-tight">
              Nejsme jen fitko. Jsme komunita, která tě posune za tvoje limity. Přijď se podívat a zjisti, proč jsme jednička v Mladé Boleslavi.
            </p>
            <div className="text-[8vw] font-black text-transparent leading-none font-black tracking-tighter px-10" style={{ WebkitTextStroke: '2px black' }}>Fit77.cz</div>
            <div className="mt-12 flex gap-4">
              <div className="w-12 h-1 bg-black" />
              <div className="w-4 h-1 bg-black" />
              <div className="w-2 h-1 bg-black" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;