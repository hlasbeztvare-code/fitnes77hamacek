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
    <footer id="contact" className="bg-[#000000] text-white/40 pt-12 pb-8 px-6 md:px-12 lg:px-20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1500px] mx-auto relative z-10">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row items-start justify-between gap-12 lg:gap-4 text-[9px] font-black uppercase tracking-[0.15em]">

          {/* 1. Logo Section */}
          <div className="col-span-2 md:col-span-1 flex-shrink-0 mb-4 lg:mb-0">
            <div className="relative w-32 h-10">
              <Image src="/images/brand/logo-fitness77.png" alt="Fitness 77" fill className="object-contain brightness-0 invert opacity-80" />
            </div>
            <div className="mt-4 text-white/20 leading-relaxed max-w-[200px]">
              VÁŠ PARTNER V CESTĚ ZA LEPŠÍM JÁ. KVALITA BEZ KOMPROMISŮ.
            </div>
          </div>

          {/* 2. Menu Links */}
          <div className="flex flex-col gap-3 lg:border-l lg:border-white/10 lg:pl-6">
            <span className="text-white/20 text-[7px] mb-1">PROFIL</span>
            <Link href="/supplements" className="hover:text-[#d4ff00]">SUPLEMENTY</Link>
            <Link href="/equipment" className="hover:text-[#d4ff00]">VYBAVENÍ</Link>
            <Link href="/bazaar" className="hover:text-[#d4ff00]">BAZAR</Link>
          </div>

          {/* 3. Legal Links */}
          <div className="flex flex-col gap-3 lg:border-l lg:border-white/10 lg:pl-6">
            <span className="text-white/20 text-[7px] mb-1">PRÁVNÍ</span>
            <Link href="/obchodni-podminky" className="hover:text-[#d4ff00]">PODMÍNKY</Link>
            <Link href="/odstoupeni-od-smlouvy" className="hover:text-[#d4ff00] text-zinc-300">ODSTOUPENÍ</Link>
            <Link href="/privacy" className="hover:text-[#d4ff00]">SOUKROMÍ</Link>
          </div>

          {/* 4. Support Contact */}
          <div className="flex flex-col gap-3 lg:border-l lg:border-white/10 lg:pl-6">
            <span className="text-white/20 text-[7px] mb-1">KONTAKT</span>
            <Link href="tel:+420777105548" className="hover:text-white whitespace-nowrap">+420 777 105 548</Link>
            <Link href="mailto:fitness77@post.cz" className="hover:text-white whitespace-nowrap">FITNESS77@POST.CZ</Link>
          </div>

          {/* 5. Base Location */}
          <div className="flex flex-col gap-3 lg:border-l lg:border-white/10 lg:pl-6">
            <span className="text-white/20 text-[7px] mb-1">PRODEJNA</span>
            <span className="leading-relaxed">JIRÁSKOVA 1320,<br />293 01 MB</span>
          </div>

          {/* 6. Social Master Icons */}
          <div className="flex items-center gap-2 lg:border-l lg:border-white/10 lg:pl-6">
            <a href={socialLinks.tiktok || "#"} target="_blank" className="p-2.5 bg-[#d4ff00] text-black rounded hover:scale-110 mb-0 transition-all shadow-lg shadow-[#d4ff00]/10"><TikTokIcon size={16} /></a>
            <a href={socialLinks.instagram} target="_blank" className="p-2.5 bg-[#d4ff00] text-black rounded hover:scale-110 mb-0 transition-all shadow-lg shadow-[#d4ff00]/10"><Instagram size={16} /></a>
            <a href={socialLinks.facebook} target="_blank" className="p-2.5 bg-[#d4ff00] text-black rounded hover:scale-110 mb-0 transition-all shadow-lg shadow-[#d4ff00]/10"><Facebook size={16} /></a>
          </div>
        </div>

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
