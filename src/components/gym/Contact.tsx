import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Globe } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="kontakt" className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-full bg-[#d4ff00]/5 -skew-x-12 transform translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[12vw] md:text-9xl font-black leading-none tracking-tighter mb-12"
            >
              KON<br />TAKT
            </motion.h2>

            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="bg-[#d4ff00] p-4 rounded-xl text-black">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">Adresa</h4>
                  <p className="text-3xl font-black tracking-tight uppercase">Jiráskova 1320</p>
                  <p className="text-xl font-bold text-white/60 uppercase tracking-widest">Mladá Boleslav</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-[#d4ff00] p-4 rounded-xl text-black">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">Otevírací doba</h4>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    {/* Opraveno na 6:00 podle webu (smrk) */}
                    <p className="font-bold">PO - PÁ:</p> <p className="text-[#d4ff00] font-black tracking-widest">6:00 - 21:00</p>
                    <p className="font-bold">SO - NE:</p> <p className="text-[#d4ff00] font-black tracking-widest">8:00 - 20:00</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-[#d4ff00] p-4 rounded-xl text-black">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">Telefon & Email</h4>
                  <p className="text-3xl font-black tracking-tight">+420 774 777 077</p>
                  <p className="text-xl font-bold text-white/60 underline decoration-[#d4ff00]/50 decoration-4 underline-offset-8">info@fitness77.cz</p>
                </div>
              </div>

              <div className="flex gap-6 pt-6">
                <motion.a whileHover={{ y: -5 }} href="https://instagram.com/fitness77mb" target="_blank" className="p-4 rounded-full border border-white/10 hover:border-[#d4ff00] hover:text-[#d4ff00] transition-colors">
                  <Globe className="w-6 h-6" />
                </motion.a>
                <motion.a whileHover={{ y: -5 }} href="mailto:info@fitness77.cz" className="p-4 rounded-full border border-white/10 hover:border-[#d4ff00] hover:text-[#d4ff00] transition-colors">
                  <Mail className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="h-full min-h-[500px] rounded-3xl overflow-hidden grayscale contrast-125 border border-white/10"
          >
            {/* Tady máš funkční Google Mapu přímo na Jiráskovu 1320 (smrk) */}
            <iframe
              title="Fitness 77 Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2537.042784795286!2d14.912633877196024!3d50.42145698944111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47095597793d506f%3A0x64795b87190e87d!2sJir%C3%A1skova%201320%2C%20293%2001%20Mlad%C3%A1%20Boleslav!5e0!3m2!1scs!2scz!4v1711900000000!5m2!1scs!2scz"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};