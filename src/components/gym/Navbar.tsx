import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: 'HOME',    href: '#' },
    { name: 'SLUŽBY',  href: '#sluzby' },
    { name: 'CENÍK',   href: '#pricing' },
    { name: 'TRENÉŘI', href: '#trainers' },
    { name: 'KONTAKT', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#d4ff00] flex items-center justify-center font-black text-black font-bebas text-xl group-hover:rotate-45 transition-transform duration-500">
              77
            </div>
            <span className="font-bebas font-black tracking-tighter text-2xl group-hover:tracking-widest transition-all duration-500">FITNESS</span>
          </a>

          <div className="hidden md:flex gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-syne font-black tracking-[0.3em] hover:text-[#d4ff00] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d4ff00] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 md:hidden hover:text-[#d4ff00] transition-colors"
            >
              <Menu size={24} />
            </button>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="hidden md:block px-6 py-2 bg-[#d4ff00] text-black font-bebas text-lg font-black tracking-widest"
            >
              JOIN NOW
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu */}
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] bg-[#d4ff00] flex flex-col items-center justify-center"
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-10 right-10 p-4 text-black hover:scale-110 transition-transform"
        >
          <X size={48} />
        </button>

        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-black font-bebas font-black text-6xl md:text-8xl hover:italic transition-all"
            >
              {link.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
};
