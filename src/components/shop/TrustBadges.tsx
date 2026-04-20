'use client';

import { ShieldCheck, Truck, Trophy, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrustBadges() {
  const badges = [
    { icon: <Truck className="w-5 h-5 text-[#E10600]" />, label: "DORUČENÍ DO 48H", sub: "Ze skladu v MB" },
    { icon: <ShieldCheck className="w-5 h-5 text-[#E10600]" />, label: "GARANCE KVALITY", sub: "Prověření výrobci" },
    { icon: <Trophy className="w-5 h-5 text-[#E10600]" />, label: "TOP HODNOCENÍ", sub: "Od profi atletů" },
    { icon: <MapPin className="w-5 h-5 text-[#E10600]" />, label: "OSOBNÍ ODBĚR", sub: "Mladá Boleslav" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-8">
      {badges.map((badge, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="flex items-start gap-3 p-3 bg-zinc-50 border border-zinc-100 rounded-lg group hover:border-[#E10600]/30 transition-colors"
        >
          <div className="p-2 bg-white rounded-md shadow-sm group-hover:bg-[#E10600]/5 transition-colors">
            {badge.icon}
          </div>
          <div>
            <div className="text-[12px] font-black uppercase tracking-widest text-zinc-950 leading-none mb-1">
              {badge.label}
            </div>
            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">
              {badge.sub}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
