"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const TOTAL_PHOTOS = 39; 

const HorizontalGallery = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-92%"]);

  const cards = Array.from({ length: TOTAL_PHOTOS }, (_, i) => ({
    id: i,
    // Koukoute, tady je ta cesta - zkusíme gallery (smrk)
    url: `/images/gym/gallery/gym_photo_${i}.jpg`, 
  }));

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-[#050505]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 p-6 text-white">
          {cards.map((card) => (
            <div key={card.id} className="group relative h-[450px] w-[350px] flex-shrink-0 overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl">
              <img
                src={card.url}
                alt={`Fitness 77 MB ${card.id}`}
                className="absolute inset-0 z-0 h-full w-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                onError={(e) => {
                  // Když to nenajde gallery, zkusí galery (jedno L) (smrk)
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes("gallery")) {
                    target.src = target.src.replace("gallery", "galery");
                  } else if (target.src.includes(".jpg")) {
                    target.src = target.src.replace(".jpg", ".png");
                  }
                }}
              />
              <div className="absolute bottom-4 left-4 z-10 text-[10px] font-bold opacity-20">#{card.id}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
