"use client";

import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/lib/social';
import Image from 'next/image';
import Link from 'next/link';

// Jednoduchá ikona pro TikTok, protože v lucide-react standardně není
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#000000] text-white/40 pt-16 pb-8 px-6 md:px-12 lg:px-20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1500px] mx-auto relative z-10">
        
        <div className="flex flex-col lg:flex-row lg:justify-between gap-x-12 gap-y-16">

          {/* 1. Logo & About - Centered on Mobile */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left min-w-[240px]">
            <div className="relative w-40 h-12 mb-6">
              <Image src="/images/brand/logo-fitness77.png" alt="Fitness 77" fill className="object-contain brightness-0 invert opacity-90" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 leading-relaxed max-w-[250px]">
              VÁŠ PARTNER V CESTĚ ZA LEPŠÍM JÁ. <br className="hidden lg:block" /> KVALITA BEZ KOMPROMISŮ.
            </p>
            
            {/* Socials for Mobile - Centered */}
            <div className="flex items-center gap-3 mt-8 lg:mt-10">
              <a href={socialLinks.tiktok || "#"} target="_blank" aria-label="TikTok" className="w-10 h-10 bg-[#d4ff00] text-black rounded-lg hover:scale-110 transition-all shadow-lg shadow-[#d4ff00]/10 flex items-center justify-center"><TikTokIcon size={18} /></a>
              <a href={socialLinks.instagram} target="_blank" aria-label="Instagram" className="w-10 h-10 bg-[#d4ff00] text-black rounded-lg hover:scale-110 transition-all shadow-lg shadow-[#d4ff00]/10 flex items-center justify-center"><Instagram size={18} /></a>
              <a href={socialLinks.facebook} target="_blank" aria-label="Facebook" className="w-10 h-10 bg-[#d4ff00] text-black rounded-lg hover:scale-110 transition-all shadow-lg shadow-[#d4ff00]/10 flex items-center justify-center"><Facebook size={18} /></a>
            </div>
          </div>

          {/* Links Grid - Mobile Optimized Stacking */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 flex-grow lg:border-l lg:border-white/5 lg:pl-12">
            
            {/* 2. Menu Links */}
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <span className="text-white/20 text-[8px] font-black tracking-[0.4em] uppercase mb-2">PROFIL</span>
              <div className="flex flex-col gap-3 text-[11px] font-black tracking-widest uppercase">
                <Link href="/supplements" className="hover:text-[#d4ff00] transition-colors">SUPLEMENTY</Link>
                <Link href="/equipment" className="hover:text-[#d4ff00] transition-colors">VYBAVENÍ</Link>
                <Link href="/bazaar" className="hover:text-[#d4ff00] transition-colors">BAZAR</Link>
              </div>
            </div>

            {/* 3. Support Contact */}
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <span className="text-white/20 text-[8px] font-black tracking-[0.4em] uppercase mb-2">KONTAKT</span>
              <div className="flex flex-col gap-3 text-[11px] font-black tracking-widest uppercase">
                <Link href="tel:+420777105548" className="hover:text-[#d4ff00] transition-colors whitespace-nowrap">+420 777 105 548</Link>
                <Link href="mailto:fitness77@post.cz" className="hover:text-[#d4ff00] transition-colors whitespace-nowrap lowercase font-medium tracking-normal text-[12px]">fitness77@post.cz</Link>
              </div>
            </div>

            {/* 4. Base Location */}
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <span className="text-white/20 text-[8px] font-black tracking-[0.4em] uppercase mb-2">PRODEJNA</span>
              <div className="flex flex-col gap-2 text-[11px] font-black tracking-widest uppercase leading-loose">
                <span className="text-white/60">JIRÁSKOVA 1320,<br />293 01 MB</span>
              </div>
            </div>

            {/* 5. Legal Links */}
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <span className="text-white/20 text-[8px] font-black tracking-[0.4em] uppercase mb-2">PRÁVNÍ</span>
              <div className="flex flex-col gap-3 text-[11px] font-black tracking-widest uppercase">
                <Link href="/obchodni-podminky" className="hover:text-[#d4ff00] transition-colors">PODMÍNKY</Link>
                <Link href="/odstoupeni-od-smlouvy" className="text-[#d4ff00] font-bold border-b border-[#d4ff00]/20 pb-0.5 inline-block w-fit mx-auto sm:mx-0">ODSTOUPENÍ</Link>
                <Link href="/privacy" className="hover:text-[#d4ff00] transition-colors">SOUKROMÍ</Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[8px] font-black uppercase tracking-[0.4em] text-white/10">
          <div className="text-center md:text-left">© {new Date().getFullYear()} FITNESS 77 MLADÁ BOLESLAV</div>
          <div className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity">
            <span className="tracking-[0.6em]">DESIGNED BY</span>
            <span className="text-white/40 font-black tracking-widest">L-CODE DYNAMICS</span>
          </div>
        </div>
      </div>
    </footer>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[7px] font-black uppercase tracking-[0.3em] text-white/20">
          <div>© {new Date().getFullYear()} FITNESS 77 MLADÁ BOLESLAV</div>
          <div className="flex items-center gap-2">
            <span>DESIGNED BY</span>
            <span className="text-white/40">L-CODE DYNAMICS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
