"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

/**
 * FITNESS 77 - BRUTALIST DENSE EDITION (FINAL 300% MEGA-GRID + STATS)
 * Architekt: Jan Lančarič (Senior E-commerce Brain)
 */

// --- IKONY ---
const IconArrowRight = () => <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconDumbbell = () => <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M3 10v4m18-4v4M8.5 2v20M15.5 2v20"/></svg>;
const IconUsers = () => <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

// --- MAGNETICKÉ TLAČÍTKO ---
const MagneticButton = ({ children, className, href }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

export default function GymPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Parallax pro Hero
  const { scrollYProgress: heroScroll } = useScroll();
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  // Horizontal Scroll pro Galerii
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: galleryScroll } = useScroll({ target: targetRef });
  const xTransform = useTransform(galleryScroll, [0, 1], ["1%", "-65%"]);

  const springConfig = { stiffness: 140, damping: 28 };
  const mouseX = useSpring(mousePos.x, springConfig);
  const mouseY = useSpring(mousePos.y, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // TVOJE 4 TOP STATS (Změň si cesty k fotkám podle sebe, dal jsem ti tam placeholders 1-4.jpg)
  const statsBlocks = [
    { title: "220 m²", desc: "Čisté dřiny", img: "/image/gym/gallery/1.jpg" },
    { title: "30+", desc: "Strojů v arzenálu", img: "/image/gym/gallery/2.jpg" },
    { title: "TOP v MB", desc: "Nejlepší vybavení", img: "/image/gym/gallery/3.jpg" },
    { title: "24/7", desc: "Otevírací doba", img: "/image/gym/gallery/4.jpg" }
  ];

  const services = [
    { title: "Silový trénink", desc: "Hammer Strength", icon: <IconDumbbell /> },
    { title: "Osobní trénink", desc: "Individuální plány", icon: <IconUsers /> },
    { title: "Powerlifting", desc: "Soutěžní příprava", icon: <IconDumbbell /> },
    { title: "Hypertrofie", desc: "Objemový trénink", icon: <IconDumbbell /> },
    { title: "Kondiční", desc: "Funkční & kardio", icon: <IconDumbbell /> },
    { title: "Mobility", desc: "Core & stabilizace", icon: <IconDumbbell /> },
    { title: "Regenerace", desc: "Sauna, masáže", icon: <IconDumbbell /> },
    { title: "Soutěže", desc: "Komplexní příprava", icon: <IconDumbbell /> },
  ];

  const trainers = [
    {
      name: "Hlaváček",
      role: "Powerlifting",
      img: "/image/trainers/old_web-1.jpg",
      bio: "Soutěžil na národní úrovni, maximální síla."
    },
    {
      name: "Soustružník",
      role: "Silový trénink",
      img: "/image/trainers/old_web-2.jpg",
      bio: "Specialista na funkční trénink a hypertrofii."
    },
  ];

  const galleryImages = [
    { id: 1, src: "/image/gym/gallery/1.jpg", alt: "Silová zóna" },
    { id: 2, src: "/image/gym/gallery/2.jpg", alt: "Hammer Strength" },
    { id: 3, src: "/image/gym/gallery/3.jpg", alt: "Deadlift zóna" },
    { id: 4, src: "/image/gym/gallery/4.jpg", alt: "Volné váhy" },
    { id: 5, src: "/image/gym/gallery/5.jpg", alt: "Kardio" },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden font-sans selection:bg-[rgb(222,255,95)] selection:text-black">
      <style jsx global>{`
        .acid-glow { text-shadow: 0 0 30px rgb(222 255 95 / 0.9), 0 0 60px rgb(222 255 95 / 0.5); }
        .hide-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 bg-[rgb(222,255,95)] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{ left: mouseX, top: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: selectedImage !== null ? 0 : 1 }}
      />

      {/* HERO SECTION */}
      <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 w-full h-full z-[0]">
          <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover opacity-50">
            <source src="/image/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center pt-20 relative">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 inline-flex items-center gap-3 px-8 py-3 border border-[rgb(222,255,95)]/50 rounded-full backdrop-blur-md bg-black/40"
          >
            <span className="text-xs font-black tracking-[5px] text-[rgb(222,255,95)] acid-glow">JIRASOVA 1320 • MLADÁ BOLESLAV</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {trainers.map((trainer, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="group relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[rgb(222,255,95)] acid-glow">
                <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent" />
                <div className="absolute bottom-1 left-0 right-0 text-center">
                    <span className="bg-[rgb(222,255,95)]/80 text-black text-[10px] md:text-xs font-black uppercase px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {trainer.name}
                    </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[100px] md:text-[180px] lg:text-[260px] font-black uppercase italic leading-[0.75] tracking-[-10px] drop-shadow-2xl"
          >
            FITNESS <span className="text-[rgb(222,255,95)] block md:inline">77</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="mt-8 text-xl md:text-2xl text-zinc-300 font-bold uppercase tracking-widest drop-shadow-lg">
             Absolutní výkon.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }} className="mt-12 flex flex-col sm:flex-row items-center gap-4 relative z-10">
            <MagneticButton href="#registrace" className="inline-flex items-center justify-center gap-4 bg-[rgb(222,255,95)] text-black px-10 py-5 rounded-full font-black uppercase tracking-[3px] text-base md:text-lg hover:bg-white transition-all duration-300 hover:shadow-[0_0_50px_rgba(222,255,95,0.8)] cursor-none w-full sm:w-auto">
              VSTUP DO ELITY <IconArrowRight />
            </MagneticButton>
            <MagneticButton href="/" className="inline-flex items-center justify-center gap-4 bg-transparent border-2 border-[rgb(222,255,95)] text-[rgb(222,255,95)] px-10 py-5 rounded-full font-black uppercase tracking-[3px] text-base md:text-lg hover:bg-[rgb(222,255,95)] hover:text-black transition-all duration-300 cursor-none w-full sm:w-auto">
              DO E-SHOPU
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[rgb(222,255,95)] text-black py-3 font-black uppercase italic overflow-hidden relative z-20 -rotate-1 scale-105 shadow-2xl -mt-12">
        <motion.div className="flex gap-8 text-2xl whitespace-nowrap" animate={{ x: [0, -2000] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          HAMMER STRENGTH ELITE • NO EXCUSES • RESULTS ONLY • HLAVÁČEK & SOUSTRUŽNÍK • FITNESS 77 • HAMMER STRENGTH ELITE • NO EXCUSES • RESULTS ONLY
        </motion.div>
      </div>

      {/* TY TVOJE 4 TOP FOTKY SE STATISTIKAMA (Přidaný blok) */}
      <section className="pt-16 pb-4 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsBlocks.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative h-[250px] md:h-[350px] rounded-3xl overflow-hidden group border border-zinc-800 hover:border-[rgb(222,255,95)] transition-all cursor-none"
              >
                <img src={stat.img} alt={stat.title} className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-[rgb(222,255,95)] drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">{stat.title}</h3>
                  <p className="text-white font-bold uppercase tracking-widest mt-3 text-xs md:text-sm drop-shadow-md">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SLUŽBY - ARZENÁL */}
      <section className="py-8 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white">Arzenál</h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group relative bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:bg-zinc-800 hover:border-[rgb(222,255,95)] transition-all overflow-hidden"
              >
                <div className="text-[rgb(222,255,95)] mb-4 transform origin-left group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-lg md:text-xl font-black mb-1 uppercase tracking-tight">{service.title}</h3>
                <p className="text-xs md:text-sm text-zinc-400 font-medium leading-tight">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MEGA-GRID: TRENÉŘI + CENÍK + REGISTRACE VEDLE SEBE */}
      <section id="registrace" className="py-12 bg-black relative z-10 border-t border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            
            {/* 1. SLOUPEC: ELITE TÝM */}
            <div className="space-y-4 flex flex-col">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2">Elite <span className="text-[rgb(222,255,95)]">Tým</span></h2>
              <div className="flex flex-col gap-4 flex-1">
                {trainers.map((trainer, i) => (
                  <TrainerCard key={i} trainer={trainer} index={i} />
                ))}
              </div>
            </div>

            {/* 2. SLOUPEC: CENÍK */}
            <div className="space-y-4 flex flex-col">
               <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2 text-zinc-800 font-bold tracking-widest">Ceník</h2>
               
               <div className="flex flex-col gap-4 flex-1">
                 {/* Elite Ceník */}
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-zinc-900 p-6 rounded-2xl border-2 border-[rgb(222,255,95)] relative overflow-hidden flex-1 flex flex-col justify-center">
                   <div className="absolute top-0 right-0 bg-[rgb(222,255,95)] text-black text-[10px] font-black tracking-widest px-3 py-1 rounded-bl-xl">NEJPOPULÁRNĚJŠÍ</div>
                   <div className="text-xs font-black tracking-[3px] text-[rgb(222,255,95)] mb-2 mt-2 font-bold uppercase tracking-widest">ELITE ČLENSTVÍ</div>
                   <div className="text-4xl font-black text-white mb-4 font-bold uppercase tracking-tighter leading-none">1 490 <span className="text-lg text-zinc-500 font-bold uppercase tracking-tighter leading-none">Kč</span></div>
                   <ul className="space-y-2 text-xs text-zinc-200 font-bold mb-4">
                     <li className="flex items-center gap-2"><div className="text-[rgb(222,255,95)] scale-75"><IconCheck /></div> 24/7 přístup & 4x osobní trénink</li>
                     <li className="flex items-center gap-2"><div className="text-[rgb(222,255,95)] scale-75"><IconCheck /></div> Prioritní přístup a šatny</li>
                   </ul>
                 </motion.div>

                 {/* Základ a Power vedle sebe pod Elite */}
                 <div className="grid grid-cols-2 gap-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center text-center">
                      <div className="text-[10px] font-black tracking-widest text-zinc-500 mb-1 font-bold uppercase tracking-widest">ZÁKLAD</div>
                      <div className="text-2xl font-black mb-2 font-bold uppercase tracking-tighter leading-none">890 <span className="text-xs text-zinc-500">Kč</span></div>
                      <span className="text-[10px] text-zinc-400 font-medium">24/7 přístup</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center text-center">
                      <div className="text-[10px] font-black tracking-widest text-zinc-500 mb-1 font-bold uppercase tracking-widest">POWER</div>
                      <div className="text-2xl font-black mb-2 font-bold uppercase tracking-tighter leading-none">2 290 <span className="text-xs text-zinc-500">Kč</span></div>
                      <span className="text-[10px] text-zinc-400 font-medium">8x trénink</span>
                    </motion.div>
                 </div>
               </div>
            </div>

            {/* 3. SLOUPEC: REGISTRACE */}
            <div className="space-y-4 flex flex-col">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2 text-zinc-800 font-bold tracking-widest">Vstup</h2>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex-1 flex flex-col justify-center">
                <form className="space-y-4">
                  <input type="text" placeholder="Jméno a příjmení" className="w-full bg-black border border-zinc-700 focus:border-[rgb(222,255,95)] px-5 py-4 text-xs font-bold uppercase tracking-widest outline-none rounded-xl text-white transition-colors" />
                  <input type="email" placeholder="E-mail" className="w-full bg-black border border-zinc-700 focus:border-[rgb(222,255,95)] px-5 py-4 text-xs font-bold uppercase tracking-widest outline-none rounded-xl text-white transition-colors" />
                  <input type="tel" placeholder="Telefon" className="w-full bg-black border border-zinc-700 focus:border-[rgb(222,255,95)] px-5 py-4 text-xs font-bold uppercase tracking-widest outline-none rounded-xl text-white transition-colors" />
                  <button type="button" className="w-full bg-[rgb(222,255,95)] text-black py-4 mt-2 rounded-xl font-black uppercase text-sm hover:bg-white transition-colors cursor-none tracking-widest">
                    ODESLAT REGISTRACI
                  </button>
                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL GALERIE - ODSTŘELENÁ ÚPLNĚ DOLŮ */}
      <section ref={targetRef} className="relative h-[200vh] bg-zinc-950 border-t border-zinc-900">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-12">
          <div className="px-4 mb-8 z-10">
             <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">Chrám Železa</h2>
          </div>
          
          <motion.div style={{ x: xTransform }} className="flex gap-4 px-4 relative z-20">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 0.98 }}
                onClick={() => setSelectedImage(i)}
                className="relative w-[75vw] md:w-[35vw] h-[50vh] shrink-0 rounded-2xl overflow-hidden cursor-none group shadow-xl"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-[rgb(222,255,95)] text-black px-4 py-2 rounded-full font-black uppercase text-sm">Zvětšit</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black pt-12 pb-8 border-t border-zinc-900">
        <div className="container mx-auto px-4 flex flex-col items-center">
           <h2 className="text-[60px] md:text-[100px] font-black uppercase italic tracking-tighter text-zinc-900 mb-6 text-center leading-none">FITNESS 77</h2>
           <div className="text-center text-zinc-600 font-bold tracking-widest uppercase text-xs">
            © 2026 Master Architect: Jan Lančarič
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-[99999] flex items-center justify-center p-4 cursor-none"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 3D Trainer Card - Zmenšená verze pro Mega-Grid
const TrainerCard = ({ trainer, index }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 30;
    const rotateY = (rect.width / 2 - x) / 30;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-[rgb(222,255,95)] transition-all overflow-hidden cursor-none shadow-xl flex items-center p-4 gap-4"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
    >
      <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-zinc-700 group-hover:border-[rgb(222,255,95)] transition-colors">
        <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-black text-white font-bold uppercase tracking-tighter leading-none mb-1">{trainer.name}</h3>
        <p className="text-[rgb(222,255,95)] font-bold tracking-widest uppercase text-[10px] mb-2">{trainer.role}</p>
        <p className="text-zinc-400 text-xs font-medium leading-snug">{trainer.bio}</p>
      </div>
    </motion.div>
  );
};
