import React from 'react';

interface MarqueeProps {
  text: string;
  speed?: number;
  reverse?: boolean;
  outline?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({ 
  text, 
  speed = 20, 
  reverse = false, 
  outline = false 
}) => {
  return (
    <div className="relative flex overflow-x-hidden border-y border-white/10 bg-black py-10">
      <div className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className={`mx-4 text-7xl font-black uppercase tracking-tighter ${
              outline 
                ? 'text-transparent' 
                : 'text-white'
            }`}
            style={{ 
              WebkitTextStroke: outline ? '2px rgba(255,255,255,0.3)' : 'none' 
            }}
          >
            {text} •&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
