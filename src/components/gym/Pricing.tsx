import { motion } from 'framer-motion';

const Pricing = () => {
  const plans = [
    { title: 'JEDNORÁZOVÝ VSTUP', price: '160 Kč', sub: 'STUDENTI 140 Kč' },
    { title: 'MĚSÍČNÍ ČLENSTVÍ', price: '1 250 Kč', sub: 'STUDENTI 1 050 Kč' },
    { title: '10 VSTUPŮ (PERMANENTKA)', price: '1 400 Kč', sub: 'STUDENTI 1 200 Kč' },
    { title: 'ROČNÍ ČLENSTVÍ', price: '12 500 Kč', sub: 'DVA MĚSÍCE ZDARMA' },
  ];

  return (
    <section id="pricing" className="bg-[#050505] text-white py-40 px-6 md:px-32 relative overflow-hidden">
      <div className="absolute top-40 -right-20 text-[25vw] font-bebas font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter leading-none">
        GO HARD
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col mb-32">
           <motion.span 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="text-[#d4ff00] text-sm font-bold tracking-[0.8em] uppercase mb-8 block font-space"
           >
             Membership Structure
           </motion.span>
           <h2 className="text-[12vw] font-black leading-[0.8] tracking-tighter uppercase font-bebas mb-12">
             CENÍK<span className="text-[#d4ff00]">.</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-3xl shadow-2xl">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ backgroundColor: 'rgba(212, 255, 0, 1)', color: '#000' }}
              className="bg-[#050505]/80 p-12 flex flex-col justify-between h-[500px] transition-all duration-500 group border-white/5 border"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.4em] block mb-12 opacity-40 group-hover:text-black/60 group-hover:opacity-100 font-space">Option 0{i+1}</span>
                <h3 className="text-4xl font-black leading-none uppercase mb-6 font-bebas tracking-wider">{plan.title}</h3>
                <p className="text-sm font-bold opacity-50 uppercase tracking-widest font-space group-hover:text-black/70 group-hover:opacity-100">{plan.sub}</p>
              </div>
              <div>
                <div className="text-6xl font-black mb-10 tracking-tighter font-bebas">{plan.price}</div>
                <button className="w-full py-5 border border-current font-black uppercase font-bebas tracking-widest text-xl group-hover:bg-black group-hover:text-[#d4ff00] transition-all duration-500 hover:scale-105 active:scale-95">
                  Join Now
                </button>
              </div>
            </motion.div>
          ))}
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
                            <div className="w-32 h-32 rounded-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 rotate-3 group-hover:rotate-0 border-2 border-white/5 group-hover:border-[#d4ff00]/50 shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1548690312-e3b507d17a4d?auto=format&fit=crop&q=80" alt="Kačka" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-1000" />
                            </div>
                            <div>
                               <h5 className="text-5xl font-black group-hover:text-[#d4ff00] transition-colors font-bebas tracking-wider uppercase">KAČKA KLÍMOVÁ</h5>
                               <div className="h-1 w-0 group-hover:w-full bg-[#d4ff00] transition-all duration-700 mt-2" />
                            </div>
                        </div>
                        <p className="text-xl font-medium text-white/40 uppercase tracking-[0.2em] font-space max-w-sm group-hover:text-white/80 transition-colors">Dětské fitness / Powerlifting / Formování postavy</p>
                    </div>
                    <div className="group cursor-none">
                        <div className="flex items-center gap-10 mb-8">
                            <div className="w-32 h-32 rounded-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 -rotate-3 group-hover:rotate-0 border-2 border-white/5 group-hover:border-[#d4ff00]/50 shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80" alt="Klárka" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-1000" />
                            </div>
                            <div>
                               <h5 className="text-5xl font-black group-hover:text-[#d4ff00] transition-colors font-bebas tracking-wider uppercase">KLÁRKA</h5>
                               <div className="h-1 w-0 group-hover:w-full bg-[#d4ff00] transition-all duration-700 mt-2" />
                            </div>
                        </div>
                        <p className="text-xl font-medium text-white/40 uppercase tracking-[0.2em] font-space max-w-sm group-hover:text-white/80 transition-colors">Pilates / Jóga / Kruhové tréninky</p>
                    </div>
                </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-[#d4ff00] text-black p-20 flex flex-col justify-center relative rounded-[3rem] shadow-[0_0_100px_rgba(212,255,0,0.15)] overflow-hidden"
            >
                {/* Abstract decorative element */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/5 rounded-full blur-3xl" />

                <h4 className="text-[5vw] font-black uppercase mb-10 italic font-bebas leading-[0.8] tracking-tighter">PŘIDEJ SE K NÁM</h4>
                <p className="text-2xl font-medium text-black/70 mb-12 leading-tight uppercase font-space tracking-tight">
                    Nejsme jen fitko. Jsme komunita, která tě posune za tvoje limity. Přijď se podívat a zjisti, proč jsme jednička v Mladé Boleslavi.
                </p>
                <div className="text-[12vw] font-black text-transparent leading-none font-bebas tracking-tighter" style={{ WebkitTextStroke: '2px black' }}>F77.CZ</div>
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
