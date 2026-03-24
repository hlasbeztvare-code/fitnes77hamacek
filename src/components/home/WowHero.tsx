'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0 },
};

export default function WowHero() {
  const heroProdRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = heroProdRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -5;
      const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 5;
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      el.style.transition = 'transform 0.08s ease-out';
    };

    const handleLeave = () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.4s ease-out';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section className="hero" aria-label="Hlavní banner">
      <div className="hero-grid"></div>
      <div className="hero-particles"></div>
      <div className="hero-dg-ghost"></div>
      <div className="hero-dg-line"></div>
      <div className="hero-dg"></div>

      <div className="hero-layout">
        {/* LEFT */}
        <div className="hero-left">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5 }}
            className="hero-bdg"
          >
            <span>🏆 #1 SUPLEMENTY V ČESKÉ REPUBLICE</span>
          </motion.div>

          <div className="hero-title">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, delay: 0.12 }}
              className="hero-title-main"
            >
              PŘEKONÁVEJ
            </motion.span>
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, delay: 0.24 }}
              className="hero-title-sub"
            >
              SVÉ
            </motion.span>
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, delay: 0.36 }}
              className="hero-title-outline"
            >
              LIMITY
            </motion.span>
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.48 }}
            className="hero-description"
          >
            PRÉMIOVÉ SUPLEMENTY A VYBAVENÍ PRO SPARTÁNSKÉ VÁLEČNÍKY. LABORATORNĚ TESTOVÁNO. BRUTÁLNÍ VÝSLEDKY.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hero-actions"
          >
            <Link href="/supplements" className="hero-btn hero-btn-primary">
              <span>🛒 NAKUPOVAT</span>
            </Link>
            <Link href="/cart" className="hero-btn hero-btn-secondary">
              <span>🔥 AKCE −30%</span>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.75 }}
            className="hero-stats-row"
          >
            <div className="hero-stat">
              <div className="hero-stat-number">5000+</div>
              <div className="hero-stat-label">spokojených zákazníků</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">150+</div>
              <div className="hero-stat-label">produktů v nabídce</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">4.9/5</div>
              <div className="hero-stat-label">pozitivních recenzí</div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <div className="hero-product-zone">
            <motion.div
              className="hero-product-glow"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            />
            <div className="hero-product-floor"></div>
            <div className="hero-product-shadow"></div>

            <motion.div
              className="hero-badge-rail hero-badge-1"
              variants={fadeRight}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.45, delay: 1.0 }}
            >
              <span>🔬</span> LAB TESTED <strong>100%</strong>
            </motion.div>

            <motion.div
              className="hero-badge-rail hero-badge-2"
              variants={fadeRight}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.45, delay: 1.1 }}
            >
              <span>🏆</span> BESTSELLER <strong>#1</strong>
            </motion.div>

            <motion.div
              className="hero-badge-rail hero-badge-3"
              variants={fadeRight}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.45, delay: 1.2 }}
            >
              <span>⭐</span> RATING <strong>4.9/5</strong>
            </motion.div>

            <motion.div
              className="hero-product"
              ref={heroProdRef}
              initial={{ opacity: 0, y: 28, x: 40, scale: 0.9, rotate: -4 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
              transition={{ duration: 0.85, delay: 0.68 }}
            >
              <div className="hero-product-shine"></div>
              <div className="hero-product-drops"></div>
              <img src="/images/products/wheyboruvka.png" alt="Whey Protein Borůvka" />
            </motion.div>

            <motion.button
              className="hero-product-cta"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.45, delay: 1.28 }}
            >
              <span>⚡ PŘIDAT DO KOŠÍKU</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
