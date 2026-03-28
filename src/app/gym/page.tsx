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
    <main className="bg-[#050505] min-h-screen text-white selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. HERO - NEDOTKNUTELNÁ SEKCE */}
      <section className="relative h-[40vh] flex flex-col justify-center px-6 border-b border-white/10 bg-[#0a0a0a]">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full">
            <h1 className="text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter text-white">
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="flex justify-between items-center mt-2">
               <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-500 italic">RAW_HERITAGE // MB</p>
               <h2 className="text-[8vw] font-black uppercase italic leading-[0.75] tracking-tighter"
                   style={{ WebkitTextStroke: '1px #E10600', color: 'transparent' }}>
                 HARDCORE
               </h2>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. THE CORE (Levitující vrstvený design pro rozbití plochosti) */}
      <section className="relative py-24 px-4">
        {/* Jemný pozadní přechod pro hloubku */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#050505] z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* VLEVO: HAMÁČEK */}
          <div className="flex flex-col group">
            {/* Fotka v pozadí */}
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top hover:scale-105 transition-transform duration-700" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
            
            {/* Box překrývající fotku = Z-INDEX HLOUBKA */}
            <div className="relative -mt-20 mx-4 lg:mx-8 bg-zinc-950 p-6 border border-white/10 shadow-2xl z-20 group-hover:border-white/20 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E10600] to-transparent"></div>
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-3xl font-black uppercase italic leading-none">Hamáček</h3>
                <span className="text-[#E10600] font-black italic text-xl opacity-50">01</span>
              </div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 italic">ZAKLADATEL // HEAD COACH</p>
              
              <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
                Hlavní mozek F77. Specialista na silový trénink a naturální kulturistiku. Tady končí sranda a začíná dřina.
              </p>

              <div className="flex flex-col gap-2">
                <Link href="/kontakt" className="w-full text-center py-3 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(225,6,0,0.4)] hover:shadow-none">
                  Rezervovat trénink
                </Link>
              </div>
            </div>
          </div>

          {/* UPROSTŘED: PERMANENTKY (Ostrý bílý blok = MASIVNÍ HLOUBKA) */}
          <div className="flex flex-col justify-center bg-white text-black p-8 lg:p-10 shadow-[0_20px_50px_rgba(225,6,0,0.15)] relative z-30 transform lg:-translate-y-8 border-t-4 border-[#E10600]">
            <h2 className="text-center text-3xl font-black uppercase tracking-widest text-black italic mb-2">Ceník Vstupů</h2>
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#E10600] mb-8">No_Bullshit_Access</p>
            
            <div className="space-y-0">
              {[
                { name: 'Jednorázový Vstup', price: '180' },
                { name: 'Měsíční Permice', price: '1290' },
                { name: 'Roční Permice', price: '10900' }
              ].map((p, i) => (
                <div key={i} className="py-6 border-b border-black/10 flex flex-col items-center justify-center hover:bg-zinc-50 transition-all duration-300 cursor-pointer text-center group">
                  <h4 className="text-2xl font-black uppercase italic tracking-tighter group-hover:scale-105 group-hover:text-[#E10600] transition-all">{p.name}</h4>
                  <span className="text-xl font-black italic text-black mt-1 group-hover:text-[#E10600]">{p.price} CZK</span>
                </div>
              ))}
            </div>
            
            <Link href="/shop" className="mt-8 block w-full text-center py-4 bg-black text-white text-sm font-black uppercase italic hover:bg-[#E10600] transition-all">
              Koupit online
            </Link>
          </div>

          {/* VPRAVO: SOUSTRUŽNÍK */}
          <div className="flex flex-col group text-right">
             {/* Fotka v pozadí */}
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top hover:scale-105 transition-transform duration-700" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
            
            {/* Box překrývající fotku = Z-INDEX HLOUBKA */}
            <div className="relative -mt-20 mx-4 lg:mx-8 bg-zinc-950 p-6 border border-white/10 shadow-2xl z-20 group-hover:border-white/20 transition-colors flex flex-col items-end">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-[#E10600] to-transparent"></div>
              <div className="flex justify-between items-end mb-2 w-full flex-row-reverse">
                <h3 className="text-3xl font-black uppercase italic leading-none">Soustružník</h3>
                <span className="text-[#E10600] font-black italic text-xl opacity-50">02</span>
              </div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 italic">ELITNÍ KOUČ // PRO UNIT</p>
              
              <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
                Elitní trenér a závodník. Nekompromisní dohled na techniku, dynamika a posouvání tvých fyzických limitů.
              </p>

              <div className="flex flex-col gap-2 w-full">
                <Link href="/kontakt" className="w-full text-center py-3 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(225,6,0,0.4)] hover:shadow-none">
                  Rezervovat trénink
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. POD TÍM: GALERIE */}
      <section className="py-12 px-4 bg-[#050505] border-t border-white/5">
         <h2 className="text-center text-[10px] font-black uppercase tracking-[0.8em] text-zinc-600 italic mb-8">F77_VAULT_ARCHIVE</h2>
        <div className="max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative aspect-square overflow-hidden group">
              <img src={`/images/gym/gallery/${file}`} alt="F77 Vault" className="w-full h-full object-cover opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-500" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
