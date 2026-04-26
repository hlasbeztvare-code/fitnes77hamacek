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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-8">
      {badges.map((badge, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 p-3 bg-white border border-zinc-100 rounded-xl group hover:border-red-600/30 transition-all shadow-sm"
        >
          <div className="p-2 bg-zinc-50 rounded-lg group-hover:bg-red-50 transition-colors shrink-0">
            {badge.icon}
          </div>
          <div className="min-w-0">
            <div className="text-[11px] md:text-[12px] font-black uppercase tracking-wider text-zinc-950 leading-tight mb-1 truncate">
              {badge.label}
            </div>
            <div className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest truncate">
              {badge.sub}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
