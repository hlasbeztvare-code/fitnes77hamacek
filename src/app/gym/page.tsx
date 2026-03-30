"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FITNESS 77 - PERFORMANCE HUB 2026 - NO FILTER EDITION
 * Video hero.mp4 na 100% výkonu, zelená svítí, footer netknutej.
 */

const IconArrowRight = () => <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconDumbbell = () => <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M3 10v4m18-4v4M8.5 2v20M15.5 2v20"/></svg>;
const IconUsers = () => <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const TrainerCard = ({ trainer, index }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 18;
    const rotateY = (rect.width / 2 - x) / 18;
    cardRef.current.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
  };
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group bg-zinc-900 border border-zinc-800 hover:border-[rgb(222,255,95)]/60 transition-all duration-500 overflow-hidden rounded-3xl cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative overflow-hidden">
        <img src={trainer.img} alt={trainer.name} className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>
      <div className="p-10 text-left">
        <h3 className="text-4xl font-bold">{trainer.name}</h3>
        <p className="text-[rgb(222,255,95)] mt-1 mb-6 font-black uppercase tracking-widest">{trainer.role}</p>
        <p className="text-zinc-400 leading-relaxed">{trainer.bio}</p>
      </div>
    </motion.div>
  );
};

export default function GymPage() {
  const services = [
    { title: "Silový trénink", desc: "Hammer Strength zóna + volné váhy", icon: <IconDumbbell /> },
    { title: "Osobní trénink", desc: "Individuální plány s Hlaváčkem a Soustružníkem", icon: <IconUsers /> },
    { title: "BAZAR STROJŮ", desc: "Prodej a servis profi vybavení", icon: <IconDumbbell />, special: true },
    { title: "Powerlifting", desc: "Soutěžní příprava a technika", icon: <IconDumbbell /> },
    { title: "Hypertrofie", desc: "Objemový trénink a svalový růst", icon: <IconDumbbell /> },
    { title: "Kondiční trénink", desc: "Funkční trénink a kardio", icon: <IconDumbbell /> },
    { title: "Mobility & Core", desc: "Pohyblivost a stabilizace těla", icon: <IconDumbbell /> },
    { title: "Regenerace", desc: "Sauna, masáže, recovery programy", icon: <IconDumbbell /> },
  ];

  const trainers = [
    { name: "Hlaváček", role: "Hlavní trenér", img: "https://picsum.photos/id/64/600/600", bio: "Zkušený powerlifter s mnohaletou praxí. Soutěžil na národní úrovni." },
    { name: "Soustružník", role: "Silový trenér", img: "https://picsum.photos/id/1005/600/600", bio: "Specialista na funkční silový trénink a hypertrofii." },
  ];

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden selection:bg-[rgb(222,255,95)] selection:text-black">
      <style jsx global>{`
        .acid-glow { text-shadow: 0 0 30px rgb(222 255 95 / 0.8); }
      `}</style>

      {/* HERO SECTION - VYTAŽENÉ VIDEO NA MAX (SMRK) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-100" // TEĎ TO SVÍTÍ NA 100% (SMRK)
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* Jemný gradient dole a nahoře, aby byl čitelný text, ale video bylo vidět */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="mb-10 inline-flex items-center gap-3 px-8 py-3 border border-[rgb(222,255,95)]/50 rounded-3xl bg-black/50 backdrop-blur-md">
              <span className="text-xs font-black tracking-[5px] text-[rgb(222,255,95)] acid-glow uppercase">JIRASOVA 1320 • MLADÁ BOLESLAV</span>
            </div>
            <h1 className="text-[100px] md:text-[160px] lg:text-[210px] font-black uppercase italic leading-none tracking-[-8px]">
              FITNESS <span className="text-[rgb(222,255,95)] acid-glow">77</span>
            </h1>
            <p className="mt-8 text-2xl md:text-4xl text-white max-w-3xl mx-auto italic font-bold drop-shadow-lg">Luxusní industriální prostředí pro maximální výkon</p>
            <motion.a href="#registrace" className="mt-16 inline-flex items-center gap-6 bg-[rgb(222,255,95)] text-black px-16 py-8 font-black uppercase tracking-[3px] text-xl transition-all hover:bg-white shadow-[0_0_30px_rgba(222,255,95,0.4)]">
              VSTUP DO ELITY <IconArrowRight />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* SLUŽBY & BAZAR */}
      <section className="py-32 bg-zinc-950 border-y border-zinc-900 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl font-black uppercase mb-20 italic">Služby & Bazar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <div key={i} className="bg-zinc-900 p-10 border border-zinc-800 hover:border-[rgb(222,255,95)]/50 transition-all group text-left">
                <div className={`mb-8 text-5xl transition-transform group-hover:scale-110 ${s.special ? 'text-[rgb(222,255,95)]' : 'text-zinc-500'}`}>{s.icon}</div>
                <h3 className={`text-2xl font-bold mb-4 uppercase italic ${s.special ? 'text-[rgb(222,255,95)]' : 'text-white'}`}>{s.title}</h3>
                <p className="text-zinc-400 font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENÉŘI */}
      <section className="py-32 bg-black relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl font-black uppercase text-center mb-20 italic">Elite tým</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {trainers.map((t, i) => <TrainerCard key={i} trainer={t} index={i} />)}
          </div>
        </div>
      </section>

      {/* FOOTER - TVŮJ NEDOTKNUTELNÝ (SMRK) */}
      <footer className="bg-black border-t border-zinc-900 py-24 relative z-10">
        <div className="container mx-auto px-6 text-center text-zinc-500 text-sm tracking-[3px] font-bold uppercase">
          © 2026 Fitness 77 Performance Hub • Jirasova 1320, Mladá Boleslav
        </div>
      </footer>
    </div>
  );
}
