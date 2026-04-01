import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80', title: 'Power Rack' },
  { url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80', title: 'Cardio Zone' },
  { url: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80', title: 'Strength' },
  { url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80', title: 'Deadlift' },
  { url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80', title: 'Dumbbells' },
  { url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80', title: 'Group Training' },
];

const HorizontalGallery = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-90%']);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#050505]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-12 items-center">
          <div className="flex-shrink-0 w-[40vw] h-[80vh] flex flex-col justify-center px-10">
             <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="text-[#d4ff00] text-sm font-bold tracking-[0.8em] uppercase mb-8 font-space"
             >
               The Temple
             </motion.span>
             <h2 className="text-[10vw] font-black text-[#d4ff00] leading-[0.85] tracking-tighter uppercase font-bebas">
               PROSTORY<br />
               <span className="text-white">PRO VÝKON</span>
             </h2>
             <p className="text-xl text-white/40 max-w-md mt-10 font-space uppercase leading-tight font-medium">
                1000m² nabitých nejlepším vybavením Hammer Strength pro tvůj progres.
             </p>
          </div>
          {images.map((img, i) => (
            <div
              key={i}
              className="gallery-item group relative h-[70vh] w-[80vw] md:w-[60vw] flex-shrink-0 overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 cursor-none"
            >
              <motion.img
                initial={{ scale: 1.3 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-all duration-700" />
              <div className="absolute inset-0 flex items-end p-12 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                <div>
                    <span className="text-[#d4ff00] font-bebas text-2xl mb-2 block tracking-widest">0{i + 1}</span>
                    <h3 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter font-bebas leading-[0.8]">{img.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
