"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from "@/components/ui/Reveal";
import Image from 'next/image';
import Link from 'next/link';

export default function GymPage() {
  const [galleryFiles, setGalleryFiles] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Načtení všech fotek do pásu (smrk)
    const files = Array.from({ length: 40 }, (_, i) => `gym_photo_${i + 1}.jpg`);
    setGalleryFiles(files);
  }, []);

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white selection:bg-[#E10600] selection:text-white overflow-x-hidden relative scroll-smooth">
      
      {/* 1. HERO - Masivní 3D Typo na černém podkladu */}
      <section className="relative h-[45vh] flex flex-col justify-center px-6 border-b border-zinc-100/10 bg-black z-20">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter text-white"
                style={{ textShadow: '0 4px 4px rgba(0,0,0,0.8), 0 8px 10px rgba(0,0,0,0.6)' }}>
              FITNESS<span className="text-[#E10600]" style={{ textShadow: '0 4px 10px rgba(225,6,0,0.5)' }}>77</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-4 gap-6">
               <div className="flex flex-col gap-6 relative z-20">
                 <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-500 italic">RAW_HERITAGE // MB</p>
                 <div className="flex gap-8 border-l-4 border-[#E10600] pl-5 shadow-[0_0_30px_rgba(225,6,0,0.2)] bg-black/50 backdrop-blur-sm p-4 relative">
                    <div className="absolute inset-y-0 -left-1 w-1 bg-[#E10600] shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
                    <div>
                       <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">PO - PÁ</p>
                       <p className="text-2xl font-black italic text-white">06:00 - 22:00</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">SO - NE</p>
                       <p className="text-2xl font-black italic text-white">08:00 - 20:00</p>
                    </div>
                 </div>
               </div>
               <h2 className="text-[8vw] font-black uppercase italic leading-[0.75] tracking-tighter relative z-10"
                   style={{ WebkitTextStroke: '1px #E10600', color: 'transparent', textShadow: '0 0 15px rgba(225,6,0,0.3)' }}>
                 HARDCORE
               </h2>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. MEZERA - 4 OBRÁZKY STATS */}
      <section className="bg-black py-10 px-4 border-b border-zinc-100/10 z-20 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "220 m²", d: "ROZLOHA FITKA", i: "/images/gym/gallery/gym_photo_1.jpg" },
            { t: "30 STROJŮ", d: "ZNAČKA VITA", i: "/images/gym/gallery/gym_photo_2.jpg" },
            { t: "NEJVĚTŠÍ", d: "V MLADÉ BOLESLAVI", i: "/images/gym/gallery/gym_photo_3.jpg" },
            { t: "TOP SLUŽBY", d: "HARDCORE PŘÍSTUP", i: "/images/gym/gallery/gym_photo_4.jpg" }
          ].map((item, idx) => (
            <div key={idx} className="relative h-64 overflow-hidden group border border-white/10">
              <Image src={item.i} alt={item.t} fill className="object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <p className="text-3xl font-black italic text-[#E10600] tracking-tighter">{item.t}</p>
                <p className="text-[10px] font-bold text-white tracking-[0.3em] uppercase">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. THE CORE TRINITY */}
      <section className="relative py-32 px-4 z-10 bg-[#0A0A0A]">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          
          {/* HAMÁČEK */}
          <div className="flex flex-col group relative">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(225,6,0,0.2)] rounded-sm">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-1000" priority />
            </div>
            <div className="relative -mt-28 mx-4 lg:mx-8 bg-black/60 backdrop-blur-2xl p-8 border border-white/10 shadow-2xl z-20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E10600] to-transparent shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
              <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter">Hamáček</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6 border-l-2 border-[#E10600] pl-3 italic">Zakladatel // Head Coach</p>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed italic">Nekompromisní přístup, naturální cesta. Hamáček je tvůj průvodce peklem, ze kterého vyjdeš jako nová verze sebe sama.</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all">REZERVOVAT</Link>
            </div>
          </div>

          {/* STŘED: MANIFEST + PERMICE */}
          <div className="flex flex-col gap-12 lg:mt-10 text-center">
            <div className="relative bg-black/40 backdrop-blur-xl p-10 border border-white/5 shadow-2xl text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#E10600]"></div>
              <h3 className="text-2xl font-black uppercase italic text-white mb-6 tracking-[0.2em]">NAŠE FILOZOFIE</h3>
              <p className="text-lg text-white font-bold leading-relaxed mb-6 italic">Naše fitness má rozlohu 220 m², najdete zde 30 posilovacích strojů české značky VITA a profesionální kardio-zónu.</p>
              <p className="text-sm text-zinc-400 leading-relaxed italic">V našem fitness dbáme na to, aby se u nás klienti cítili co nejlépe a bylo o ně dobře postaráno. Tady se netrénuje pro fotky, tady se dře pro výsledky. (smrk)</p>
            </div>

            <div className="flex flex-col group relative lg:mt-12 text-left">
              <div className="bg-black/10 backdrop-blur-md h-32 flex items-center justify-center border-t-2 border-[#E10600]">
                 <span className="text-5xl font-black italic opacity-20 uppercase tracking-[0.3em] text-white">Membership</span>
              </div>
              <div className="relative -mt-10 mx-2 bg-black/60 backdrop-blur-3xl p-8 text-white border border-white/10 shadow-2xl z-20 transition-all duration-500 group-hover:translate-y-[-10px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E10600] to-transparent"></div>
                <h3 className="text-3xl font-black uppercase italic mb-6">Vstupy</h3>
                <div className="space-y-1 mb-10">
                  {[{ name: 'RAW_ENTRY', price: '180', label: 'JEDNORÁZ' }, { name: 'WARRIOR_30', price: '1290', label: 'MĚSÍČNÍ' }, { name: 'ELITE_365', price: '10900', label: 'ROČNÍ' }].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-5 border-b border-white/5 hover:bg-white/5 transition-all px-2">
                      <div><h4 className="font-black italic text-xl">{item.name}</h4><p className="text-[9px] text-zinc-500 font-bold">{item.label}</p></div>
                      <span className="text-2xl font-black italic">{item.price} CZK</span>
                    </div>
                  ))}
                </div>
                <Link href="/shop" className="block w-full text-center py-5 bg-white text-black text-xs font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all">KOUPIT ONLINE →</Link>
              </div>
            </div>
          </div>

          {/* SOUSTRUŽNÍK */}
          <div className="flex flex-col group relative text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(225,6,0,0.2)] rounded-sm">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-1000" priority />
            </div>
            <div className="relative -mt-28 mx-4 lg:mx-8 bg-black/60 backdrop-blur-2xl p-8 border border-white/10 shadow-2xl z-20 flex flex-col items-end">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-[#E10600] to-transparent shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
              <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter">Soustružník</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2 tracking-widest border-r-2 border-[#E10600] pr-3 italic">ELITNÍ KOUČ // PRO UNIT</p>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed italic text-right">Specialista na techniku a svalovou hypertrofii. Pokud chceš růst, musíš poslouchat mistra soustruhu.</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all">REZERVOVAT</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALERIE - PÁS (smrk) */}
      <section className="py-24 bg-black relative z-10 border-t border-white/5">
         <div className="max-w-[1400px] mx-auto px-4 mb-10">
            <h2 className="text-4xl font-black uppercase italic text-white tracking-tighter">Galerie</h2>
         </div>
         <div className="flex gap-2 overflow-x-auto pb-10 px-4 scrollbar-hide no-scrollbar">
            {galleryFiles.map((file, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05 }}
                className="relative min-w-[300px] aspect-[4/3] overflow-hidden bg-zinc-900 cursor-pointer border border-white/5 group"
                onClick={() => setSelectedImage(`/images/gym/gallery/${file}`)}
              >
                <Image 
                  src={`/images/gym/gallery/${file}`} 
                  alt="Vault" 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
              </motion.div>
            ))}
         </div>
      </section>

      {/* SOVEREIGN ZOOM MODAL (smrk) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center p-8 cursor-zoom-out" 
            onClick={() => setSelectedImage(null)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full h-full max-w-6xl">
              <Image src={selectedImage} alt="Zoom" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
