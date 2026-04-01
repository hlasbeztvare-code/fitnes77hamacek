import { Globe, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#050505] text-white pt-40 pb-20 px-6 md:px-32 relative overflow-hidden">
      {/* Massive decorative background text */}
      <div className="absolute -bottom-10 -right-20 text-[40vw] font-bebas font-black text-white/[0.01] select-none pointer-events-none uppercase tracking-tighter leading-none">
        F77
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="border-b border-white/5 pb-32 mb-32 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-24">
          <div>
             <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="text-[#d4ff00] text-sm font-bold tracking-[1em] uppercase mb-10 block font-space"
             >
               Ready for the shift?
             </motion.span>
            <h2 className="text-[12vw] font-black leading-[0.8] tracking-tighter uppercase font-bebas">
              KONTAKTUJ<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #d4ff00' }}>NÁS TEĎ</span>
            </h2>
          </div>
          <div className="lg:text-right space-y-12">
            <div className="group cursor-none">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] mb-4 font-space">The Location</p>
              <h4 className="text-6xl font-black uppercase font-bebas tracking-widest group-hover:text-[#d4ff00] transition-colors leading-none">Mladá Boleslav</h4>
              <p className="text-2xl text-white/40 uppercase font-space font-medium tracking-tighter mt-2">Havlíčkova 77, 293 01</p>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] mb-4 font-space">Direct Line</p>
              <p className="text-4xl font-black font-bebas tracking-[0.1em] hover:text-[#d4ff00] transition-colors cursor-none">+420 123 456 789</p>
              <p className="text-4xl font-black font-bebas tracking-[0.1em] hover:text-[#d4ff00] transition-colors cursor-none">INFO@FITNESS77.CZ</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 font-space">
          <div className="lg:col-span-4 space-y-16">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.6em] mb-10 text-[#d4ff00]">Otevírací Doba</h4>
              <div className="space-y-6 text-2xl uppercase font-black font-bebas tracking-widest">
                <div className="flex justify-between gap-10 border-b border-white/5 pb-4 group">
                  <span className="text-white/40 group-hover:text-white transition-colors">PO — PÁ</span> 
                  <span className="text-white">06:00 — 22:00</span>
                </div>
                <div className="flex justify-between gap-10 border-b border-white/5 pb-4 group">
                  <span className="text-white/40 group-hover:text-white transition-colors">SO — NE</span> 
                  <span className="text-white">08:00 — 20:00</span>
                </div>
              </div>
            </div>
            <div className="flex gap-8">
               <a href="#" className="w-16 h-16 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#d4ff00] hover:text-black transition-all duration-500 hover:-rotate-6">
                 <Globe size={28} />
               </a>
               <a href="#" className="w-16 h-16 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#d4ff00] hover:text-black transition-all duration-500 hover:rotate-6">
                 <Share2 size={28} />
               </a>
            </div>
          </div>
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="w-full h-[500px] bg-zinc-900/50 rounded-[3rem] overflow-hidden border border-white/5 group relative shadow-2xl"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2537.126296180637!2d14.908585676831032!3d50.4132223896561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709549f9976378f%3A0xe781977799d14ec8!2sHavl%C3%AD%C4%8Dkova%2077%2C%20293%2001%20Mlad%C3%A1%20Boleslav!5e0!3m2!1scs!2scz!4v1714850000000!5m2!1scs!2scz" 
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
              <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-white/20 font-space">© 2024 FITNESS 77 MLADÁ BOLESLAV</p>
              <div className="flex gap-6 mt-6 opacity-20 text-[8px] font-black uppercase tracking-widest font-space">
                 <a href="#" className="hover:text-white transition-colors">Legal</a>
                 <a href="#" className="hover:text-white transition-colors">Privacy</a>
                 <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
           </div>
           
           <div className="flex gap-10 items-center">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4ff00] font-space italic underline decoration-2 underline-offset-4">Top 3 World Best Design</span>
                <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-2">Nominated for Site of the Year '24</span>
             </div>
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-4">
                <img src="https://www.vectorlogo.zone/logos/framer/framer-icon.svg" alt="Framer" className="grayscale contrast-200" />
             </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
