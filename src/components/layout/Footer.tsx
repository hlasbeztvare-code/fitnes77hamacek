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
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left min-w-[240px]">
            <div className="relative w-60 h-20 mb-6">
              <Image src="/images/brand/logo-fitness77.png" alt="Fitness 77" fill className="object-contain" />
            </div>
          </div>

          {/* Links Grid - 5 striktních sloupců, texty rozsvíceny do bílé/neon */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-8 flex-grow lg:border-l lg:border-white/5 lg:pl-12">

            {/* 2. Menu Links */}
            <div className="flex flex-col gap-4 text-left text-[#d4ff00]">
              <span className="text-[11px] font-bold tracking-widest uppercase mb-1">PROFIL</span>
              <div className="flex flex-col gap-3 text-[13px] font-medium tracking-normal">
                <Link href="/supplements" className="hover:text-white transition-colors">SUPLEMENTY</Link>
                <Link href="/equipment" className="hover:text-white transition-colors">VYBAVENÍ</Link>
                <Link href="/bazaar" className="hover:text-white transition-colors">BAZAR</Link>
              </div>
            </div>

            {/* 3. Support Contact */}
            <div className="flex flex-col gap-4 text-left text-[#d4ff00]">
              <span className="text-[11px] font-bold tracking-widest uppercase mb-1">KONTAKT</span>
              <div className="flex flex-col gap-3 text-[13px] font-medium tracking-normal">
                <Link href="tel:+420777105548" className="hover:text-white transition-colors whitespace-nowrap">+420 777 105 548</Link>
                <Link href="mailto:obchod@fit77.cz" className="hover:text-white transition-colors whitespace-nowrap uppercase">OBCHOD@FIT77.CZ</Link>
              </div>
            </div>

            {/* 4. Base Location */}
            <div className="flex flex-col gap-4 text-left text-[#d4ff00]">
              <span className="text-[11px] font-bold tracking-widest uppercase mb-1">PRODEJNA</span>
              <div className="flex flex-col gap-2 text-[13px] font-medium tracking-normal leading-relaxed">
                <span>JIRÁSKOVA 1320,<br />293 01 MB</span>
              </div>
            </div>

            {/* 5. Billing details */}
            <div className="flex flex-col gap-4 text-left text-[#d4ff00]">
              <span className="text-[11px] font-bold tracking-widest uppercase mb-1">PROVOZOVATEL</span>
              <div className="flex flex-col gap-2 text-[13px] font-medium tracking-normal leading-relaxed">
                <span>Fitness 77</span>
                <span>IČO: 04019369</span>
                <span>Chudoplesy 77</span>
                <span>294 01 Bakov n. J.</span>
              </div>
            </div>

            {/* 6. Legal Links */}
            <div className="flex flex-col gap-4 text-left text-[#d4ff00]">
              <span className="text-[11px] font-bold tracking-widest uppercase mb-1">PRÁVNÍ</span>
              <div className="flex flex-col gap-3 text-[13px] font-medium tracking-normal">
                <Link href="/obchodni-podminky" className="hover:text-white transition-colors">PODMÍNKY</Link>
                <Link href="/odstoupeni-od-smlouvy" className="border-b border-[#d4ff00]/20 pb-0.5 inline-block w-fit hover:text-white hover:border-white transition-colors font-bold">ODSTOUPENÍ</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">SOUKROMÍ</Link>
              </div>

              {/* Socials - Přesunuto pod PRÁVNÍ */}
              <div className="flex items-center gap-2 mt-4">
                <a href={socialLinks.tiktok || "#"} target="_blank" aria-label="TikTok" className="w-9 h-9 bg-[#d4ff00] text-black font-black text-[11px] hover:scale-105 hover:bg-white transition-all flex items-center justify-center">TT</a>
                <a href={socialLinks.instagram} target="_blank" aria-label="Instagram" className="w-9 h-9 bg-[#d4ff00] text-black font-black text-[11px] hover:scale-105 hover:bg-white transition-all flex items-center justify-center">IG</a>
                <a href={socialLinks.facebook} target="_blank" aria-label="Facebook" className="w-9 h-9 bg-[#d4ff00] text-black font-black text-[11px] hover:scale-105 hover:bg-white transition-all flex items-center justify-center">FB</a>
              </div>
            </div>

          </div>
        </div>

        {/* Roztažený Slogan */}
        <div className="mt-16 text-center border-t border-white/5 pt-10">
          <p className="text-[#d4ff00] text-[16px] sm:text-[22px] font-black uppercase tracking-[0.25em] leading-relaxed">
            VÁŠ PARTNER V CESTĚ ZA LEPŠÍM JÁ. KVALITA BEZ KOMPROMISŮ.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
          <div className="text-center md:text-left">© {new Date().getFullYear()} FITNESS 77 MLADÁ BOLESLAV</div>
          <div className="flex items-center gap-3">
            <span className="tracking-[0.4em]">DESIGNED BY</span>
            <span className="text-white/60 font-black tracking-widest">L-CODE DYNAMICS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;