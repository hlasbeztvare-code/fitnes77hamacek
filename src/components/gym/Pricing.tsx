import { motion } from 'framer-motion';

const Pricing = () => {
  const plans = [
    { title: 'ZÁKLADNÍ VSTUPNÉ', price: '160 Kč', sub: 'STUDENT* 130 Kč', highlight: false },
    { title: '10 VSTUPŮ\n(PERMANENTKA)', price: '1 380 Kč', sub: 'STUDENT* 1 150 Kč\nPlatnost 2 měsíce', highlight: false },
    { title: '20 VSTUPŮ\n(PERMANENTKA)', price: '2 490 Kč', sub: '125 Kč za vstup\nPlatnost 3 měsíce', highlight: false },
    { title: '30 VSTUPŮ\n(PERMANENTKA)', price: '3 650 Kč', sub: '122 Kč za vstup\nPlatnost 6 měsíců', highlight: false },
    { title: '1 MĚSÍČNÍ ČLENSTVÍ', price: '1 490 Kč', sub: 'STUDENT* 1 190 Kč', highlight: false },
    { title: '3 MĚSÍČNÍ ČLENSTVÍ', price: '3 990 Kč', sub: '1 330 Kč / měsíc', highlight: false },
    { title: '6 MĚSÍČNÍ ČLENSTVÍ', price: '6 990 Kč', sub: '1 165 Kč / měsíc', highlight: false },
    { title: 'ROČNÍ ČLENSTVÍ', price: '12 990 Kč', sub: '1 083 Kč / měsíc', highlight: true },
  ];

  return (
    <section id="pricing" className="bg-[#050505] text-white py-40 px-6 md:px-32 relative overflow-hidden">
      <div className="absolute top-40 -right-20 text-[25vw] font-bebas font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter leading-none">
        GO HARD
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col mb-20">
           <motion.span 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="text-[#d4ff00] text-sm font-bold tracking-[0.8em] uppercase mb-8 block font-space"
           >
             Membership Structure
           </motion.span>
           <h2 className="text-[12vw] font-black leading-[0.8] tracking-tighter uppercase font-bebas mb-6">
             CENÍK<span className="text-[#d4ff00]">.</span>
           </h2>
           <p className="text-white/40 uppercase font-space text-xs tracking-widest">*PLATÍ PRO STUDENTY DO 26 LET, KTEŘÍ SE PROKÁŽÍ STUDENTSKOU KARTOU ISIC</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => {
            const isAnnual = plan.highlight;
            
            return (
            <div
              key={i}
              className={`relative bg-[#050505] p-6 lg:p-8 flex flex-col justify-between h-[450px] transition-all duration-500 border ${
                isAnnual 
                  ? 'border-[#d4ff00] shadow-[0_0_40px_rgba(212,255,0,0.15)] lg:-translate-y-4' 
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {isAnnual && (
                <div className="absolute -top-4 right-8 bg-[#d4ff00] text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 font-space">
                  Nejvýhodnější
                </div>
              )}
              <div>
                <span className={`text-xs font-bold uppercase tracking-[0.4em] block mb-6 font-space ${isAnnual ? 'text-[#d4ff00]' : 'text-white/40'}`}>Option 0{i+1}</span>
                <h3 className="text-3xl font-black leading-tight uppercase mb-4 font-bebas tracking-wider whitespace-pre-line break-words">{plan.title}</h3>
                <p className="text-xs font-bold opacity-50 uppercase tracking-widest font-space whitespace-pre-line">{plan.sub}</p>
              </div>
              <div>
                <div className={`text-5xl font-black mb-8 tracking-tighter font-bebas ${isAnnual ? 'text-[#d4ff00]' : ''}`}>{plan.price}</div>
                <button className={`w-full py-4 border font-black uppercase font-bebas tracking-widest text-xl transition-all duration-500 hover:scale-105 active:scale-95 ${
                  isAnnual 
                    ? 'bg-[#d4ff00] text-black border-[#d4ff00] hover:bg-white hover:border-white' 
                    : 'border-white/20 hover:bg-white hover:text-black hover:border-white'
                }`}>
                  Join Now
                </button>
              </div>
            </div>
            );
          })}
        </div>

        <div className="mt-48 grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div className="space-y-16">
                <div>
                   <span className="text-[#d4ff00] text-sm font-bold tracking-[0.8em] uppercase mb-10 block font-space">The Mentors</span>
                   <h4 className="text-[6vw] font-black uppercase font-bebas leading-[0.8] tracking-tighter">NAŠI<br /><span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>TRENÉŘI</span></h4>
                </div>
                <div className="space-y-16 mt-20">
                    <div className="group cursor-none">
                        <div className="flex items-center gap-10 mb-8">
                            <div className="w-32 h-32 rounded-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 rotate-3 group-hover:rotate-0 border-2 border-white/5 group-hover:border-[#d4ff00]/50 shadow-2xl bg-zinc-900">
                                <img src="/images/trainers/soustruznik.webp" alt="Ondřej Soustružník" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-1000" />
                            </div>
                            <div>
                               <h5 className="text-5xl font-black group-hover:text-[#d4ff00] transition-colors font-bebas tracking-wider uppercase leading-none">ONDŘEJ SOUSTRUŽNÍK</h5>
                               <div className="h-1 w-0 group-hover:w-full bg-[#d4ff00] transition-all duration-700 mt-2" />
                            </div>
                        </div>
                        <p className="text-xl font-medium text-white/40 uppercase tracking-[0.2em] font-space max-w-sm group-hover:text-white/80 transition-colors mb-4">HEAD COACH / FYZIO / SÍLA</p>
                        <a href="tel:+420777105548" className="inline-block text-[#d4ff00] border border-[#d4ff00]/30 px-4 py-2 rounded-xl uppercase text-sm font-bold tracking-widest hover:bg-[#d4ff00] hover:text-black transition-all">
                            Kontaktovat: +420 777 105 548
                        </a>
                    </div>
                    <div className="group cursor-none">
                        <div className="flex items-center gap-10 mb-8">
                            <div className="w-32 h-32 rounded-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 -rotate-3 group-hover:rotate-0 border-2 border-white/5 group-hover:border-[#d4ff00]/50 shadow-2xl bg-zinc-900">
                                <img src="/images/trainers/hamacek.webp" alt="Jaroslav Hamáček" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-1000" />
                            </div>
                            <div>
                               <h5 className="text-5xl font-black group-hover:text-[#d4ff00] transition-colors font-bebas tracking-wider uppercase leading-none">JAROSLAV HAMÁČEK</h5>
                               <div className="h-1 w-0 group-hover:w-full bg-[#d4ff00] transition-all duration-700 mt-2" />
                            </div>
                        </div>
                        <p className="text-xl font-medium text-white/40 uppercase tracking-[0.2em] font-space max-w-sm group-hover:text-white/80 transition-colors">MAJITEL / BOX / KOMUNITA</p>
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

                <h4 className="text-[5vw] font-black uppercase mb-10 italic font-bebas leading-[0.8] tracking-tighter">PŘIDEJ SE K NÁM</h4>
                <p className="text-2xl font-medium text-black/70 mb-12 leading-tight uppercase font-space tracking-tight">
                    Nejsme jen fitko. Jsme komunita, která tě posune za tvoje limity. Přijď se podívat a zjisti, proč jsme jednička v Mladé Boleslavi.
                </p>
                <div className="text-[8vw] font-black text-transparent leading-none font-bebas tracking-tighter px-10" style={{ WebkitTextStroke: '2px black' }}>Fit77.cz</div>
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
