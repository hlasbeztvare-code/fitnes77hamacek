"use client";
import React from 'react';
import { motion } from 'framer-motion';

/**
 * FITNESS 77 - PERFORMANCE HUB 2026
 * CESTA: src/app/gym/page.tsx
 * VIDEO: /public/images/hero.mp4
 */

const IconArrowRight = () => <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

const trainers = [
  { 
    name: "Petr Hamáček", 
    role: "Zakladatel & Elite Coach", 
    specialty: "Powerlifting / Strength Conditioning",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
    stats: { trainees: "500+", years: "15" }
  },
  { 
    name: "Alex Cross", 
    role: "Nutrition Specialist", 
    specialty: "Body Composition / Hypertrophy",
    img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=2040",
    stats: { trainees: "300+", years: "8" }
  }
];

const TrainerCard = ({ trainer, index }: { trainer: any, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    className="group relative h-[600px] overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-[rgb(222,255,95)]/50 transition-all duration-700 rounded-3xl"
  >
    <img src={trainer.img} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
    <div className="absolute bottom-0 left-0 w-full p-12 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 text-left">
      <div className="mb-4 text-[rgb(222,255,95)] font-black text-xs uppercase tracking-[5px]">{trainer.role}</div>
      <h3 className="text-5xl font-black uppercase italic mb-4 tracking-tighter text-white leading-none">{trainer.name}</h3>
      <div className="h-0.5 w-12 bg-[rgb(222,255,95)] mb-6 group-hover:w-full transition-all duration-700" />
      <p className="text-zinc-400 font-medium mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 italic text-sm">{trainer.specialty}</p>
      <div className="flex gap-10 text-left">
        <div>
          <div className="text-white font-black text-2xl">{trainer.stats.trainees}</div>
          <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Klienti</div>
        </div>
        <div>
          <div className="text-white font-black text-2xl">{trainer.stats.years}</div>
          <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Praxe</div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function GymPage() {
  return (
    <main className="bg-black text-white selection:bg-[rgb(222,255,95)] selection:text-black min-h-screen">
      
      {/* HERO SECTION - VIDEO Z /IMAGES/HERO.MP4 */}
      <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
            <source src="/images/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-7xl md:text-[11rem] font-black uppercase italic leading-[0.8] tracking-tighter text-white mb-8">
            GYM <span className="text-[rgb(222,255,95)]" style={{ textShadow: '0 0 30px rgba(222,255,95,0.6)' }}>77</span>
          </h1>
          <p className="text-white font-bold uppercase tracking-[5px] text-[10px] mb-12 opacity-80 italic">
            Hardcore Performance / Est. 2026
          </p>
          <button className="bg-[rgb(222,255,95)] text-black px-12 py-6 font-black uppercase italic tracking-[3px] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(222,255,95,0.4)]">
            Vstoupit do zóny
          </button>
        </div>
      </section>

      {/* ELITE TÝM - POUZE TATO SEKCE POD HEREM */}
      <section id="trainers" className="py-40 bg-black relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-7xl md:text-9xl font-black uppercase italic leading-none tracking-tighter text-white">
              ELITE <span className="text-[rgb(222,255,95)] uppercase">TÝM</span>
            </h2>
            <div className="w-24 h-1 bg-[rgb(222,255,95)] mx-auto mt-10 shadow-[0_0_15px_rgba(222,255,95,0.5)]" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {trainers.map((t, i) => <TrainerCard key={i} trainer={t} index={i} />)}
          </div>
        </div>
      </section>

    </main>
  );
}
