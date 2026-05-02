"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const FloatingPhotos = () => {
  const { scrollYProgress } = useScroll();

  // Před galerií (0.0 až 0.25)
  const x1 = useTransform(scrollYProgress, [0, 0.25], ['-40vw', '5vw']);
  const y1 = useTransform(scrollYProgress, [0, 0.25], ['5vh', '40vh']);
  const op1 = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.25], [0, 0.6, 0.6, 0]);

  const x2 = useTransform(scrollYProgress, [0, 0.25], ['100vw', '65vw']);
  const y2 = useTransform(scrollYProgress, [0, 0.25], ['15vh', '50vh']);
  const op2 = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.25], [0, 0.6, 0.6, 0]);

  // Po galerii (0.8 až 1.0) - Další dvě fotky
  const x3 = useTransform(scrollYProgress, [0.8, 1], ['-50vw', '5vw']);
  const y3 = useTransform(scrollYProgress, [0.8, 1], ['100vh', '25vh']);
  const op3 = useTransform(scrollYProgress, [0.8, 0.85, 1], [0, 0.6, 0.6]);

  const x4 = useTransform(scrollYProgress, [0.8, 1], ['100vw', '65vw']);
  const y4 = useTransform(scrollYProgress, [0.8, 1], ['100vh', '40vh']);
  const op4 = useTransform(scrollYProgress, [0.8, 0.85, 1], [0, 0.6, 0.6]);

  const images = [
    { x: x1, y: y1, op: op1, scale: 1, src: '/images/gym/gym11.webp' },
    { x: x2, y: y2, op: op2, scale: 1, src: '/images/gym/gym12.webp' },
    // Dvě nové fotky po galerii - "o 1x tak větší" = scale: 2.2
    { x: x3, y: y3, op: op3, scale: 2.2, src: '/images/gym/gym13.webp' },
    { x: x4, y: y4, op: op4, scale: 2.2, src: '/images/gym/gym14.webp' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
      {images.map((img, i) => (
        <motion.div
          key={i}
          // Vyřadili jsme rotate (jedou rovně), přidali řízené opacity a scale
          style={{ x: img.x, y: img.y, opacity: img.op, scale: img.scale }}
          className="absolute w-[50vw] h-[65vw] md:w-[28vw] md:h-[38vw] xl:w-[24vw] xl:h-[32vw] rounded-3xl overflow-hidden border border-white/10 grayscale brightness-75 contrast-125 shadow-2xl transform-gpu will-change-transform"
        >
          <Image src={img.src} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingPhotos;