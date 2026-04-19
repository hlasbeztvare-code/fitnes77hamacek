"use client";

import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section className="bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <span className="text-[#d4ff00] font-medium text-xs tracking-[0.8em] uppercase mb-6 block">
            Ready for the shift?
          </span>
          
          <h2 className="text-[10vw] md:text-[10vw] font-black text-white font-black leading-[0.8] tracking-tighter uppercase italic mb-4">
            KONTAKTUJ
          </h2>
          
          <div className="relative inline-block">
            <h2 className="text-[10vw] md:text-[10vw] font-black font-black leading-[0.8] tracking-tighter uppercase italic text-transparent"
                style={{ WebkitTextStroke: '1px #d4ff00' }}>
              NÁS TEĎ.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-24">
          <div className="space-y-8">
            <div>
              <p className="text-white/40 font-medium text-xs tracking-widest uppercase mb-4">Lokalita</p>
              <h3 className="text-3xl font-bold text-white font-black tracking-tight uppercase">
                MLADÁ BOLESLAV
              </h3>
              <p className="text-white/60 font-medium text-sm mt-2">JIRÁSKOVA 1320</p>
            </div>
            
            <div className="flex gap-12">
              <div>
                <p className="text-white/40 font-medium text-xs tracking-widest uppercase mb-4">Telefon</p>
                <a href="tel:+420123456789" className="text-2xl font-bold text-white font-black hover:text-[#d4ff00] transition-colors">
                  +420 123 456 789
                </a>
              </div>
              <div>
                <p className="text-white/40 font-medium text-xs tracking-widest uppercase mb-4">E-mail</p>
                <a href="mailto:info@fit77.cz" className="text-2xl font-bold text-white font-black hover:text-[#d4ff00] transition-colors uppercase">
                  info@fit77.cz
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end items-end">
            <div className="text-right">
              <p className="text-white/40 font-medium text-xs tracking-widest uppercase mb-4">Sociální sítě</p>
              <div className="flex gap-6 justify-end">
                {['IG', 'FB', 'YT'].map((social) => (
                  <motion.a
                    key={social}
                    whileHover={{ scale: 1.1, color: '#d4ff00' }}
                    href="#"
                    className="text-4xl font-black text-white font-black italic tracking-tighter"
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Fit77.cz watermark v patičce (smrk) */}
        <div className="mt-32 border-t border-white/5 pt-12 flex justify-between items-center">
            <span className="text-white/20 font-black text-6xl tracking-tighter select-none uppercase">
                Fit77.cz
            </span>
            <p className="text-white/10 font-medium text-[10px] tracking-[0.4em] uppercase">
                © 2026 Developed by Senior Master
            </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
