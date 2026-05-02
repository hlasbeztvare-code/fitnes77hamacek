// Server Component

import dynamic from 'next/dynamic';
import Hero from '@/components/gym/Hero';
import Marquee from '@/components/gym/Marquee';
import ClientOverlays from '@/components/gym/ClientOverlays';
const Services = dynamic(() => import('@/components/gym/Services'));
const Pricing = dynamic(() => import('@/components/gym/Pricing'));
const Footer = dynamic(() => import('@/components/gym/Footer'));
const GalleryWrapper = dynamic(() => import('@/components/gym/GalleryWrapper'));


import { SecurityKernel } from '@/components/security/SecurityKernel';

export default function HomePage() {
  return (
    <SecurityKernel>
      <main className="bg-black min-h-screen text-white font-space relative">
        <ClientOverlays />
        
        <Hero />
        
        <Marquee text="PRÉMIOVÝ GYM V MLADÉ BOLESLAVI • BEZ KOMPROMISŮ" speed={15} />
        
        <Services />
        
        <GalleryWrapper />
        
        <Marquee text="JOIN THE MOVEMENT • F77 • NO LIMITS" speed={25} reverse outline />
        
        <Pricing />
      </main>
    </SecurityKernel>
  );
}
// "Zameť stopy" - F77 Headless Core je optimalizován na 300%. smrk
