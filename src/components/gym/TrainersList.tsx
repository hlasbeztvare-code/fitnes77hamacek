"use client";

import { motion } from 'framer-motion';

const miniTrainers = [
  {
    name: "ONDŘEJ SOUSTRUŽNÍK",
    tags: "STRENGTH / POWERLIFTING / PHYSIO",
    image: "/images/trainers/soustruznik.webp"
  },
  {
    name: "JAROSLAV HAMÁČEK",
    tags: "COMMUNITY / BOX / STRATEGY",
    image: "/images/trainers/hamacek.webp"
  },
  {
    name: "BEATA CEJNAROVÁ",
    tags: "FITNESS / NUTRITION / STRENGTH",
    image: "/images/trainers/cejnarova.jpg"
  }
];

export const TrainersList = () => {
  return (
    <div className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Levá strana - Headline (smrk) */}
        <div>
          <span className="text-[#d4ff00] font-medium text-xs tracking-[0.8em] uppercase mb-6 block">
            THE MENTORS
          </span>
          <h2 className="text-7xl md:text-8xl font-black text-white font-black leading-[0.8] mb-12 italic tracking-tighter">
            NAŠI <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px #fff' }}>LÍDŘI</span>
          </h2>
          
          <div className="space-y-12">
            {miniTrainers.map((t, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 group cursor-default"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10 group-hover:border-[#d4ff00]/50">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-black tracking-tight group-hover:text-[#d4ff00] transition-colors uppercase">
                    {t.name}
                  </h3>
                  <p className="text-white/30 text-[10px] font-medium tracking-widest mt-1">
                    {t.tags}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pravá strana - Ten výraznej neonovej box (smrk) */}
        <div className="relative">
          <div className="bg-[#d4ff00] p-12 md:p-20 rounded-[2rem] h-full flex flex-col justify-between overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-6xl md:text-7xl font-black text-black font-black leading-[0.85] uppercase italic tracking-tighter mb-8">
                PŘIDEJ SE<br />K NÁM
              </h2>
              <p className="text-black font-medium text-sm font-bold leading-relaxed max-w-sm uppercase">
                NEJSME JEN FITKO. JSME KOMUNITNÍ GYM, KTERÝ TĚ POSUNE ZA TVOJE LIMITY. 
                PŘIJĎ SE PODÍVAT A ZJISTI, PROČ JSME JEDNIČKA V MLADÉ BOLESLAVI.
              </p>
            </div>
            
            <div className="mt-20 relative z-10">
                <span className="text-black font-black text-9xl leading-none opacity-20 font-black tracking-tighter select-none">
                    F77.CZ
                </span>
            </div>
            
            {/* Dekorace na pozadí (smrk) */}
            <div className="absolute -bottom-10 -right-10 text-[20rem] font-black text-black/5 font-black italic select-none">
                77
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
