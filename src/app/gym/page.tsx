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
    <main className="bg-[#0A0A0A] min-h-screen text-white selection:bg-[#E10600] selection:text-white overflow-x-hidden relative scroll-smooth">
      
      {/* 1. HERO - Masivní 3D Typo na černém podkladu */}
      <section className="relative h-[45vh] flex flex-col justify-center px-6 border-b border-zinc-100/10 bg-black z-20">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter text-white"
                style={{ textShadow: '0 4px 4px rgba(0,0,0,0.8), 0 8px 10px rgba(0,0,0,0.6)' }}>
              FITNESS<span className="text-[#E10600]" style={{ textShadow: '0 4px 10px rgba(225,6,0,0.5)' }}>77</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-4 gap-6">
               <div className="flex flex-col gap-6 relative z-20">
                 <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-500 italic">RAW_HERITAGE // MB</p>
                 
                 <div className="flex gap-8 border-l-4 border-[#E10600] pl-5 shadow-[0_0_30px_rgba(225,6,0,0.2)] bg-black/50 backdrop-blur-sm p-4 relative">
                    <div className="absolute inset-y-0 -left-1 w-1 bg-[#E10600] shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
                    <div>
                       <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">PO - PÁ</p>
                       <p className="text-2xl font-black italic text-white">06:00 - 22:00</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">SO - NE</p>
                       <p className="text-2xl font-black italic text-white">08:00 - 20:00</p>
                    </div>
                 </div>
               </div>

               <h2 className="text-[8vw] font-black uppercase italic leading-[0.75] tracking-tighter relative z-10"
                   style={{ WebkitTextStroke: '1px #E10600', color: 'transparent', textShadow: '0 0 15px rgba(225,6,0,0.3)' }}>
                 HARDCORE
               </h2>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. THE CORE TRINITY - Sjednocený Layout s POVÍDÁNÍM O FITKU */}
      <section className="relative py-32 px-4 z-10 bg-[#0A0A0A]">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          
          {/* TRENÉR VLEVO: HAMÁČEK */}
          <div className="flex flex-col group relative">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(225,6,0,0.2)] rounded-sm">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-1000" priority />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            
            <div className="relative -mt-28 mx-4 lg:mx-8 bg-black/60 backdrop-blur-2xl p-8 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] z-20 transition-all duration-500 group-hover:translate-y-[-10px] group-hover:border-[#E10600]/50 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E10600] to-transparent shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter">Hamáček</h3>
                <span className="text-[#E10600] font-black italic text-2xl opacity-30">01</span>
              </div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6 italic border-l-2 border-[#E10600] pl-3">Zakladatel // Head Coach</p>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed">Nekompromisní přístup, naturální cesta. Hamáček je tvůj průvodce peklem, ze kterého vyjdeš jako nová verze sebe sama.</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(225,6,0,0.3)] hover:shadow-none">REZERVOVAT</Link>
            </div>
          </div>

          {/* STŘED: POVÍDÁNÍ + PERMICE POSUNUTÉ NÍŽ (smrk) */}
          <div className="flex flex-col gap-12 lg:mt-10">
            
            {/* POVÍDÁNÍ O FITKU */}
            <div className="relative bg-black/40 backdrop-blur-xl p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#E10600]"></div>
              <h3 className="text-xl font-black uppercase italic text-white mb-4 tracking-widest">NAŠE FILOZOFIE</h3>
              <p className="text-sm text-zinc-400 leading-relaxed italic">
                Naše fitness má rozlohu 220 m², najdete zde 30 posilovacích strojů české značky VITA a profesionální kardio-zónu. V našem fitness dbáme na to, aby se u nás klienti cítili co nejlépe a bylo o ně dobře postaráno. (smrk)
              </p>
            </div>

            {/* PERMANENTKY STŘED - POSUNUTO NÍŽ */}
            <div className="flex flex-col group relative lg:mt-12">
              <div className="bg-black/10 backdrop-blur-md h-32 flex items-center justify-center border-t-2 border-[#E10600]">
                 <span className="text-5xl font-black italic opacity-20 uppercase tracking-[0.3em] text-white">Membership</span>
              </div>
              <div className="relative -mt-10 mx-2 bg-black/60 backdrop-blur-3xl p-8 text-white border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,1)] z-20 transition-all duration-500 group-hover:translate-y-[-15px] group-hover:border-[#E10600]/50 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E10600] to-transparent shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
                <h3 className="text-3xl font-black uppercase italic mb-6 text-white tracking-tighter">Vstupy</h3>
                <div className="space-y-1 mb-10 text-white">
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
                      <span className="text-2xl font-black italic text-white">{item.price} CZK</span>
                    </div>
                  ))}
                </div>
                <Link href="/shop" className="block w-full text-center py-5 bg-white text-black text-xs font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]">KOUPIT PERMICI ONLINE →</Link>
              </div>
            </div>
          </div>

          {/* TRENÉR VPRAVO: SOUSTRUŽNÍK */}
          <div className="flex flex-col group relative text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(225,6,0,0.2)] rounded-sm">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-1000" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
            
            <div className="relative -mt-28 mx-4 lg:mx-8 bg-black/60 backdrop-blur-2xl p-8 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] z-20 transition-all duration-500 group-hover:translate-y-[-10px] group-hover:border-[#E10600]/50 flex flex-col items-end relative">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-[#E10600] to-transparent shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
              <div className="flex justify-between items-end mb-4 w-full flex-row-reverse">
                <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter">Soustružník</h3>
                <span className="text-[#E10600] font-black italic text-2xl opacity-30">02</span>
              </div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6 italic border-r-2 border-[#E10600] pr-3">ELITNÍ KOUČ // PRO UNIT</p>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed text-right">Specialista na techniku a svalovou hypertrofii. Pokud chceš růst, musíš poslouchat mistra soustruhu.</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(225,6,0,0.3)] hover:shadow-none">REZERVOVAT</Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. GALERIE */}
      <section className="py-24 px-4 bg-black relative z-10">
         <div className="max-w-[1400px] mx-auto">
            <h2 className="text-[9px] font-black uppercase tracking-[0.8em] text-zinc-700 text-center mb-16 italic">F77_VAULT_ARCHIVE</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {galleryFiles.slice(0, 8).map((file, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden bg-zinc-900 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_25px_50px_rgba(0,0,0,0.9)]">
                  <img src={`/images/gym/gallery/${file}`} alt="F77 Vault" className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700" loading="lazy" />
                </div>
              ))}
            </div>
         </div>
      </section>

    </main>
  );
}
