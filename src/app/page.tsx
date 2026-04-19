// Server Component

import dynamic from 'next/dynamic';
import Hero from '@/components/gym/Hero';
import Marquee from '@/components/gym/Marquee';
import ClientOverlays from '@/components/gym/ClientOverlays';
import GalleryWrapper from '@/components/gym/GalleryWrapper';

const Services = dynamic(() => import('@/components/gym/Services'), { ssr: true });
const Pricing = dynamic(() => import('@/components/gym/Pricing'), { ssr: true });
const Footer = dynamic(() => import('@/components/gym/Footer'), { ssr: true });


export default function HomePage() {
  return (
    <main className="bg-black min-h-screen text-white font-space relative">
      <style dangerouslySetInnerHTML={{ __html: '#main-global-footer { display: none !important; }' }} />
      
      <ClientOverlays />
      
      <Hero />
      
      <Marquee text="PRÉMIOVÝ GYM V MLADÉ BOLESLAVI • BEZ KOMPROMISŮ" speed={15} />
      
      <Services />
      
      <GalleryWrapper />
      
      <Marquee text="JOIN THE MOVEMENT • F77 • NO LIMITS" speed={25} reverse outline />
      
      <Pricing />
      
      <Footer />
    </main>
  );
}
