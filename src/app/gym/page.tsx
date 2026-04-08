"use client";

import Hero from '@/components/gym/Hero';
import Marquee from '@/components/gym/Marquee';
import Services from '@/components/gym/Services';
import HorizontalGallery from '@/components/gym/HorizontalGallery';
import Pricing from '@/components/gym/Pricing';
import Footer from '@/components/gym/Footer';
import CustomCursor from '@/components/gym/CustomCursor';
import SmoothScroll from '@/components/gym/SmoothScroll';
import FloatingPhotos from '@/components/gym/FloatingPhotos';

function App() {
  return (
    <main className="bg-black min-h-screen text-white font-space">
      <SmoothScroll />
        <CustomCursor />
        <FloatingPhotos />
        
        <Hero />
      
      <Marquee text="PRÉMIOVÝ GYM V MLADÉ BOLESLAVI • BEZ KOMPROMISŮ" speed={15} />
      
      <Services />
      
      <HorizontalGallery />
      
      <Marquee text="JOIN THE MOVEMENT • F77 • NO LIMITS" speed={25} reverse outline />
      
      <Pricing />
      
      <Footer />
    </main>
  );
}

export default App;
