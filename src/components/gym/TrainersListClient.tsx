"use client";

import { motion } from 'framer-motion';

interface Trainer {
  id: string;
  name: string;
  role: string;
  image: string;
  specialties: string[];
}

interface TrainersListClientProps {
  trainers: Trainer[];
}

export const TrainersListClient = ({ trainers }: TrainersListClientProps) => {
  return (
    <div className="space-y-12">
      {trainers.map((t) => (
        <motion.div 
          key={t.id}
          whileHover={{ x: 10 }}
          className="flex items-center gap-6 group cursor-default"
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10 group-hover:border-[#d4ff00]/50">
            <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white font-bebas tracking-tight group-hover:text-[#d4ff00] transition-colors uppercase">
              {t.name}
            </h3>
            <p className="text-white/30 text-[10px] font-space tracking-widest mt-1 uppercase">
              {t.role} / {t.specialties.join(' / ')}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
