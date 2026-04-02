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
    <div className="relative flex overflow-x-hidden border-y border-white/10 bg-black py-4">
      <div className={`flex animate-marquee whitespace-nowrap ${reverse ? 'flex-row-reverse animate-marquee-reverse' : ''}`}>
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className={`mx-4 text-6xl font-black uppercase tracking-tighter ${
              outline 
                ? 'text-transparent stroke-white stroke-2' 
                : 'text-white'
            }`}
            style={{ WebkitTextStroke: outline ? '1px white' : 'none' }}
          >
            {text} •&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
