'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Type, 
  Image as ImageIcon, 
  Layers, 
  Download, 
  Plus, 
  Trash2, 
  ChevronRight,
  Sparkles,
  Maximize,
  Hash
} from 'lucide-react';

/**
 * GOLIÁŠ | AD FACTORY V1.0
 * Interní nástroj pro tvorbu brutálních reklamních vizuálů.
 */

const BRUTAL_FONTS = [
  { id: 'inter', name: 'Inter Black', class: 'font-black' },
  { id: 'outfit', name: 'Outfit Heavy', class: 'font-[900]' },
];

const BRAND_COLORS = [
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'F77 Red', hex: '#E10600' },
  { name: 'F77 Pink', hex: '#FF00FF' },
  { name: 'Acid Green', hex: '#CCFF00' },
];

const MASTER_BACKGROUNDS = [
  { id: 'neon-burst', name: '🔥 Neon Burst (Aggressive)', url: '/images/studio/neon-burst.png' },
  { id: 'science', name: '🧪 Science Lab (Clean)', url: '/images/studio/science.png' },
  { id: 'industrial', name: '⛓️ Industrial Chain (Power)', url: '/images/studio/industrial.png' },
  { id: 'toxic', name: '☢️ Toxic Acid (Energy)', url: '/images/studio/toxic.png' },
  { id: 'toxic-rice', name: '☢️ Toxic Rice (Cream of Rice)', url: '/images/studio/toxic-rice.png' },
  { id: 'black-dead', name: '💀 Black Dead Studio', url: '/images/studio/black-dead.png' },
  { id: 'dead-pump', name: '✨ Dead Pump Glow', url: '/images/studio/dead-pump.png' },
];

const COPY_TEMPLATES = [
  {
    id: 'energy',
    name: '🔥 AGRESIVNÍ START',
    headline: 'BLACK DEAD\nPRE-WORKOUT',
    subheadline: 'LEGÁLNÍ ZBRAŇ PRO TVŮJ TRÉNINK.\nNEJSILNĚJŠÍ SLOŽENÍ NA TRHU.',
    bullets: [
      '⚡ Extrémní energie a focus',
      '🩸 Brutální prokrvení svalů',
      '🎯 Maximální koncentrace',
      '🚫 Žádný crash efekt'
    ],
    footer: 'STOP WEAKNESS. START TRAINING.'
  },
  {
    id: 'recovery',
    name: '🧪 MAXIMUM RECOVERY',
    headline: 'BCAA 4:1:1 +\nGLUTAMINE',
    subheadline: 'NOT JUST RECOVERY.\nIT\'S TOTAL CONTROL.',
    bullets: [
      '💪 Ochrana svalové hmoty',
      '🔄 Zrychlená regenerace',
      '⚡ Stabilní výkon bez vyhoření',
      '🧠 Podpora dlouhodobého progresu'
    ],
    footer: 'TRAIN HARD, RECOVER SMART.'
  },
  {
    id: 'brand',
    name: '🛡️ FITNESS 77 BRAND',
    headline: 'BEZ KOMPROMISŮ.\nFITNESS 77.',
    subheadline: 'KVALITA Z MLADÉ BOLESLAVI.\nPRO TY, CO CHTĚJÍ VÍC.',
    bullets: [
      '🏆 Prémiové suroviny',
      '🧬 Vlastní receptury',
      '🏋️‍♀️ Testováno profi atlety',
      '📦 Bleskové doručení'
    ],
    footer: 'PRVNÍ VOLBA ŠAMPIONŮ.'
  },
  {
    id: 'elite',
    name: '👑 ELITE STATUS (EGO)',
    headline: 'PALIVO PRO\nTOP 1 %',
    subheadline: 'NEHRAJEŠ SI. VYHRÁVÁŠ.\nLIMITOVANÁ ŠARŽE PRO ELITU.',
    bullets: [
      '💎 Exkluzivní složení',
      '🎖️ Standard šampionů',
      '🛡️ Žádné kompromisy',
      '🔒 Garantovaný progres'
    ],
    footer: 'BECOME UNSTOPPABLE.'
  },
  {
    id: 'fomo',
    name: '⏳ POSLEDNÍ ŠANCE (FOMO)',
    headline: 'SKLAD SE\nPRÁZDNÍ.',
    subheadline: 'TISÍCE LIDÍ UŽ MAJÍ NÁKUP.\nTY POŘÁD JEN KOUKÁŠ?',
    bullets: [
      '🔥 Obrovská poptávka',
      '📦 Posledních pár kusů',
      '🛑 Už se nemusí opakovat',
      '🏃‍♂️ Jednej, nebo lituj'
    ],
    footer: 'LAST CHANCE TO WIN.'
  },
  {
    id: 'excuses',
    name: '⚡ ZERO EXCUSES (DRIVE)',
    headline: 'VÝMLUVY\nNEPÁLÍ TUK.',
    subheadline: 'TVOJE KONKURENCE NYNÍ TRÉNUJE.\nUŽ SE K NÍ NEPŘIDÁŠ?',
    bullets: [
      '🦾 Okamžitý restart',
      '🔥 Spalování na max',
      '🚫 Konec prokrastinace',
      '🎯 Tvůj cíl je blíž'
    ],
    footer: 'STOP TALKING. START ACTING.'
  }
];

export default function SocialDashboard() {
  const [headline, setHeadline] = useState('BCAA 4:1:1 + \nGLUTAMINE');
  const [subheadline, setSubheadline] = useState('NOT JUST RECOVERY.\nIT\'S TOTAL CONTROL.');
  const [footer, setFooter] = useState('REALITY: TRAIN HARD, RECOVER SMART.');
  
  const applyTemplate = (tpl: typeof COPY_TEMPLATES[0]) => {
    setHeadline(tpl.headline);
    setSubheadline(tpl.subheadline);
    setBullets(tpl.bullets);
    setFooter(tpl.footer);
  };
  
  const [headlineColor, setHeadlineColor] = useState('#FF00FF');
  const [subColor, setSubColor] = useState('#FFFFFF');
  const [bulletColor, setBulletColor] = useState('#FFFFFF');
  const [footerColor, setFooterColor] = useState('#FFFFFF');

  const [glowIntensity, setGlowIntensity] = useState(20);
  const [hasShadow, setHasShadow] = useState(true);
  const [isNeon, setIsNeon] = useState(true);

  const [selectedBg, setSelectedBg] = useState(MASTER_BACKGROUNDS[0].url);
  const [selectedProductImg, setSelectedProductImg] = useState('/images/brand/logo-fitness77.png'); // Default if no prod images
  const [productX, setProductX] = useState(0);
  const [productY, setProductY] = useState(0);
  const [productScale, setProductScale] = useState(1);
  const [productRotation, setProductRotation] = useState(0);
  
  const [canvasFormat, setCanvasFormat] = useState<'feed' | 'stories' | 'portrait'>('portrait');
  const [fgEffect, setFgEffect] = useState<'none' | 'fire' | 'frost' | 'water' | 'smoke' | 'toxic-mist'>('none');
  const [productSurface, setProductSurface] = useState<'none' | 'frosty' | 'wet'>('none');
  const [showCTA, setShowCTA] = useState(true);

  const [activeFont, setActiveFont] = useState(BRUTAL_FONTS[0]);

  const PRODUCT_ASSETS = [
    { name: 'Black Dead Bottle', url: '/images/products/black-dead-pure.png' },
    { name: 'Creatine Tub', url: '/images/products/creatine-pure.png' },
    { name: 'Rice Porridge', url: '/images/products/rice-pure.png' },
  ];
  
  const [bullets, setBullets] = useState([
    '💪 Muscle protection every workout',
    '🔄 Faster recovery with BCAA',
    '⚡ Stable performance',
    '🧠 Supports long-term progress'
  ]);

  const canvasRef = useRef<HTMLDivElement>(null);

  const addBullet = () => setBullets([...bullets, 'Nová odrážka...']);
  const removeBullet = (index: number) => setBullets(bullets.filter((_, i) => i !== index));
  const updateBullet = (index: number, val: string) => {
    const newBullets = [...bullets];
    newBullets[index] = val;
    setBullets(newBullets);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto">
        
        <header className="mb-8 flex items-center justify-between border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-3 text-[#E10600] mb-2">
              <Sparkles size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Ad Factory v1.0</span>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">GOLIÁŠ <span className="text-zinc-500">STUDIO</span></h1>
          </div>
          <button className="bg-white text-black px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-2">
            <Download size={16} /> Exportovat vizuál
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* EDITOR SIDEBAR */}
          <div className="lg:col-span-4 space-y-8 h-[calc(100vh-200px)] overflow-y-auto pr-4 scrollbar-hide">
            
            {/* Copy Templates */}
            <section className="bg-zinc-900/50 border border-white/5 p-6 space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center gap-2">
                <Sparkles size={14} /> 00. Copywriter Library
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {COPY_TEMPLATES.map((tpl) => (
                  <button 
                    key={tpl.id}
                    onClick={() => applyTemplate(tpl)}
                    className="group text-left p-4 bg-black border border-white/5 hover:border-[#E10600] transition-all relative overflow-hidden"
                  >
                    <div className="text-[10px] font-black uppercase tracking-widest mb-1">{tpl.name}</div>
                    <div className="text-[9px] text-zinc-500 uppercase tracking-tighter truncate opacity-60 group-hover:opacity-100">{tpl.headline.replace('\n', ' ')}</div>
                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={14} className="text-[#E10600]" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Background selection */}
            <section className="bg-zinc-900/50 border border-white/5 p-6 space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center gap-2">
                <ImageIcon size={14} /> 01. Studio Backgrounds
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {MASTER_BACKGROUNDS.map((bg) => (
                  <button 
                    key={bg.id}
                    onClick={() => setSelectedBg(bg.url)}
                    className={`relative aspect-square border-2 transition-all overflow-hidden ${selectedBg === bg.url ? 'border-[#E10600]' : 'border-transparent opacity-50 hover:opacity-80'}`}
                  >
                    <img src={bg.url} alt={bg.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </section>

            {/* Product Layer Control */}
            <section className="bg-zinc-900/50 border border-white/5 p-6 space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center gap-2">
                <Layers size={14} /> 02. Product Layer (Pixsla)
              </h2>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {PRODUCT_ASSETS.map((p, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedProductImg(p.url)}
                    className={`aspect-square bg-black border p-2 transition-all ${selectedProductImg === p.url ? 'border-white' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                  >
                    <img src={p.url} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              <div className="space-y-4 text-white">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 flex justify-between">Position X <span>{productX}px</span></label>
                  <input type="range" min="-400" max="400" value={productX} onChange={(e) => setProductX(parseInt(e.target.value))} className="w-full accent-[#E10600]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 flex justify-between">Position Y <span>{productY}px</span></label>
                  <input type="range" min="-400" max="400" value={productY} onChange={(e) => setProductY(parseInt(e.target.value))} className="w-full accent-[#E10600]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 flex justify-between">Scale <span>{productScale}</span></label>
                  <input type="range" min="0.1" max="3" step="0.05" value={productScale} onChange={(e) => setProductScale(parseFloat(e.target.value))} className="w-full accent-[#E10600]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 flex justify-between">Rotation <span>{productRotation}°</span></label>
                  <input type="range" min="-180" max="180" value={productRotation} onChange={(e) => setProductRotation(parseInt(e.target.value))} className="w-full accent-[#E10600]" />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                {['none', 'frosty', 'wet'].map(s => (
                  <button 
                    key={s} 
                    onClick={() => setProductSurface(s as any)}
                    className={`flex-1 py-2 text-[8px] font-black uppercase border ${productSurface === s ? 'bg-white text-black border-white' : 'border-white/10 text-white/40'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            {/* Atmosphere & Formats */}
            <section className="bg-zinc-900/50 border border-white/5 p-6 space-y-6">
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center gap-2 mb-4">
                  <Maximize size={14} /> 03. Format Selector
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'feed', name: 'Feed (1:1)', class: 'aspect-square' },
                    { id: 'portrait', name: 'Portrait (4:5)', class: 'aspect-[4/5]' },
                    { id: 'stories', name: 'Stories (9:16)', class: 'aspect-[9/16]' },
                  ].map((f) => (
                    <button 
                      key={f.id}
                      onClick={() => setCanvasFormat(f.id as any)}
                      className={`flex flex-col items-center gap-2 p-3 border transition-all ${canvasFormat === f.id ? 'bg-[#E10600] border-[#E10600]' : 'border-white/10 text-white/40 hover:text-white'}`}
                    >
                      <div className={`w-4 h-6 border-2 border-current rounded-[1px] ${f.id === 'feed' ? 'aspect-square h-4' : ''}`} />
                      <div className="text-[8px] font-black uppercase tracking-tighter">{f.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center gap-2">
                  <Sparkles size={14} /> 04. Atmosphere FX
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {['none', 'fire', 'frost', 'water', 'smoke', 'toxic-mist'].map((eff) => (
                    <button 
                      key={eff}
                      onClick={() => setFgEffect(eff as any)}
                      className={`py-2 text-[8px] font-black uppercase tracking-widest border transition-all ${fgEffect === eff ? 'bg-white text-black border-white' : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white'}`}
                    >
                      {eff.replace('-', ' ')}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500">Shop Now Button</label>
                    <button 
                      onClick={() => setShowCTA(!showCTA)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${showCTA ? 'bg-green-500' : 'bg-zinc-800'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${showCTA ? 'left-6' : 'left-1'}`} />
                    </button>
                </div>
              </div>
            </section>

            {/* Typography & Colors */}
            <section className="bg-zinc-900/50 border border-white/5 p-6 space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center gap-2">
                <Type size={14} /> 02. Typography & Colors
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 block mb-2">Headline Text & Color</label>
                  <div className="flex gap-2 mb-2">
                    <input type="color" value={headlineColor} onChange={(e) => setHeadlineColor(e.target.value)} className="w-10 h-10 bg-transparent border-none cursor-pointer" />
                    <textarea 
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      className="flex-1 bg-black border border-white/10 p-3 text-xs font-bold focus:border-[#E10600] outline-none"
                      rows={2}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 block mb-2">Subheadline & Color</label>
                  <div className="flex gap-2">
                    <input type="color" value={subColor} onChange={(e) => setSubColor(e.target.value)} className="w-8 h-8 bg-transparent border-none cursor-pointer" />
                    <textarea 
                      value={subheadline}
                      onChange={(e) => setSubheadline(e.target.value)}
                      className="flex-1 bg-black border border-white/10 p-3 text-[10px] font-medium focus:border-[#E10600] outline-none"
                      rows={2}
                    />
                  </div>
                </div>

                <div>
                   <label className="text-[9px] uppercase tracking-wider text-zinc-500 block mb-2">Bullet Color</label>
                   <div className="flex gap-2 items-center">
                      <input type="color" value={bulletColor} onChange={(e) => setBulletColor(e.target.value)} className="w-8 h-8 bg-transparent border-none cursor-pointer" />
                      <div className="flex gap-1">
                        {BRAND_COLORS.map(c => (
                          <button key={c.hex} onClick={() => setBulletColor(c.hex)} className="w-4 h-4 rounded-full" style={{ backgroundColor: c.hex }} />
                        ))}
                      </div>
                   </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">FX Engine</h3>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500">Neon Glow</label>
                    <button 
                      onClick={() => setIsNeon(!isNeon)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${isNeon ? 'bg-[#FF00FF]' : 'bg-zinc-800'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isNeon ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>

                  {isNeon && (
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-zinc-500 block mb-1">Glow Intensity</label>
                      <input 
                        type="range" min="0" max="100" 
                        value={glowIntensity}
                        onChange={(e) => setGlowIntensity(parseInt(e.target.value))}
                        className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer accent-[#FF00FF]"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500">Hard Shadow</label>
                    <button 
                      onClick={() => setHasShadow(!hasShadow)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${hasShadow ? 'bg-[#E10600]' : 'bg-zinc-800'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${hasShadow ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Bullets editor */}
            <section className="bg-zinc-900/50 border border-white/5 p-6 space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center gap-2">
                <Layers size={14} /> 03. Feature Bullets
              </h2>
              <div className="space-y-2">
                {bullets.map((b, i) => (
                  <div key={i} className="flex gap-2">
                    <input 
                      value={b}
                      onChange={(e) => updateBullet(i, e.target.value)}
                      className="flex-1 bg-black border border-white/10 p-2 text-[11px] outline-none focus:border-[#E10600]"
                    />
                    <button onClick={() => removeBullet(i)} className="p-2 text-zinc-600 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                ))}
                <button 
                  onClick={addBullet}
                  className="w-full py-2 border border-dashed border-white/10 text-[9px] uppercase font-black tracking-widest hover:bg-white/5"
                >
                  <Plus size={12} className="inline mr-2" /> Přidat výhodu
                </button>
              </div>
            </section>

            {/* Footer */}
            <section className="bg-zinc-900/50 border border-white/5 p-6">
               <label className="text-[9px] uppercase tracking-wider text-zinc-500 block mb-2">Footer Claim</label>
               <input 
                  value={footer}
                  onChange={(e) => setFooter(e.target.value)}
                  className="w-full bg-black border border-white/10 p-3 text-[10px] outline-none"
               />
            </section>

            {/* Hashtag Generator */}
            <section className="bg-red-600/10 border border-red-600/20 p-6 space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center gap-2">
                <Hash size={14} /> Goliáš Hashtags
              </h2>
              <div className="bg-black/40 p-4 border border-white/5 text-[9px] font-mono text-zinc-400 break-all">
                #fitness77 #hamacek #gymlife #training #bodybuilding #supplements #czechfitness #fitnessmotivation #fit77 #brutal #nopainnogain
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText('#fitness77 #hamacek #gymlife #training #bodybuilding #supplements #czechfitness #fitnessmotivation #fit77 #brutal #nopainnogain')}
                className="w-full py-2 bg-red-600/20 hover:bg-red-600/40 text-[9px] font-black uppercase tracking-[0.2em] transition-all"
              >
                Copy Hashtags
              </button>
            </section>

          </div>

          {/* PREVIEW CANVAS */}
          <div className="lg:col-span-8 flex justify-center sticky top-8">
            <div 
              id="ad-canvas"
              ref={canvasRef}
              className={`relative bg-black shadow-[0_0_100px_rgba(225,6,0,0.1)] border border-white/10 transition-all duration-500 origin-top overflow-hidden
                ${canvasFormat === 'feed' ? 'aspect-square w-full max-w-[500px]' : 
                  canvasFormat === 'stories' ? 'aspect-[9/16] h-[calc(100vh-160px)]' : 
                  'aspect-[4/5] w-full max-w-[500px]'}
              `}
            >
              {/* MASTER CANVAS BACKGROUND */}
              <div 
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${selectedBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />

              {/* Overlay Gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 opacity-80 z-10" />

              {/* PRODUCT LAYER */}
              <div 
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
              >
                <div className="relative">
                  <motion.img 
                    animate={{ x: productX, y: productY, scale: productScale, rotate: productRotation }}
                    src={selectedProductImg}
                    className={`max-h-[70vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all
                      ${productSurface === 'frosty' ? 'brightness-125 contrast-75 saturate-50 blur-[0.5px]' : ''}
                      ${productSurface === 'wet' ? 'brightness-110 contrast-125 saturate-125' : ''}
                    `}
                  />
                  {productSurface === 'frosty' && (
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl mix-blend-screen opacity-30 animate-pulse pointer-events-none" />
                  )}
                </div>
              </div>

              {/* FOREGROUND EFFECTS */}
              {fgEffect !== 'none' && (
                <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                   {fgEffect === 'toxic-mist' && <div className="w-full h-full bg-gradient-to-t from-[#CCFF00]/40 to-transparent blur-3xl animate-pulse" />}
                   {fgEffect === 'smoke' && <div className="w-full h-full bg-gradient-to-tr from-white/10 to-transparent blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />}
                   {fgEffect === 'fire' && (
                     <div className="w-full h-full relative">
                        <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-[#E10600]/60 via-[#FF8000]/20 to-transparent blur-2xl animate-pulse" />
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20 invert mix-blend-screen animate-bounce" style={{ animationDuration: '0.1s' }} />
                     </div>
                   )}
                   {fgEffect === 'frost' && (
                     <div className="w-full h-full bg-gradient-to-b from-[#00FFFF]/20 via-white/10 to-transparent blur-3xl mix-blend-screen animate-pulse" />
                   )}
                   {fgEffect === 'water' && (
                     <div className="w-full h-full relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1877F2]/10 via-[#00FFFF]/5 to-[#1877F2]/10 blur-xl animate-pulse" />
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/water.png')] animate-pulse" />
                     </div>
                   )}
                </div>
              )}

              {/* LOGO */}
              <div className="absolute top-10 right-10 flex flex-col items-end gap-1 z-40">
                 <img src="/images/brand/logo-fitness77.png" className="w-24 grayscale invert opacity-90" alt="Logo" />
                 <div className="text-[8px] font-black tracking-[0.2em] text-white/50 uppercase italic">Est. 2024</div>
              </div>

              {/* AD CONTENT */}
              <div className="relative h-full p-12 flex flex-col justify-between z-50">
                
                <div className="space-y-6">
                   <motion.h2 
                    key={headline}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${canvasFormat === 'stories' ? 'text-7xl' : 'text-6xl'} font-[1000] uppercase italic leading-[0.9] tracking-tighter`}
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      textShadow: isNeon ? `0 0 ${glowIntensity/2}px ${headlineColor}, 0 0 ${glowIntensity}px ${headlineColor}` : (hasShadow ? '10px 10px 0px rgba(0,0,0,0.8)' : 'none')
                    }}
                   >
                     {headline.split('\n').map((line, i) => (
                       <div key={i} className={i % 2 === 1 ? '' : 'text-white'} style={{ color: i % 2 === 1 ? headlineColor : undefined }}>
                         {line}
                       </div>
                     ))}
                   </motion.h2>

                   <div className="space-y-1">
                      {subheadline.split('\n').map((line, i) => (
                        <div key={i} className={`${canvasFormat === 'stories' ? 'text-[16px]' : 'text-[12px]'} font-black uppercase tracking-wider`} 
                          style={{ 
                            color: i === 1 ? headlineColor : (i === 0 ? subColor : subColor),
                            textShadow: isNeon ? `0 0 ${glowIntensity/4}px ${headlineColor}` : (hasShadow ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none')
                          }}
                        >
                          {line}
                        </div>
                      ))}
                   </div>

                   <div className="pt-8 space-y-4">
                      {bullets.map((b, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-1.5 h-1.5 bg-white rotate-45" style={{ backgroundColor: bulletColor, boxShadow: isNeon ? `0 0 10px ${bulletColor}` : 'none' }} />
                          <span className={`font-black uppercase tracking-tight text-white drop-shadow-md ${canvasFormat === 'stories' ? 'text-[18px]' : 'text-[14px]'}`}
                            style={{ 
                              color: bulletColor,
                              textShadow: isNeon ? `0 0 ${glowIntensity/5}px ${bulletColor}` : (hasShadow ? '2px 2px 2px rgba(0,0,0,0.8)' : 'none')
                            }}
                          >
                            {b}
                          </span>
                        </motion.div>
                      ))}
                   </div>
                </div>

                <div className="flex flex-col items-center gap-6 border-t border-white/20 pt-8">
                   {showCTA && (
                     <motion.button 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] italic text-lg shadow-[0_20px_40px_rgba(255,255,255,0.2)]"
                      style={{ color: 'black', backgroundColor: 'white' }}
                     >
                       Shop Now
                     </motion.button>
                   )}
                <div className="w-full flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Net Weight: 500 g</div>
                        <div className="text-[14px] font-black text-white uppercase tracking-tighter italic">{footer}</div>
                      </div>
                      <div className="text-[14px] font-black text-[#E10600] tracking-widest underline decoration-4 underline-offset-8 italic">FIT77.CZ</div>
                   </div>
                </div>

              </div>

              {/* Industrial Decorations */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E10600] to-transparent opacity-50 z-[60]" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E10600] to-transparent opacity-50 z-[60]" />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
