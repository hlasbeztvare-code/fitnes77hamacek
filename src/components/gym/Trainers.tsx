"use client";

import { motion } from 'framer-motion';

const miniTrainers = [
  {
    name: "ONDŘEJ SOUSTRUŽNÍK",
    tags: "HEAD COACH / FYZIO / SÍLA",
    image: "/images/trainers/old_web_2.jpg"
  },
  {
    name: "JAROSLAV HAMÁČEK",
    tags: "MAJITEL / BOX / KOMUNITA",
    image: "/images/trainers/old_web_1.jpg"
  }
];

export const Trainers = () => {
  return (
    <div className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Levá strana (smrk) */}
        <div>
          <span className="text-[#d4ff00] font-space text-xs tracking-[0.8em] uppercase mb-6 block">
            THE MENTORS
          </span>
          <h2 className="text-7xl md:text-8xl font-black text-white font-bebas leading-[0.8] mb-12 italic tracking-tighter">
            NAŠI <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px #fff' }}>TRENÉŘI</span>
          </h2>
          
          <div className="space-y-12">
            {miniTrainers.map((t, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 group cursor-default"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10 group-hover:border-[#d4ff00]/50 bg-zinc-900">
                  <img src={t.image} alt={t.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white font-bebas tracking-tight group-hover:text-[#d4ff00] transition-colors uppercase">
                    {t.name}
                  </h3>
                  <p className="text-white/30 text-[10px] font-space tracking-[0.3em] mt-2 uppercase">
                    {t.tags}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pravá strana - Lime box (smrk) */}
        <div className="relative">
          <div className="bg-[#d4ff00] p-12 md:p-20 rounded-[3rem] h-full flex flex-col justify-between overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-6xl md:text-7xl font-black text-black font-bebas leading-[0.85] uppercase italic tracking-tighter mb-8">
                PŘIDEJ SE<br />K NÁM
              </h2>
              <p className="text-black font-space text-sm font-bold leading-relaxed max-w-sm uppercase opacity-80">
                NEJSME JEN FITKO. JSME RODINA, KTERÁ TĚ POSUNE ZA TVOJE LIMITY. 
                PŘIJĎ SE PODÍVAT A ZJISTI, PROČ JE FITNESS 77 JEDNIČKA V MB.
              </p>
            </div>
            
            <div className="mt-20 relative z-10 flex items-baseline gap-2">
                <span className="text-black font-bebas text-9xl leading-none font-black tracking-tighter select-none opacity-20">
                    F77.CZ
                </span>
            </div>
            
            <div className="absolute -bottom-10 -right-10 text-[20rem] font-black text-black/5 font-bebas italic select-none">
                77
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
