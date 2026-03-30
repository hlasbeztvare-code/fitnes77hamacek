"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

/**
 * FITNESS 77 - PERFORMANCE HUB 2026 - FINAL VERSION
 * Full-color, hero.mp4, Trainers, Pricing, Gallery, Untouchable Footer
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
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group bg-zinc-900 border border-zinc-800 hover:border-[rgb(222,255,95)]/60 transition-all duration-500 overflow-hidden rounded-3xl cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative overflow-hidden">
        <img src={trainer.img} alt={trainer.name} className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>
      <div className="p-10 text-left">
        <h3 className="text-4xl font-bold text-white">{trainer.name}</h3>
        <p className="text-[rgb(222,255,95)] mt-1 mb-6 font-bold uppercase tracking-wider">{trainer.role}</p>
        <p className="text-zinc-400 leading-relaxed">{trainer.bio}</p>
      </div>
    </motion.div>
  );
};

export default function GymPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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

  const trainers = [
    { name: "Hlaváček", role: "Hlavní trenér & Powerlifting", img: "https://picsum.photos/id/64/600/800", bio: "Zkušený powerlifter s mnohaletou praxí. Soutěžil na národní úrovni, zaměřuje se na techniku a soutěžní přípravu." },
    { name: "Soustružník", role: "Trenér síly & kondice", img: "https://picsum.photos/id/1005/600/800", bio: "Specialista na funkční silový trénink a hypertrofii. Má za sebou mnoho let praxe s klienty." },
  ];

  const galleryImages = [
    { src: "https://picsum.photos/id/1015/800/600", alt: "Gym 1" },
    { src: "https://picsum.photos/id/201/800/600", alt: "Gym 2" },
    { src: "https://picsum.photos/id/301/800/600", alt: "Gym 3" },
    { src: "https://picsum.photos/id/401/800/600", alt: "Gym 4" },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden font-sans selection:bg-[rgb(222,255,95)] selection:text-black">
      <style jsx global>{`
        .acid-glow { text-shadow: 0 0 40px rgb(222 255 95 / 0.9), 0 0 90px rgb(222 255 95 / 0.5); }
      `}</style>

      {/* HERO SECTION WITH VIDEO.MP4 (300% FOCUS) */}
      <section className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.3]">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <div className="mb-8 inline-flex items-center gap-3 px-8 py-3 border border-[rgb(222,255,95)]/40 rounded-full bg-black/30 backdrop-blur-md">
              <span className="text-xs font-black tracking-[5px] text-[rgb(222,255,95)] acid-glow uppercase">JIRASOVA 1320 • MLADÁ BOLESLAV</span>
            </div>
            <h1 className="text-[90px] md:text-[150px] lg:text-[200px] font-black uppercase italic leading-none tracking-[-8px]">
              FITNESS <span className="text-[rgb(222,255,95)] acid-glow">77</span>
            </h1>
            <p className="mt-8 text-2xl md:text-4xl text-zinc-300 max-w-3xl mx-auto italic font-medium leading-tight">Luxusní industriální prostředí pro maximální výkon</p>
            <motion.a 
               href="#registrace" 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="mt-16 inline-flex items-center gap-6 bg-[rgb(222,255,95)] text-black px-16 py-8 font-black uppercase tracking-[3px] text-xl transition-colors hover:bg-white shadow-[0_0_30px_rgba(222,255,95,0.3)]"
            >
              VSTUP DO ELITY <IconArrowRight />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* SERVICES - 300% COLOR & STYLE */}
      <section className="py-32 bg-zinc-950 relative z-10 border-y border-zinc-900">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl font-black uppercase text-center mb-20 italic">Služby & Bazar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="bg-zinc-900 p-10 border border-zinc-800 hover:border-[rgb(222,255,95)]/50 transition-all group">
                <div className="mb-8 text-6xl transition-transform group-hover:scale-110" style={{ color: service.color || 'rgb(222,255,95)' }}>{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 uppercase italic" style={{ color: service.color || 'white' }}>{service.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="py-32 bg-black relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl font-black uppercase text-center mb-20 italic">Elite tým</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {trainers.map((trainer, i) => (
              <TrainerCard key={i} trainer={trainer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="cenik" className="py-32 bg-zinc-950 relative z-10 border-t border-zinc-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl font-black uppercase mb-20 italic">Ceník Členství</h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            <div className="bg-zinc-900 p-12 border border-zinc-800">
              <div className="text-zinc-500 font-black tracking-widest">ZÁKLAD</div>
              <div className="text-7xl font-black my-8 text-white">890 Kč</div>
              <div className="text-xl mb-10 text-zinc-400 italic font-bold">měsíční vstup</div>
              <ul className="space-y-6 text-left text-zinc-300">
                <li className="flex items-center gap-4"><IconCheck /> 24/7 nonstop přístup</li>
                <li className="flex items-center gap-4"><IconCheck /> Šatny a sprchy</li>
              </ul>
            </div>
            <div className="bg-zinc-900 border-2 border-[rgb(222,255,95)] p-12 relative shadow-[0_0_50px_rgba(222,255,95,0.1)] scale-105">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[rgb(222,255,95)] text-black text-xs font-black px-8 py-2 rounded-full uppercase tracking-tighter">Nejpopulárnější</div>
              <div className="text-[rgb(222,255,95)] font-black tracking-widest">ELITE</div>
              <div className="text-7xl font-black my-8 text-white">1 490 Kč</div>
              <div className="text-xl mb-10 text-[rgb(222,255,95)] italic font-bold">měsíční členství</div>
              <ul className="space-y-6 text-left text-white">
                <li className="flex items-center gap-4 font-bold"><IconCheck /> Vše ze Základu</li>
                <li className="flex items-center gap-4 font-bold"><IconCheck /> 4x osobní trénink</li>
                <li className="flex items-center gap-4 font-bold"><IconCheck /> Prioritní servis</li>
              </ul>
            </div>
            <div className="bg-zinc-900 p-12 border border-zinc-800">
              <div className="text-zinc-500 font-black tracking-widest">POWER</div>
              <div className="text-7xl font-black my-8 text-white">2 290 Kč</div>
              <div className="text-xl mb-10 text-zinc-400 italic font-bold">měsíční členství</div>
              <ul className="space-y-6 text-left text-zinc-300">
                <li className="flex items-center gap-4"><IconCheck /> Vše ze Elite</li>
                <li className="flex items-center gap-4"><IconCheck /> 8x osobní trénink</li>
                <li className="flex items-center gap-4"><IconCheck /> Soutěžní příprava</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - TVŮJ PŮVODNÍ NEDOTKNUTELNEJ (SMRK) */}
      <footer className="bg-black border-t border-zinc-900 py-24 relative z-10">
        <div className="container mx-auto px-6 text-center text-zinc-500 text-sm font-medium tracking-wide">
          © 2026 Fitness 77 Performance Hub • Jirasova 1320, Mladá Boleslav
        </div>
      </footer>
    </div>
  );
}
