import fs from 'fs';
import path from 'path';
import Reveal from "@/components/ui/Reveal";
import Image from 'next/image';
import Link from 'next/link';

export default async function GymPage() {
  const galleryDir = path.join(process.cwd(), 'public/images/gym/gallery');
  let galleryFiles: string[] = [];
  try {
    if (fs.existsSync(galleryDir)) {
      galleryFiles = fs.readdirSync(galleryDir).filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    }
  } catch (e) {}

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white selection:bg-[#E10600] selection:text-white overflow-x-hidden scroll-smooth">
      
      {/* 1. HERO - Masivní hloubka na černém podkladu */}
      <section className="relative h-[55vh] flex flex-col justify-center px-6 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black"></div>
        
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[12vw] font-black uppercase italic leading-[0.75] tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-8 gap-6">
               <div className="flex flex-col gap-6 relative z-20">
                 <p className="text-[10px] font-black uppercase tracking-[0.8em] text-zinc-500 italic">RAW_HERITAGE // MB</p>
                 
                 <div className="flex gap-8 border-l-4 border-[#E10600] pl-5 bg-white/5 backdrop-blur-sm p-4 shadow-2xl">
                    <div>
                       <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">PO - PÁ</p>
                       <p className="text-3xl font-black italic text-white">06:00 - 22:00</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">SO - NE</p>
                       <p className="text-3xl font-black italic text-white">08:00 - 20:00</p>
                    </div>
                 </div>
               </div>

               <h2 className="text-[9vw] font-black uppercase italic leading-[0.75] tracking-tighter opacity-20"
                   style={{ WebkitTextStroke: '1px #E10600', color: 'transparent' }}>
                 HARDCORE
               </h2>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. THE CORE TRINITY - Sjednocený "Frame" Styl */}
      <section className="relative py-32 px-4 z-10">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-stretch">
          
          {/* TRENÉR 01: HAMÁČEK */}
          <div className="flex flex-col group relative">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(225,6,0,0.2)]">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
            
            <div className="relative -mt-28 mx-4 lg:mx-8 bg-black/60 backdrop-blur-2xl p-8 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] z-20 transition-all duration-500 group-hover:translate-y-[-10px] group-hover:border-[#E10600]/50">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E10600] to-transparent"></div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-4xl font-black uppercase italic tracking-tighter">Hamáček</h3>
                <span className="text-[#E10600] font-black italic text-2xl opacity-30">01</span>
              </div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6 italic border-l-2 border-[#E10600] pl-3">ZAKLADATEL // HEAD COACH</p>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed">Nekompromisní přístup, naturální cesta. Hamáček je tvůj průvodce peklem, ze kterého vyjdeš jako nová verze sebe sama.</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all">
                BOOK TRAINING
              </Link>
            </div>
          </div>

          {/* PERMANENTKY - SOVEREIGN STYLE */}
          <div className="flex flex-col group relative lg:mt-20">
            <div className="relative w-full h-32 bg-zinc-900/50 overflow-hidden border-t border-l border-r border-white/5 group-hover:bg-zinc-800 transition-all">
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-black italic text-white/5 group-hover:text-[#E10600]/10 transition-all">MEMBERSHIP</span>
               </div>
            </div>

            <div className="relative -mt-10 mx-0 bg-black/60 backdrop-blur-3xl p-8 border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,1)] z-20 transition-all duration-500 group-hover:translate-y-[-15px] group-hover:border-[#E10600]/50">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E10600] to-transparent"></div>
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-4xl font-black uppercase italic tracking-tighter">Vstupy</h3>
                <span className="text-[#E10600] font-black italic text-2xl opacity-30">77</span>
              </div>
              
              <div className="space-y-1 mb-10">
                {[
                  { name: 'RAW_ENTRY', price: '180', label: 'JEDNORÁZ' },
                  { name: 'WARRIOR_30', price: '1290', label: 'MĚSÍČNÍ' },
                  { name: 'ELITE_365', price: '10900', label: 'ROČNÍ' }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-5 border-b border-white/5 hover:bg-white/5 transition-all px-2 group/item">
                    <div>
                      <h4 className="font-black italic text-xl group-hover/item:text-[#E10600] transition-colors">{item.name}</h4>
                      <p className="text-[9px] text-zinc-500 font-bold tracking-widest">{item.label}</p>
                    </div>
                    <span className="text-2xl font-black italic">{item.price}</span>
                  </div>
                ))}
              </div>

              <Link href="/shop" className="block w-full text-center py-5 bg-white text-black text-xs font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all">
                KOUPIT PERMICI ONLINE
              </Link>
            </div>
          </div>

          {/* TRENÉR 02: SOUSTRUŽNÍK */}
          <div className="flex flex-col group relative text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(225,6,0,0.2)]">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
            
            <div className="relative -mt-28 mx-4 lg:mx-8 bg-black/60 backdrop-blur-2xl p-8 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] z-20 transition-all duration-500 group-hover:translate-y-[-10px] group-hover:border-[#E10600]/50 flex flex-col items-end">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-[#E10600] to-transparent"></div>
              <div className="flex justify-between items-end mb-4 w-full flex-row-reverse">
                <h3 className="text-4xl font-black uppercase italic tracking-tighter">Soustružník</h3>
                <span className="text-[#E10600] font-black italic text-2xl opacity-30">02</span>
              </div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6 italic border-r-2 border-[#E10600] pr-3">ELITNÍ KOUČ // PRO UNIT</p>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed text-right">Specialista na techniku a svalovou hypertrofii. Pokud chceš růst, musíš poslouchat mistra soustruhu.</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all">
                BOOK TRAINING
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* GALERIE - Zpět v původním kompaktním formátu */}
      <section className="py-24 px-4 bg-black relative">
         <div className="max-w-[1400px] mx-auto">
            <h2 className="text-[9px] font-black uppercase tracking-[0.8em] text-zinc-700 text-center mb-16">F77_VAULT_ARCHIVE</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {galleryFiles.slice(0, 8).map((file, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden bg-zinc-900 shadow-2xl">
                  <img src={`/images/gym/gallery/${file}`} alt="F77" className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                </div>
              ))}
            </div>
         </div>
      </section>

    </main>
  );
}
