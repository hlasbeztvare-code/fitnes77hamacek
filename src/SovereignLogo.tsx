import React from 'react';

interface LogoProps {
  className?: string;
  isArchitectMode?: boolean;
}

const SovereignLogo: React.FC<LogoProps> = ({ className = '', isArchitectMode = false }) => {
  const goldColor = "#C5A27D";
  const platinumColor = "#FFFFFF";

  return (
    <svg 
      viewBox="0 0 500 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`transition-colors duration-1000 ${className}`}
      aria-label="Sovereign Lucky Logo"
    >
      <defs>
        {/* Krystalický gradient pro Architect mód */}
        <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D9E2EC" stopOpacity="1" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#9FB3C8" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* SYMBOL: Spojení organického zlata a krystalického řádu */}
      <g 
        id="symbol" 
        className="transition-transform duration-1000 origin-center"
        style={{ transform: isArchitectMode ? 'rotate(45deg)' : 'rotate(0deg)' }}
      >
        {/* Základní organická forma (Zlato / Temně šedá) */}
        <path 
          d="M60 40C40 60 50 90 70 100C90 110 120 100 130 80C140 60 130 30 110 20C90 10 80 20 60 40Z" 
          fill={isArchitectMode ? platinumColor : goldColor} 
          className="transition-colors duration-1000"
          opacity={isArchitectMode ? 0.2 : 1}
        />
        {/* Krystalické hrany (Bílá v Architect módu, Zlato v normálním) */}
        <path 
          d="M85 10L110 40L135 70L110 100L85 70L60 40L85 10Z" 
          stroke={isArchitectMode ? "url(#crystalGradient)" : goldColor} 
          strokeWidth="3" 
          fill={isArchitectMode ? platinumColor : "none"} 
          className="transition-all duration-1000" 
          strokeLinecap="square"
          opacity={isArchitectMode ? 1 : 0.6}
        />
      </g>

      {/* TYPOGRAFIE: Monolitický nápis 'Lucky' */}
      <text 
        x="160" 
        y="95" 
        fontFamily="'JetBrains Mono', 'Fira Code', monospace" 
        fontSize="100" 
        fontWeight="900" 
        letterSpacing="-0.08em" 
        fill={isArchitectMode ? platinumColor : goldColor}
        className="transition-colors duration-1000 uppercase"
      >
        Lucky
      </text>
      
      {/* Podtitul 'Sovereign' */}
      <text 
        x="160" 
        y="125" 
        fontFamily="'JetBrains Mono', monospace" 
        fontSize="18" 
        fontWeight="300" 
        letterSpacing="0.6em" 
        fill={isArchitectMode ? platinumColor : goldColor}
        className="transition-colors duration-1000 uppercase opacity-60"
      >
        Sovereign
      </text>
    </svg>
  );
};

export default SovereignLogo;
