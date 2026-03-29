"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function GymPage() {
  const [galleryFiles, setGalleryFiles] = useState<string[]>([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const files = Array.from({ length: 40 }, (_, i) => `gym_photo_${i + 1}.jpg`);
    setGalleryFiles(files);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden">

      {/* SCROLL PROGRESS */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 to-red-400 origin-left z-50"
      />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center px-6">
        <div className="absolute inset-0 bg-[url('/images/textures/beton_hardcore.jpg')] bg-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-black" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative z-10 max-w-6xl"
        >
          <h1 className="text-[15vw] md:text-[7vw] font-black leading-[0.85] tracking-tight">
            FITNESS<span className="text-red-600">77</span>
          </h1>

          <p className="mt-6 text-zinc-400 max-w-md text-lg">
            Luxusní prostředí. Maximální výkon. Žádné kompromisy.
          </p>

          <div className="flex gap-4 mt-10">
            <Link
              href="/kontakt"
              className="px-10 py-4 bg-red-600 hover:bg-red-700 transition font-semibold tracking-wide shadow-[0_0_30px_rgba(255,0,0,0.3)]"
            >
              ZAČÍT TRÉNINK
            </Link>

            <Link
              href="#cenik"
              className="px-10 py-4 border border-white/20 hover:border-white transition"
            >
              CENÍK
            </Link>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {["220 M²", "30+ STROJŮ", "TOP V MĚSTĚ", "ELITE ZÁZEMÍ"].map((t, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-105 transition"
          >
            <p className="text-2xl font-bold text-red-600">{t}</p>
          </motion.div>
        ))}
      </section>

      {/* TRENERS */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

        {["HAMÁČEK", "SOUSTRUŽNÍK"].map((name, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative h-[420px] overflow-hidden">
              <Image
                src={`/images/trainers/old_web_${i + 1}.jpg`}
                alt={name}
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute top-4 left-4 bg-red-600 text-xs px-3 py-1 tracking-wide">
                ELITE COACH
              </div>
            </div>

            <div className="bg-black/80 backdrop-blur-xl p-6 border border-white/10">
              <h3 className="text-3xl font-bold">{name}</h3>
              <p className="text-zinc-400 text-sm mt-1">Profesionální trenér</p>

              <Link
                href="/kontakt"
                className="block mt-6 text-center py-3 bg-red-600 hover:bg-red-700"
              >
                REZERVOVAT
              </Link>
            </div>
          </motion.div>
        ))}

        {/* SERVICES */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl p-8 border border-white/10"
        >
          <h3 className="text-xl font-semibold mb-6 text-red-600">SLUŽBY</h3>

          <div className="space-y-3 text-sm">
            {["OSOBNÍ TRENÉR","SILOVÝ TRÉNINK","KONDIČNÍ TRÉNINK","PLÁNY NA MÍRU","REGENERACE"].map((s, i) => (
              <div key={i} className="border border-white/10 p-3 hover:border-red-600 transition">
                {s}
              </div>
            ))}
          </div>
        </motion.div>

      </section>

      {/* PRICING */}
      <section id="cenik" className="py-24 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          { n: 'JEDNORÁZ', p: '160' },
          { n: 'MĚSÍČNÍ', p: '1490', best: true },
          { n: 'ROČNÍ', p: '12990' }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.06 }}
            className={`p-10 text-center backdrop-blur-xl ${item.best ? 'border border-red-600 bg-black' : 'border border-white/10 bg-white/5'}`}
          >
            {item.best && (
              <p className="text-red-600 text-xs mb-3 tracking-widest">NEJOBLÍBENĚJŠÍ</p>
            )}

            <h4 className="text-lg mb-2">{item.n}</h4>
            <p className="text-4xl font-black text-red-600">{item.p} Kč</p>

            <Link
              href="/kontakt"
              className="block mt-8 py-3 bg-red-600 hover:bg-red-700"
            >
              ZAČÍT
            </Link>
          </motion.div>
        ))}
      </section>

      {/* STICKY CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/kontakt"
          className="px-6 py-4 bg-red-600 hover:bg-red-700 shadow-2xl"
        >
          ZAČÍT
        </Link>
      </div>

      {/* GALLERY */}
      <section className="py-24">
        <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar">
          {galleryFiles.map((file, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="min-w-[320px] h-[220px] relative overflow-hidden"
            >
              <Image
                src={`/images/gym/gallery/${file}`}
                alt="gym"
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}
