"use client";

import { motion } from 'framer-motion';
import { Mail, Zap, Target } from 'lucide-react';

const trainers = [
  {
    firstName: 'ONDŘEJ',
    lastName: 'SOUSTRUŽNÍK',
    title: 'HEAD COACH / ELITE TRAINER',
    image: '/images/trainers/soustruznik.webp', 
    skills: [
      { name: 'STRENGTH & TECH', value: 98 },
      { name: 'PHYSIOLOGY', value: 92 },
    ]
  },
  {
    firstName: 'JAROSLAV',
    lastName: 'HAMÁČEK',
    title: 'OWNER / VISIONARY',
    image: '/images/trainers/hamacek.webp', 
    skills: [
      { name: 'STRATEGY', value: 100 },
      { name: 'COMMUNITY', value: 95 },
    ]
  },
  {
    firstName: 'BEATA',
    lastName: 'CEJNAROVÁ',
    title: 'ELITE TRAINER / NUTRI COACH',
    image: '/images/trainers/cejnarova.jpg', 
    skills: [
      { name: 'STRENGTH', value: 94 },
      { name: 'NUTRITION', value: 98 },
    ]
  }
];

export const Team = () => {
  return (
    <section className="py-24 bg-black selection:bg-[#d4ff00] selection:text-black font-black">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2 className="text-[9vw] font-black text-white leading-none tracking-tighter uppercase select-none">
            POZNEJ <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px #d4ff00' }}>SVOJEHO</span>
          </h2>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 border border-[#d4ff00]/40 text-[#d4ff00] px-8 py-5 rounded-full font-bold uppercase tracking-widest text-xs font-medium cursor-default"
          >
            ELITE TEAM MB <Target size={20} className="text-[#d4ff00]"/>
          </motion.div>
        </div>

        <div className="mb-32">
          <h2 className="text-[16vw] font-black text-white leading-none tracking-tighter uppercase italic select-none">
            TRENÉRA<span className="text-[#d4ff00] italic">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {trainers.map((trainer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group w-full"
            >
              <div className="flex flex-col md:block">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 bg-zinc-900 transition-all duration-700 group-hover:border-[#d4ff00]/20">
                  <img
                    src={trainer.image}
                    alt={trainer.lastName}
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 md:opacity-90" />
                </div>

                <div className="relative md:absolute md:inset-0 flex flex-col justify-end p-8 md:p-12 mt-4 md:mt-0">
                  <div className="w-full">
                      <h3 className="text-[12vw] lg:text-[4.5vw] xl:text-[5.5rem] font-black text-white leading-[0.8] tracking-tighter uppercase group-hover:text-[#d4ff00] transition-colors duration-500 md:whitespace-nowrap">
                          {trainer.firstName}<br />
                          <span className="text-[#d4ff00] group-hover:text-white">{trainer.lastName}</span>
                      </h3>
                      <p className="text-white/50 text-[10px] font-medium font-medium uppercase tracking-[0.5em] mt-6 mb-8">{trainer.title}</p>
                      
                      <div className="max-w-[280px] space-y-4 font-medium">
                          {trainer.skills.map((skill, idx) => (
                              <div key={idx} className="space-y-1.5">
                                  <div className="flex justify-between text-[9px] text-white/40 uppercase tracking-widest font-bold">
                                      <span>{skill.name}</span>
                                      <span>{skill.value}%</span>
                                  </div>
                                  <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                                      <motion.div 
                                          initial={{ width: 0 }}
                                          whileInView={{ width: `${skill.value}%` }}
                                          transition={{ duration: 1.5, ease: "easeOut" }}
                                          className="h-full bg-[#d4ff00]"
                                      />
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-8 right-8 flex gap-3">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:border-[#d4ff00]/30 transition-colors">
                    <Mail size={18} className="text-white group-hover:text-[#d4ff00]" />
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:border-[#d4ff00]/30 transition-colors">
                    <Zap size={18} className="text-white group-hover:text-[#d4ff00]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
