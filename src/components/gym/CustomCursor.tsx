import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isGallery, setIsGallery] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [role="button"], .interactive');
      const isGalleryTarget = target.closest('.gallery-item');
      setIsHovered(!!isClickable);
      setIsGallery(!!isGalleryTarget);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#d4ff00] rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-[#d4ff00]/40 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovered ? 2.5 : isGallery ? 4 : 1,
          backgroundColor: isGallery ? 'rgba(212, 255, 0, 0.1)' : 'transparent',
          borderWidth: isGallery ? 0 : 1,
        }}
      >
        {isGallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex items-center justify-center text-[6px] font-black text-[#d4ff00] tracking-widest uppercase"
          >
            Explore
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
