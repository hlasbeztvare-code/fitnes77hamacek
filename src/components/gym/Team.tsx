import { motion } from 'framer-motion';
import { Link, Zap } from 'lucide-react';

const trainers = [
  {
    name: 'KLÁRA',
    surname: 'KLÍMOVÁ',
    role: 'Osobní trenérka',
    specialization: 'Silový trénink, Formování postavy',
    image: 'https://images.unsplash.com/photo-1548691905-57c36cc8d93f?auto=format&fit=crop&q=80&w=800',
    stats: { strength: 95, endurance: 80, technique: 99 },
    accent: 'border-[#d4ff00]'
  },
  {
    name: 'KAČKA',
    surname: 'NOVÁKOVÁ',
    role: 'Fitness instruktorka',
    specialization: 'Funkční trénink, Kruháče',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    stats: { strength: 85, endurance: 95, technique: 90 },
    accent: 'border-white'
  }
];

export const Team = () => {
  return (
    <section id="tym" className="py-24 px-4 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex justify-between items-end mb-24"
        >
          <h2 className="text-8xl md:text-[12rem] font-bebas font-black tracking-tighter leading-[0.8] m-0 blend-diff">
            ELITE <br />
            <span className="text-outline">OPERATORS</span>
          </h2>
          <div className="hidden lg:block mb-4 text-right">
            <div className="h-px w-32 bg-[#d4ff00] mb-2 ml-auto" />
            <p className="text-[10px] font-syne uppercase tracking-widest text-white/40">The human engine</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative group cursor-none strobe-hover"
            >
              <div className="relative aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                
                {/* Stats overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                  <div className="space-y-4 max-w-xs">
                    <div className="flex justify-between text-[10px] font-syne uppercase tracking-widest text-white/60 mb-1">
                      <span>Strength</span>
                      <span>{trainer.stats.strength}%</span>
                    </div>
                    <div className="h-0.5 bg-white/10 w-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${trainer.stats.strength}%` }}
                        className="h-full bg-[#d4ff00]"
                      />
                    </div>

                    <div className="flex justify-between text-[10px] font-syne uppercase tracking-widest text-white/60 mb-1">
                      <span>Endurance</span>
                      <span>{trainer.stats.endurance}%</span>
                    </div>
                    <div className="h-0.5 bg-white/10 w-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${trainer.stats.endurance}%` }}
                        className="h-full bg-[#d4ff00]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h3 className="text-6xl md:text-8xl font-bebas font-black leading-none mb-2">
                    {trainer.name} <br />
                    <span className="text-[#d4ff00]">{trainer.surname}</span>
                  </h3>
                  <p className="text-white/40 font-syne uppercase tracking-widest text-xs">{trainer.role}</p>
                </div>
                
                <div className="flex gap-4">
                  <motion.div whileHover={{ scale: 1.2 }} className="p-3 border border-white/10 rounded-full hover:bg-[#d4ff00] hover:text-black transition-colors">
                    <Link size={20} />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }} className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-colors">
                    <Zap size={20} />
                  </motion.div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {trainer.specialization.split(', ').map((spec, i) => (
                  <span key={i} className="px-3 py-1 border border-white/10 text-[10px] font-syne uppercase tracking-widest text-white/60">
                    {spec}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
