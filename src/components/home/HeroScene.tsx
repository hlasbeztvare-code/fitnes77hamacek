'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const trustItems = [
  'Doprava zdarma',
  'Praha / Atelier',
  'Skladem',
];

export default function HeroScene() {
  return (
    <section className="relative min-h-[94vh] overflow-hidden bg-[#f5f5f6]">
      {/* aggressive background structure */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,transparent_52%,rgba(225,6,0,0.05)_52%,rgba(225,6,0,0.05)_58%,transparent_58%,transparent_100%)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] [background-size:42px_42px]" />

      {/* red motion fields */}
      <motion.div
        className="absolute right-[8%] top-[10%] h-[380px] w-[380px] rounded-full bg-red-500/20 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[8%] right-[15%] h-[240px] w-[240px] rounded-full bg-red-500/12 blur-[90px]"
        animate={{ x: [0, 18, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto grid min-h-[94vh] w-[min(1320px,calc(100%-32px))] items-center gap-10 py-16 lg:grid-cols-[1fr_1fr]">
        {/* LEFT */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="inline-flex items-center gap-3 rounded-full border border-[#E10600]/20 bg-white/75 px-4 py-2 backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-[#E10600]" />
            <span className="text-xs font-black uppercase tracking-[0.28em] text-[#E10600]">
              American muscle standard
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="mt-8 max-w-5xl text-5xl font-black uppercase leading-[0.88] text-zinc-950 md:text-7xl xl:text-[98px]"
          >
            Agrese.
            <br />
            výkon.
            <br />
            výsledky.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl"
          >
            Fitness 77 je performance brand z Prahy. Suplementy, vybavení, trenéři a obsah postavené tak, aby návštěvník okamžitě cítil sílu značky.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/supplements"
              className="rounded-2xl bg-[#E10600] px-7 py-4 font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_50px_rgba(225,6,0,0.30)] transition hover:-translate-y-[2px] hover:brightness-110"
            >
              Nakupovat teď
            </Link>

            <Link
              href="/gym"
              className="rounded-2xl border border-zinc-300 bg-white/80 px-7 py-4 font-black uppercase tracking-[0.12em] text-zinc-900 backdrop-blur-sm transition hover:border-[#E10600] hover:text-[#E10600]"
            >
              Trenéři
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.6,
                },
              },
            }}
            className="mt-12 flex flex-wrap gap-3"
          >
            {trustItems.map((item) => (
              <motion.div
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-zinc-900 shadow-sm"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="relative flex min-h-[660px] items-center justify-center">
          {/* red energy */}
          <motion.div
            className="absolute h-[660px] w-[660px] rounded-full bg-[radial-gradient(circle,rgba(225,6,0,0.20),transparent_62%)] blur-[70px]"
            animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.72, 1, 0.72] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* slanted background card */}
          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.92 }}
            animate={{ opacity: 1, rotate: -8, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="absolute h-[82%] w-[68%] rounded-[38px] border border-zinc-200 bg-white/70 shadow-2xl backdrop-blur-md"
          />

          {/* logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.86, rotate: -4, y: 30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
            className="relative z-10"
          >
            <motion.img
              src="/images/brand/logo-fitness77.png"
              alt="Fitness 77"
              className="max-h-[760px] w-auto object-contain drop-shadow-[0_30px_70px_rgba(225,6,0,0.20)]"
              animate={{ y: [0, -10, 0], rotate: [-1, 1, -1], scale: [1, 1.025, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* accents */}
          <motion.div
            className="absolute right-[12%] top-[18%] h-5 w-5 rounded-full bg-[#E10600]"
            animate={{ y: [0, -16, 0], x: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[18%] left-[18%] h-3 w-3 rounded-full bg-zinc-900"
            animate={{ y: [0, 12, 0], x: [0, -8, 0], opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  );
}
