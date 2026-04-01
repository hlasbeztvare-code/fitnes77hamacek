"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

// Koukoute, tady jsem to zvedl na tvojich 39 kousků (smrk)
const TOTAL_PHOTOS = 39; 

const cards = Array.from({ length: TOTAL_PHOTOS }, (_, i) => ({
  id: i,
  // Tady bacha, pokud máš některý .png, přepiš to v tom řetězci níže (smrk)
  url: `/images/gym/galery/gym_photo_${i}.jpg`, 
}));

const HorizontalGallery = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Těch -90% posouvá tu dlouhou řadu 39 fotek (smrk)
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-92%"]);

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-[#050505]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 p-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative h-[350px] w-[300px] md:h-[500px] md:w-[450px] flex-shrink-0 overflow-hidden rounded-2xl bg-neutral-800 shadow-2xl"
            >
              <img
                src={card.url}
                alt={`Fitness 77 MB ${card.id}`}
                className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
