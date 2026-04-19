import Hero from '@/components/gym/Hero';
import Marquee from '@/components/gym/Marquee';
import Services from '@/components/gym/Services';
import Footer from '@/components/gym/Footer';
import Pricing from '@/components/gym/Pricing';
import ClientOverlays from '@/components/gym/ClientOverlays';
import GalleryWrapper from '@/components/gym/GalleryWrapper';

export const revalidate = 60; // ISR pro trenérské stacky

export default function GymPage() {
  return (
    <main className="bg-black min-h-screen text-white font-space">
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
