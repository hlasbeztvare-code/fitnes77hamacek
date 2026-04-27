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
    <footer id="contact" className="bg-[#000000] text-white/40 pt-6 pb-6 px-6 md:px-12 lg:px-20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1500px] mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 text-[9px] font-black uppercase tracking-[0.15em]">

        {/* 1. Logo Section */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-10">
            <Image src="/images/brand/logo-fitness77.png" alt="Fitness 77" fill className="object-contain brightness-0 invert opacity-80" />
          </div>
        </div>

        {/* 2. Menu Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-l border-white/10 pl-6 items-center">
          <Link href="/supplements" className="hover:text-[#d4ff00]">SUPLEMENTY</Link>
          <Link href="/equipment" className="hover:text-[#d4ff00]">VYBAVENÍ</Link>
          <Link href="/bazaar" className="hover:text-[#d4ff00]">BAZAR</Link>
          <Link href="/odstoupeni-od-smlouvy" className="hover:text-[#d4ff00] text-zinc-300">ODSTOUPENÍ</Link>
        </div>

        {/* 4. Support Contact */}
        <div className="flex flex-col gap-0.5 border-l border-white/10 pl-6">
          <span className="text-white/20 text-[7px]">CONTACT</span>
          <div className="flex gap-3">
            <Link href="tel:+420777105548" className="hover:text-white whitespace-nowrap">+420 777 105 548</Link>
            <Link href="mailto:fitness77@post.cz" className="hover:text-white whitespace-nowrap">FITNESS77@POST.CZ</Link>
          </div>
        </div>

        {/* 5. Base Location */}
        <div className="flex flex-col gap-0.5 border-l border-white/10 pl-6">
          <span className="text-white/20 text-[7px]">LOCATION</span>
          <span>JIRÁSKOVA 1320, 293 01 MB</span>
        </div>

        {/* 6. Social Master Icons */}
        <div className="flex items-center gap-2 border-l border-white/10 pl-6">
          <a href={socialLinks.tiktok || "#"} target="_blank" className="p-2 bg-[#d4ff00] text-black rounded hover:scale-110 mb-0 transition-all"><TikTokIcon size={14} /></a>
          <a href={socialLinks.instagram} target="_blank" className="p-2 bg-[#d4ff00] text-black rounded hover:scale-110 mb-0 transition-all"><Instagram size={14} /></a>
          <a href={socialLinks.facebook} target="_blank" className="p-2 bg-[#d4ff00] text-black rounded hover:scale-110 mb-0 transition-all"><Facebook size={14} /></a>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[7px] font-black uppercase tracking-[0.3em] text-white/20">
          <div>© {new Date().getFullYear()} FITNESS 77 MLADÁ BOLESLAV</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
