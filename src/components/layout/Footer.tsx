"use client";

import { socialLinks } from '@/lib/social';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#000000] text-white pt-16 pb-8 px-6 md:px-12 lg:px-20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1500px] mx-auto relative z-10">

        <div className="flex flex-col lg:flex-row lg:justify-between gap-x-12 gap-y-16">

          {/* 1. Logo - Neon Brand Block */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left min-w-[360px]">
            <div className="relative w-[358px] h-[134px] mb-6">
              <Image src="/images/brand/logo-fitness77.png" alt="Fitness 77" fill className="object-contain brightness-0 invert" />
            </div>
          </div>

          {/* Right Side: Columns & Slogan/Socials Row */}
          <div className="flex-grow lg:border-l lg:border-white/5 lg:pl-12">
            
            {/* 5 columns grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-8 mb-12">

              {/* 2. Menu Links */}
              <div className="flex flex-col gap-4 text-center sm:text-left">
                <span className="text-[#d4ff00] text-[8px] font-black tracking-[0.4em] uppercase mb-2">PROFIL</span>
                <div className="flex flex-col gap-3 text-[11px] font-black tracking-widest uppercase text-white">
                  <Link href="/supplements" className="hover:text-[#d4ff00] transition-colors">SUPLEMENTY</Link>
                  <Link href="/equipment" className="hover:text-[#d4ff00] transition-colors">VYBAVENI</Link>
                  <Link href="/bazaar" className="hover:text-[#d4ff00] transition-colors">BAZAR</Link>
                </div>
              </div>

              {/* 3. Support Contact */}
              <div className="flex flex-col gap-4 text-center sm:text-left">
                <span className="text-[#d4ff00] text-[8px] font-black tracking-[0.4em] uppercase mb-2">KONTAKT</span>
                <div className="flex flex-col gap-3 text-[11px] font-black tracking-widest uppercase text-white">
                  <Link href="tel:+420777105548" className="hover:text-[#d4ff00] transition-colors whitespace-nowrap">+420 777 105 548</Link>
                  <Link href="mailto:obchod@fit77.cz" className="hover:text-[#d4ff00] transition-colors whitespace-nowrap uppercase">OBCHOD@FIT77.CZ</Link>
                </div>
              </div>

              {/* 4. Base Location */}
              <div className="flex flex-col gap-4 text-center sm:text-left">
                <span className="text-[#d4ff00] text-[8px] font-black tracking-[0.4em] uppercase mb-2">PRODEJNA</span>
                <div className="flex flex-col gap-2 text-[11px] font-black tracking-widest uppercase leading-loose text-white">
                  <span>JIRÁSKOVA 1320,<br />293 01 MB</span>
                </div>
              </div>

              {/* 5. Billing details */}
              <div className="flex flex-col gap-4 text-center sm:text-left">
                <span className="text-[#d4ff00] text-[8px] font-black tracking-[0.4em] uppercase mb-2">PROVOZOVATEL</span>
                <div className="flex flex-col gap-2 text-[10px] font-black tracking-widest uppercase leading-relaxed text-white">
                  <span>Fitness 77</span>
                  <span>IČO: 04019369</span>
                  <span>Chudoplesy 77</span>
                  <span>294 01 Bakov n. J.</span>
                </div>
              </div>

              {/* 6. Legal Links */}
              <div className="flex flex-col gap-4 text-center sm:text-left">
                <span className="text-[#d4ff00] text-[8px] font-black tracking-[0.4em] uppercase mb-2">PRÁVNÍ</span>
                <div className="flex flex-col gap-3 text-[11px] font-black tracking-widest uppercase text-white">
                  <Link href="/obchodni-podminky" className="hover:text-[#d4ff00] transition-colors">PODMÍNKY</Link>
                  <Link href="/odstoupeni-od-smlouvy" className="text-[#d4ff00] font-black border-b border-[#d4ff00]/20 pb-0.5 inline-block w-fit mx-auto sm:mx-0">ODSTOUPENÍ</Link>
                  <Link href="/privacy" className="hover:text-[#d4ff00] transition-colors">SOUKROMÍ</Link>
                </div>
              </div>

            </div>

            {/* Slogan and Socials Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 border-t border-white/5">
              {/* Slogan */}
              <p className="text-[#d4ff00] text-[11px] sm:text-[13px] md:text-[14px] font-black uppercase tracking-[0.2em] leading-relaxed text-left">
                VÁŠ PARTNER V CESTĚ ZA LEPŠÍM JÁ. KVALITA BEZ KOMPROMISŮ.
              </p>

              {/* Socials */}
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-shrink-0 self-start sm:self-auto">
                <a href={socialLinks.tiktok || "#"} target="_blank" aria-label="TikTok" className="w-9 h-9 bg-[#d4ff00] text-black font-black text-[11px] hover:scale-105 hover:bg-white transition-all flex items-center justify-center">TT</a>
                <a href={socialLinks.instagram} target="_blank" aria-label="Instagram" className="w-9 h-9 bg-[#d4ff00] text-black font-black text-[11px] hover:scale-105 hover:bg-white transition-all flex items-center justify-center">IG</a>
                <a href={socialLinks.facebook} target="_blank" aria-label="Facebook" className="w-9 h-9 bg-[#d4ff00] text-black font-black text-[11px] hover:scale-105 hover:bg-white transition-all flex items-center justify-center">FB</a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-[8px] font-black uppercase tracking-[0.4em] text-white/20">
          <div className="text-center md:text-left">© {new Date().getFullYear()} FITNESS 77 MLADÁ BOLESLAV</div>
          <div className="flex justify-center">
            <div className="relative overflow-hidden group py-1.5 px-6 border border-[#d4ff00]/10 bg-black/40">
              {/* Laser Scanning Effect Line */}
              <div className="absolute left-0 w-full h-[1px] bg-[#d4ff00] pointer-events-none animate-[laserScan_3s_linear_infinite]" />
              <span className="text-white/40 tracking-[0.6em]">DESIGNED BY </span>
              <span className="text-[#d4ff00] font-black tracking-widest">L-CODE DYNAMICS</span>
            </div>
          </div>
          <div className="hidden md:block w-full text-right opacity-0 pointer-events-none">© {new Date().getFullYear()} FITNESS 77 MLADÁ BOLESLAV</div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;