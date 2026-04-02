import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* TADY JE TO KOUZLO PRO HAMÁČKŮV HOSTING */
  output: 'export', 
  
  /* Tohle tam dej, aby ti fungovaly obrázky, pokud je nemáš přes externí URL */
  images: {
    unoptimized: true,
  },
  
  /* Tady můžeš mít svoje další věci, pokud tam nějaký máš */
};

export default nextConfig;