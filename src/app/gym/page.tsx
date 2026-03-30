"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

/**
 * FITNESS 77 - PERFORMANCE HUB 2026
 * Full Page: Hero with Video, Services, Trainers, Pricing, Gallery, Register
 */

const IconArrowRight = () => <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconDumbbell = () => <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M3 10v4m18-4v4M8.5 2v20M15.5 2v20"/></svg>;
const IconUsers = () => <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

// 3D Tilt Trainer Card
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

export default function GymPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
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
    { title: "BAZAR STROJŮ", desc: "Prodej a servis profi vybavení", icon: <IconDumbbell /> },
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
      bio: "Specialista na funkční silový trénink a hypertrofii. Má za sebou mnoho let praxe a pomohl desítkám klientů dosáhnout výrazných výsledků v síle i kondici."
    },
  ];

  const galleryImages = [
    { id: 1, src: "https://picsum.photos/id/1015/800/600", alt: "Silová zóna" },
    { id: 2, src: "https://picsum.photos/id/201/800/600", alt: "Trenér" },
    { id: 3, src: "https://picsum.photos/id/301/800/600", alt: "Deadlift" },
    { id: 4, src: "https://picsum.photos/id/401/800/600", alt: "Squat" },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden font-sans">
      <style jsx global>{`
        .acid-glow { text-shadow: 0 0 40px rgb(222 255 95 / 0.9), 0 0 90px rgb(222 255 95 / 0.5); }
      `}</style>

      {/* HERO SECTION WITH VIDEO */}
      <section className="relative min-h-screen flex items-center justify-center bg-transparent z-10 overflow-hidden">
        {/* VIDEO DO HERO - TADY TO PATŘÍ (SMRK) */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
            <source src="/gym-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-black opacity-90" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}>
            <div className="mb-8 inline-flex items-center gap-3 px-8 py-3 border border-[rgb(222,255,95)]/30 rounded-3xl">
              <span className="text-xs font-black tracking-[5px] text-[rgb(222,255,95)] acid-glow">JIRASOVA 1320 • MLADÁ BOLESLAV</span>
            </div>
            <h1 className="text-[110px] md:text-[170px] lg:text-[210px] font-black uppercase italic leading-none tracking-[-8px]">
              FITNESS <span className="text-[rgb(222,255,95)]">77</span>
            </h1>
            <p className="mt-6 text-3xl text-zinc-300 max-w-2xl mx-auto">Luxusní industriální prostředí pro maximální výkon</p>
            <motion.a href="#registrace" className="mt-16 inline-flex items-center gap-6 bg-[rgb(222,255,95)] hover:bg-white text-black px-20 py-8 font-black uppercase tracking-[3.5px] text-lg">VSTUP DO ELITY <IconArrowRight /></motion.a>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[rgb(222,255,95)] text-black py-6 font-black uppercase italic border-y border-black overflow-hidden relative z-10">
        <motion.div className="flex gap-16 text-xl whitespace-nowrap" animate={{ x: [0, -2400] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
          HAMMER STRENGTH ELITE • 30 INDUSTRIAL MACHINES • NO EXCUSES • RESULTS ONLY • HLAVÁČEK & SOUSTRUŽNÍK • FITNESS 77
        </motion.div>
      </div>

      {/* SERVICES */}
      <section className="py-28 bg-zinc-950 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl font-black uppercase text-center mb-16 italic">Naše služby</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-zinc-900 p-8 border border-zinc-800 hover:border-[rgb(222,255,95)]/50 transition-all group">
                <div className="text-[rgb(222,255,95)] mb-6 text-5xl group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-zinc-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="py-28 bg-black relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl font-black uppercase text-center mb-16 italic">Elite tým</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {trainers.map((trainer, i) => (
              <TrainerCard key={i} trainer={trainer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="cenik" className="py-28 bg-zinc-950 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl font-black uppercase text-center mb-16 italic">Ceník Členství</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-zinc-900 p-10 border border-zinc-800">
              <div className="text-sm font-black tracking-widest text-zinc-500">ZÁKLAD</div>
              <div className="text-6xl font-black my-6">890 Kč</div>
              <div className="text-xl mb-8">měsíční vstup</div>
              <ul className="space-y-4 text-zinc-400">
                <li className="flex items-center gap-3"><IconCheck /> 24/7 přístup</li>
                <li className="flex items-center gap-3"><IconCheck /> Šatny + sprchy</li>
              </ul>
            </div>
            <div className="bg-zinc-900 border-2 border-[rgb(222,255,95)] p-10 relative">
              <div className="absolute -top-3 right-8 bg-[rgb(222,255,95)] text-black text-xs font-black px-6 py-1 rounded-full">NEJPOPULÁRNĚJŠÍ</div>
              <div className="text-sm font-black tracking-widest text-[rgb(222,255,95)]">ELITE</div>
              <div className="text-6xl font-black my-6">1 490 Kč</div>
              <div className="text-xl mb-8">měsíční členství</div>
              <ul className="space-y-4 text-zinc-300">
                <li className="flex items-center gap-3"><IconCheck /> Vše ze Základu</li>
                <li className="flex items-center gap-3"><IconCheck /> 4x osobní trénink</li>
                <li className="flex items-center gap-3"><IconCheck /> Prioritní přístup</li>
              </ul>
            </div>
            <div className="bg-zinc-900 p-10 border border-zinc-800">
              <div className="text-sm font-black tracking-widest text-zinc-500">POWER</div>
              <div className="text-6xl font-black my-6">2 290 Kč</div>
              <div className="text-xl mb-8">měsíční členství</div>
              <ul className="space-y-4 text-zinc-400">
                <li className="flex items-center gap-3"><IconCheck /> Vše ze Elite</li>
                <li className="flex items-center gap-3"><IconCheck /> 8x osobní trénink</li>
                <li className="flex items-center gap-3"><IconCheck /> Soutěžní příprava</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-28 bg-black relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl font-black uppercase text-center mb-16 italic">Galerie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} onClick={() => setSelectedImage(i)} className="aspect-square bg-zinc-900 overflow-hidden cursor-pointer">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTER */}
      <section id="registrace" className="py-28 bg-zinc-950 relative z-10">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-6xl font-black uppercase text-center mb-12 italic">Zaregistruj se hned</h2>
          <div className="bg-black p-12 border border-zinc-800">
            <form className="space-y-8">
              <input type="text" placeholder="Jméno a příjmení" className="w-full bg-zinc-900 border border-zinc-700 focus:border-[rgb(222,255,95)] px-8 py-7 text-lg outline-none" />
              <input type="email" placeholder="E-mail" className="w-full bg-zinc-900 border border-zinc-700 focus:border-[rgb(222,255,95)] px-8 py-7 text-lg outline-none" />
              <input type="tel" placeholder="Telefon" className="w-full bg-zinc-900 border border-zinc-700 focus:border-[rgb(222,255,95)] px-8 py-7 text-lg outline-none" />
              <button type="button" className="w-full bg-[rgb(222,255,95)] text-black py-8 font-black uppercase tracking-[3px] text-xl hover:bg-white transition-colors">
                ODESLAT REGISTRACI
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-zinc-900 py-20 relative z-10">
        <div className="container mx-auto px-6 text-center text-zinc-500 text-sm">
          © 2026 Fitness 77 Performance Hub • Jirasova 1320, Mladá Boleslav
        </div>
      </footer>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 bg-black/95 z-[99999] flex items-center justify-center p-8">
            <img src={galleryImages[selectedImage].src} alt={galleryImages[selectedImage].alt} className="max-h-[90vh] max-w-[90vw] object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
