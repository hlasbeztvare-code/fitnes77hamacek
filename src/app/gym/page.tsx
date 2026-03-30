"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

/**
 * FITNESS 77 - PERFORMANCE HUB 2026
 * HERO VIDEO + 8 SERVICES + TRAINERS + PRICING + UNTOUCHABLE FOOTER
 */

const IconArrowRight = () => <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconDumbbell = () => <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M3 10v4m18-4v4M8.5 2v20M15.5 2v20"/></svg>;
const IconUsers = () => <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

export default function GymPage() {
  const services = [
    { title: "Silový trénink", desc: "Hammer Strength zóna + volné váhy", icon: <IconDumbbell /> },
    { title: "Osobní trénink", desc: "Individuální plány s Hlaváčkem a Soustružníkem", icon: <IconUsers /> },
    { title: "BAZAR STROJŮ", desc: "Prodej a servis profi vybavení", icon: <IconDumbbell />, color: "rgb(222, 255, 95)" },
    { title: "Powerlifting", desc: "Soutěžní příprava a technika", icon: <IconDumbbell /> },
    { title: "Hypertrofie", desc: "Objemový trénink a svalový růst", icon: <IconDumbbell /> },
    { title: "Kondiční trénink", desc: "Funkční trénink a kardio", icon: <IconDumbbell /> },
    { title: "Mobility & Core", desc: "Pohyblivost a stabilizace těla", icon: <IconDumbbell /> },
    { title: "Soutěžní příprava", desc: "Komplexní příprava na závody", icon: <IconDumbbell /> },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden font-sans">
      <style jsx global>{`
        .acid-glow { text-shadow: 0 0 40px rgb(222 255 95 / 0.9), 0 0 90px rgb(222 255 95 / 0.5); }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-black py-20">
        <div className="container mx-auto px-6 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="mb-10 inline-flex items-center gap-3 px-8 py-3 border border-[rgb(222,255,95)]/30 rounded-3xl">
              <span className="text-xs font-black tracking-[5px] text-[rgb(222,255,95)] acid-glow uppercase">JIRASOVA 1320 • MLADÁ BOLESLAV</span>
            </div>
            
            <h1 className="text-[80px] md:text-[140px] lg:text-[180px] font-black uppercase italic leading-none tracking-[-8px] mb-12">
              FITNESS <span className="text-[rgb(222,255,95)]">77</span>
            </h1>

            {/* VIDEO DO HERA - TADY TO JE! (SMRK) */}
            <div className="relative max-w-5xl mx-auto h-[300px] md:h-[500px] w-full overflow-hidden border border-zinc-800 shadow-[0_0_50px_rgba(222,255,95,0.15)] mb-16">
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src="/hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            <p className="text-2xl md:text-4xl text-zinc-300 max-w-3xl mx-auto italic mb-16 font-medium">Luxusní industriální prostředí pro maximální výkon</p>
            
            <motion.a href="#registrace" className="inline-flex items-center gap-6 bg-[rgb(222,255,95)] text-black px-16 py-8 font-black uppercase tracking-[3px] text-xl hover:bg-white transition-colors">
              VSTUP DO ELITY <IconArrowRight />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-32 bg-zinc-950 border-t border-zinc-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl font-black uppercase mb-20 italic">Služby & Bazar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {services.map((s, i) => (
              <div key={i} className="bg-zinc-900 p-10 border border-zinc-800 hover:border-[rgb(222,255,95)]/50 transition-all group">
                <div className="mb-6 text-5xl transition-transform group-hover:scale-110" style={{ color: s.color || 'rgb(222, 255, 95)' }}>{s.icon}</div>
                <h3 className="text-2xl font-bold mb-4 uppercase italic" style={{ color: s.color || 'white' }}>{s.title}</h3>
                <p className="text-zinc-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER - NEDOTKNUTELNÝ (SMRK) */}
      <footer className="bg-black border-t border-zinc-900 py-20">
        <div className="container mx-auto px-6 text-center text-zinc-500 text-sm">
          © 2026 Fitness 77 Performance Hub • Jirasova 1320, Mladá Boleslav
        </div>
      </footer>
    </div>
  );
}
