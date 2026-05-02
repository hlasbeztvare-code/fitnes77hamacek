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
    <footer id="contact" className="bg-[#000000] text-white pt-24 pb-12 px-6 md:px-16 lg:px-32 relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto relative z-10">

        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-20">

          {/* 1. Velké Logo vlevo - zachována velikost dle zadání */}
          <div className="relative w-80 h-32 md:w-[450px] md:h-44 -ml-6 lg:ml-0">
            <Image
              src="/images/brand/logo-fitness77.png"
              alt="Fitness 77"
              fill
              sizes="(max-width: 768px) 320px, 450px"
              className="object-contain brightness-0 invert"
              priority
            />
          </div>

          {/* 2. Menu sekce */}
          <div className="flex flex-col gap-4 pt-4">
            <span className="text-[#e10600] text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">Menu</span>
            {[
              { label: 'SUPLEMENTY', href: '/supplements' },
              { label: 'VYBAVENÍ', href: '/equipment' },
              { label: 'BAZAR', href: '/bazaar' },
              { label: 'GYM', href: '/' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-lg font-black uppercase tracking-tighter text-white hover:text-[#d4ff00] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* 3. Location & Connect */}
          <div className="flex flex-col gap-8 pt-4">
            <div className="space-y-2">
              <span className="text-[#e10600] text-[10px] font-black uppercase tracking-[0.4em]">Location</span>
              <h4 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter leading-none text-white whitespace-nowrap">Fitness77 MB</h4>
              <p className="text-white/60 text-sm font-bold uppercase tracking-widest mt-2">Jiráskova 1320, 293 01</p>
            </div>
            <div className="space-y-2">
              <span className="text-[#e10600] text-[10px] font-black uppercase tracking-[0.4em]">Connect</span>
              <Link href="mailto:fitness77@post.cz" className="text-xl lg:text-2xl font-black uppercase tracking-tighter text-white hover:text-[#d4ff00] transition-colors block">
                fitness77@post.cz
              </Link>
            </div>
          </div>

          {/* 4. Contact & Social Green Buttons */}
          <div className="flex flex-col gap-2">
            <span className="text-[#d4ff00] text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
              Direct Performance Line
            </span>
            <Link href="tel:+420777105548" className="text-4xl lg:text-5xl font-black tracking-tighter text-white hover:text-[#e10600] transition-colors block">
              +420 777 105 548
            </Link>

            {/* Zelená High-End sociální tlačítka */}
            <div className="flex gap-3 mt-8">
              <a
                href={socialLinks.tiktok || "#"}
                target="_blank"
                className="flex items-center justify-center w-12 h-12 bg-[#d4ff00] text-black rounded-xl hover:scale-110 hover:bg-white transition-all shadow-lg shadow-[#d4ff00]/20"
                title="TikTok"
              >
                <TikTokIcon size={24} />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                className="flex items-center justify-center w-12 h-12 bg-[#d4ff00] text-black rounded-xl hover:scale-110 hover:bg-white transition-all shadow-lg shadow-[#d4ff00]/20"
                title="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                className="flex items-center justify-center w-12 h-12 bg-[#d4ff00] text-black rounded-xl hover:scale-110 hover:bg-white transition-all shadow-lg shadow-[#d4ff00]/20"
                title="Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom - Copyright Update */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            © 2026 L-Code Dynamics - Jan Lančarič
          </p>
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 bg-[#e10600]" />
            <div className="w-1.5 h-1.5 bg-[#d4ff00]" />
            <div className="w-1.5 h-1.5 bg-white/20" />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;