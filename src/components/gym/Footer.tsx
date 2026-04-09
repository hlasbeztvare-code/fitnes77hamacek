import { Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/lib/social';

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#050505] text-white pt-40 pb-20 px-6 md:px-32 relative overflow-hidden italic font-space">
      <div className="absolute -bottom-10 -right-20 text-[40vw] font-bebas font-black text-white/[0.01] select-none pointer-events-none uppercase tracking-tighter leading-none">
        F77
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="border-b border-white/5 pb-32 mb-32 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-24">
          <div>
             <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="text-[#d4ff00] text-sm font-bold tracking-[1em] uppercase mb-10 block"
             >
               Ready for the shift?
             </motion.span>
           <h2 className="text-[12vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter uppercase font-bebas drop-shadow-[0_0_40px_rgba(212,255,0,0.15)]">
              KONTAKTUJ<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #d4ff00' }}>NÁS TEĎ</span>
            </h2>
          </div>
          <div className="lg:text-right space-y-12">
            <div className="group cursor-default">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] mb-4">The Location</p>
              <h4 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase font-bebas tracking-widest group-hover:text-[#d4ff00] transition-colors leading-none">Mladá Boleslav</h4>
              <p className="text-xl md:text-2xl text-white/40 uppercase font-medium tracking-tighter mt-2">Jiráskova 1320, 293 01</p>
            </div>
            <div className="space-y-4 max-w-full overflow-hidden">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] mb-4">Direct Line</p>
             <p className="text-3xl md:text-4xl xl:text-5xl font-black font-bebas tracking-[0.1em] lg:tracking-[0.05em] hover:text-[#d4ff00] transition-all duration-300 cursor-pointer lg:hover:scale-105 origin-left lg:origin-right transform-gpu whitespace-nowrap">+420 777 105 548</p>
             <p className="text-3xl md:text-4xl xl:text-5xl font-black font-bebas tracking-[0.1em] lg:tracking-[0.05em] hover:text-[#d4ff00] transition-all duration-300 cursor-pointer uppercase lg:hover:scale-105 origin-left lg:origin-right transform-gpu w-full break-normal lg:whitespace-nowrap">fitness77@post.cz</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 font-space">
          <div className="lg:col-span-4 space-y-16">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.6em] mb-10 text-[#d4ff00]">Otevírací Doba</h4>
              <div className="space-y-6 text-2xl uppercase font-black font-bebas tracking-widest">
               <div className="flex justify-between gap-10 border-b border-white/5 pb-4 group hover:border-[#d4ff00]/40 transition-colors duration-500">
                 <span className="text-white/40 group-hover:text-[#d4ff00] transition-all duration-500 font-bebas group-hover:translate-x-2 transform-gpu">PO — PÁ</span> 
                 <span className="text-white font-bebas group-hover:-translate-x-2 transition-transform duration-500 transform-gpu">06:00 — 21:00</span>
               </div>
               <div className="flex justify-between gap-10 border-b border-white/5 pb-4 group hover:border-[#d4ff00]/40 transition-colors duration-500">
                 <span className="text-white/40 group-hover:text-[#d4ff00] transition-all duration-500 font-bebas group-hover:translate-x-2 transform-gpu">SO — NE</span> 
                 <span className="text-white font-bebas group-hover:-translate-x-2 transition-transform duration-500 transform-gpu">08:00 — 20:00</span>
               </div>
              </div>
            </div>
            <div className="flex gap-6">
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-16 h-16 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#d4ff00] hover:text-black hover:border-[#d4ff00] transition-all duration-500 hover:-rotate-6 hover:scale-110 active:scale-95 transform-gpu shadow-lg hover:shadow-[0_0_20px_rgba(212,255,0,0.4)]">
                <Instagram size={28} />
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-16 h-16 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#d4ff00] hover:text-black hover:border-[#d4ff00] transition-all duration-500 hover:rotate-6 hover:scale-110 active:scale-95 transform-gpu shadow-lg hover:shadow-[0_0_20px_rgba(212,255,0,0.4)]">
                <Facebook size={28} />
              </a>
              <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-16 h-16 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#d4ff00] hover:text-black hover:border-[#d4ff00] transition-all duration-500 hover:-rotate-6 hover:scale-110 active:scale-95 transform-gpu shadow-lg hover:shadow-[0_0_20px_rgba(212,255,0,0.4)]">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
             className="w-full h-[500px] bg-zinc-900/50 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 hover:border-[#d4ff00]/40 transition-colors duration-700 group relative shadow-2xl transform-gpu"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2538.0416972744316!2d14.919864777169123!3d50.41235198038318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470955da34914c67%3A0xc3f8319f390d407d!2zSmlyw6Fza292YSAxMzIwLCAyOTMgMDEgTWxhZMOhIEJvbGVzbGF2!5e0!3m2!1scs!2scz!4v1712053700000!5m2!1scs!2scz" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(1) opacity(0.8)' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Map of Fitness 77"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-40" />
            </motion.div>
          </div>
        </div>

        <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex flex-col items-center md:items-start">
              <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-white/20">© 2026 FIT77 MLADÁ BOLESLAV</p>
           </div>
           
           <div className="flex gap-10 items-center">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4ff00] italic underline decoration-2 underline-offset-4">Top 1 MB Gym</span>
             </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
