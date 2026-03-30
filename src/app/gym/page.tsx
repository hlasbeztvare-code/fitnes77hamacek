"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

/**
 * FITNESS 77 - PLNÁ VERZE 2026
 * 8 služeb + Hlaváček & Soustružník s 3D kartami
 */

// --- IKONY ---
const IconArrowRight = () => <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconDumbbell = () => <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M3 10v4m18-4v4M8.5 2v20M15.5 2v20"/></svg>;
const IconUsers = () => <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

export default function GymPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const springConfig = { stiffness: 140, damping: 28 };
  const mouseX = useSpring(mousePos.x, springConfig);
  const mouseY = useSpring(mousePos.y, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const services = [
    { title: "Silový trénink", desc: "Hammer Strength zóna + volné váhy", icon: <IconDumbbell /> },
    { title: "Osobní trénink", desc: "Individuální plány s Hlaváčkem a Soustružníkem", icon: <IconUsers /> },
    { title: "Powerlifting", desc: "Soutěžní příprava a technika", icon: <IconDumbbell /> },
    { title: "Hypertrofie", desc: "Objemový trénink a svalový růst", icon: <IconDumbbell /> },
    { title: "Kondiční trénink", desc: "Funkční trénink a kardio", icon: <IconDumbbell /> },
    { title: "Mobility & Core", desc: "Pohyblivost a stabilizace těla", icon: <IconDumbbell /> },
    { title: "Regenerace", desc: "Sauna, masáže, recovery programy", icon: <IconDumbbell /> },
    { title: "Soutěžní příprava", desc: "Komplexní příprava na závody", icon: <IconDumbbell /> },
  ];

  const trainers = [
    {
      name: "Hlaváček",
      role: "Hlavní trenér & Powerlifting specialista",
      img: "https://picsum.photos/id/64/600/600",
      bio: "Zkušený powerlifter s mnohaletou praxí. Soutěžil na národní úrovni, trénoval řadu úspěšných závodníků. Zaměřuje se na maximální sílu, techniku a soutěžní přípravu."
    },
    {
      name: "Soustružník",
      role: "Trenér silového tréninku & kondice",
      img: "https://picsum.photos/id/1005/600/600",
      bio: "Specialista na funkční silový trénink and hypertrofii. Má za sebou mnoho let praxe a pomohl desítkám klientů dosáhnout výrazných výsledků v síle i kondici."
    },
  ];

  const galleryImages = [
    { id: 1, src: "https://picsum.photos/id/1015/800/600", alt: "Silová zóna" },
    { id: 2, src: "https://picsum.photos/id/201/800/600", alt: "Trenér" },
    { id: 3, src: "https://picsum.photos/id/301/800/600", alt: "Deadlift" },
    { id: 4, src: "https://picsum.photos/id/401/800/600", alt: "Squat" },
  ];

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
          <img src={trainer.img} alt={trainer.name} className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>
        <div className="p-10">
          <h3 className="text-4xl font-bold">{trainer.name}</h3>
          <p className="text-[rgb(222,255,95)] mt-1 mb-6">{trainer.role}</p>
          <p className="text-zinc-400 leading-relaxed text-left">{trainer.bio}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-black text-white overflow-x-hidden font-sans">
      <style jsx global>{`
        .acid-glow { text-shadow: 0 0 40px rgb(222 255 95 / 0.9), 0 0 90px rgb(222 255 95 / 0.5); }
      `}</style>

      {/* VIDEO BG NA POZADÍ (300% FOCUS) */}
      <div className="fixed inset-0 w-full h-full z-0 opacity-40 pointer-events-none">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/gym-video.mp4" type="video/mp4" />
        </video>
      </div>

      <section className="relative min-h-screen flex items-center justify-center bg-transparent z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-black opacity-80" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}>
            <div className="mb-8 inline-flex items-center gap-3 px-8 py-3 border border-[rgb(222,255,95)]/30 rounded-3xl">
              <span className="text-xs font-black tracking-[5px] text-[rgb(222,255,95)] acid-glow uppercase">JIRASOVA 1320 • MLADÁ BOLESLAV</span>
            </div>
            <h1 className="text-[110px] md:text-[170px] lg:text-[210px] font-black uppercase italic leading-none tracking-[-8px]">
              FITNESS <span className="text-[rgb(222,255,95)]">77</span>
            </h1>
            <p className="mt-6 text-3xl text-zinc-300 max-w-2xl mx-auto italic">Luxusní industriální prostředí pro maximální výkon</p>
            <motion.a href="#registrace" className="mt-16 inline-flex items-center gap-6 bg-[rgb(222,255,95)] text-black px-20 py-8 font-black uppercase tracking-[3.5px] text-lg">VSTUP DO ELITY <IconArrowRight /></motion.a>
          </motion.div>
        </div>
      </section>

      {/* SEKCE SLUŽEB */}
      <section className="py-28 bg-zinc-950/90 z-10 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl font-black uppercase text-center mb-16 italic">Naše služby</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-zinc-900 p-8 border border-zinc-800 transition-all">
                <div className="text-[rgb(222,255,95)] mb-6 text-5xl">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 italic">{service.title}</h3>
                <p className="text-zinc-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEKCE TRENÉRŮ */}
      <section className="py-28 bg-black/90 z-10 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl font-black uppercase text-center mb-16 italic">Elite tým</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {trainers.map((trainer, i) => (
              <TrainerCard key={i} trainer={trainer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER (TVŮJ ORIGINÁL) */}
      <footer className="bg-black border-t border-zinc-900 py-20 z-10 relative">
        <div className="container mx-auto px-6 text-center text-zinc-500 text-sm">
          © 2026 Fitness 77 Performance Hub • Jirasova 1320, Mladá Boleslav
        </div>
      </footer>
    </div>
  );
}
