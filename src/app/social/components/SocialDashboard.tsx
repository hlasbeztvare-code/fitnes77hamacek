'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Hash, Upload, ShoppingCart, Type, Palette, Maximize, Move, Trash2 } from 'lucide-react';

const BRAND_COLORS = [
  { id: 'white', hex: '#FFFFFF', name: 'Bílá' },
  { id: 'black', hex: '#000000', name: 'Černá' },
  { id: 'red', hex: '#E10600', name: 'Červená' },
  { id: 'green', hex: '#CCFF00', name: 'Acid Zelená' },
];

export default function SocialDashboard() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);

  // Formát plátna: 'feed' (1:1/4:5) nebo 'story' (9:16)
  const [format, setFormat] = useState<'feed' | 'story'>('feed');

  // Toggles
  const [showCTA, setShowCTA] = useState(true);
  const [showCustomText, setShowCustomText] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Button state
  const [btnText, setBtnText] = useState('VSTOUPIT DO PROTOKOLU');
  const [btnBg, setBtnBg] = useState('#E10600');
  const [btnTextColor, setBtnTextColor] = useState('#CCFF00');
  const [btnScale, setBtnScale] = useState(1);

  // Logo state
  const [logoScale, setLogoScale] = useState(1);

  // Text state
  const [customText, setCustomText] = useState('EXTRÉMNÍ\nPUMPA');
  const [customTextColor, setCustomTextColor] = useState('#FFFFFF');
  const [customTextScale, setCustomTextScale] = useState(1);

  // Publish state
  const [postMessage, setPostMessage] = useState('DEAD PROTOCOL AKTIVOVÁN. Žádné výmluvy, jen hardcore výkon.\n\n#fitness77 #hardcore #deadprotocol');
  const [postLink, setPostLink] = useState('https://fitness77.cz/vip-drop');

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedLogo(URL.createObjectURL(file));
    }
  };

  const handlePublish = async () => {
    if (!uploadedImage) return;

    try {
      setIsExporting(true);

      // ZERO ERROR TOLERANCE: Odesíláme čistá data na náš upravený publish endpoint
      const res = await fetch('/api/social/upload-publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Backend si vygeneruje nebo vytáhne obrázek přímo přes sharp generátor,
          // pro testování posíláme konfiguraci. Pokud máš lokální soubor, převede se na serveru.
          imageBase64: uploadedImage, // Sem po refaktoru API route půjde přímá URL nebo konfigurace
          message: postMessage,
          linkUrl: postLink,
          isStory: format === 'story',
          isReel: format === 'story' && uploadedImage.endsWith('.mp4') // Pokud bys nahrál video
        })
      });

      const data = await res.json();

      if (data.success) {
        alert('🔥 ÚSPĚŠNĚ ODPÁLENO NA SÍTĚ!\nMeta API schválilo kreativní objekt a kampaň je venku.');
      } else {
        alert('❌ Zrada z Meta API: ' + data.error);
      }
    } catch (err) {
      console.error('Failed to publish:', err);
      alert('Kritická chyba při komunikaci se serverem.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">SOCIAL <span className="text-zinc-500">PILOT</span></h1>
            <p className="text-zinc-500 text-sm mt-2">Už žádné klientské chyby. Serverový Sharp Engine ve formátu 300 %.</p>
          </div>
          <button
            onClick={handlePublish}
            disabled={isExporting || !uploadedImage}
            className={`px-8 py-4 font-black uppercase text-xs tracking-widest flex items-center gap-2 shadow-[0_0_30px_rgba(225,6,0,0.8)] transition-all ${isExporting || !uploadedImage ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none' : 'bg-[#E10600] text-white hover:bg-red-700 hover:scale-105'
              }`}
          >
            <Download size={18} /> {isExporting ? 'ODPALUJI DO SVĚTA...' : 'ODPÁLIT NA SÍTĚ'}
          </button>
        </header>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          {/* OVLÁDÁNÍ */}
          <div className="w-full xl:w-[350px] shrink-0 space-y-6">

            {/* VOLBA FORMÁTU */}
            <section className="bg-zinc-900/50 border border-white/5 p-6 space-y-4 shadow-xl">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center gap-2">
                <Maximize size={14} /> CÍLOVÝ FORMÁT UMÍSTĚNÍ
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFormat('feed')}
                  className={`p-3 text-xs font-black uppercase border tracking-wider transition-all ${format === 'feed' ? 'bg-white text-black border-white' : 'border-white/10 text-zinc-400 hover:border-white/30'}`}
                >
                  FEED (4:5 / 1:1)
                </button>
                <button
                  onClick={() => setFormat('story')}
                  className={`p-3 text-xs font-black uppercase border tracking-wider transition-all ${format === 'story' ? 'bg-[#E10600] text-white border-[#E10600] shadow-[0_0_15px_rgba(225,6,0,0.4)]' : 'border-white/10 text-zinc-400 hover:border-white/30'}`}
                >
                  STORIES / REELS
                </button>
              </div>
            </section>

            {/* Upload Pozadí */}
            <section className="bg-zinc-900/50 border border-white/5 p-6 space-y-4 shadow-xl">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center gap-2">
                <Upload size={14} /> 1. Hlavní obrázek
              </h2>
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-zinc-600 hover:border-[#E10600] hover:bg-zinc-800/50 transition-all cursor-pointer group">
                <Upload size={20} className="text-zinc-500 mb-2 group-hover:text-[#E10600]" />
                <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest text-center px-4">
                  Klikni pro nahrání pozadí
                </span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </section>

            {/* Upload Loga */}
            <section className="bg-zinc-900/50 border border-white/5 p-6 space-y-4 shadow-xl">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center justify-between">
                <span className="flex items-center gap-2"><Upload size={14} /> 2. Vlastní Logo</span>
                {uploadedLogo && (
                  <button
                    onClick={() => { setUploadedLogo(null); setLogoScale(1); }}
                    className="text-[9px] flex items-center gap-1 text-zinc-500 hover:text-[#E10600] transition-colors"
                  >
                    <Trash2 size={10} /> Smazat
                  </button>
                )}
              </h2>
              <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed border-zinc-600 hover:border-[#E10600] hover:bg-zinc-800/50 transition-all cursor-pointer group">
                <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest group-hover:text-[#E10600]">Nahrát Logo (PNG)</span>
                <input type="file" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoUpload} className="hidden" />
              </label>

              {uploadedLogo && (
                <div className="space-y-2 pt-4">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                    <span className="flex items-center gap-1"><Maximize size={10} /> Velikost Loga</span>
                    <span>{Math.round(logoScale * 100)}%</span>
                  </label>
                  <input type="range" min="0.2" max="3" step="0.1" value={logoScale} onChange={e => setLogoScale(parseFloat(e.target.value))} className="w-full accent-[#E10600]" />
                </div>
              )}
            </section>

            {/* Nastavení Tlačítka */}
            <section className="bg-zinc-900/50 border border-white/5 p-6 space-y-6 shadow-xl">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center justify-between mb-2">
                <span className="flex items-center gap-2"><ShoppingCart size={14} /> 3. Tlačítko</span>
                <button
                  onClick={() => setShowCTA(!showCTA)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${showCTA ? 'bg-[#E10600]' : 'bg-zinc-800'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${showCTA ? 'left-6' : 'left-1'}`} />
                </button>
              </h2>

              {showCTA && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 flex items-center gap-1"><Type size={10} /> Text tlačítka</label>
                    <input
                      type="text"
                      value={btnText}
                      onChange={(e) => setBtnText(e.target.value)}
                      className="w-full bg-black border border-white/10 p-2 text-xs font-black uppercase tracking-widest outline-none focus:border-[#E10600]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 flex items-center gap-1"><Palette size={10} /> Barva Pozadí</label>
                    <div className="flex gap-2">
                      {BRAND_COLORS.map(c => (
                        <button
                          key={`bg-${c.id}`}
                          onClick={() => setBtnBg(c.hex)}
                          title={c.name}
                          className={`w-8 h-8 border-2 transition-all ${btnBg === c.hex ? 'border-white scale-110' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 flex items-center gap-1"><Type size={10} /> Barva Textu</label>
                    <div className="flex gap-2">
                      {BRAND_COLORS.map(c => (
                        <button
                          key={`txt-${c.id}`}
                          onClick={() => setBtnTextColor(c.hex)}
                          title={c.name}
                          className={`w-8 h-8 border-2 transition-all flex items-center justify-center font-black text-xs ${btnTextColor === c.hex ? 'border-white scale-110' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                          style={{ backgroundColor: c.hex === '#FFFFFF' ? '#000' : '#FFF', color: c.hex }}
                        >
                          T
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                      <span className="flex items-center gap-1"><Maximize size={10} /> Velikost Tlačítka</span>
                      <span>{Math.round(btnScale * 100)}%</span>
                    </label>
                    <input type="range" min="0.5" max="3" step="0.1" value={btnScale} onChange={e => setBtnScale(parseFloat(e.target.value))} className="w-full accent-[#E10600]" />
                  </div>
                </div>
              )}
            </section>

            {/* Vlastní Text */}
            <section className="bg-zinc-900/50 border border-white/5 p-6 space-y-6 shadow-xl">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center justify-between mb-2">
                <span className="flex items-center gap-2"><Type size={14} /> 4. Volný Text</span>
                <button
                  onClick={() => setShowCustomText(!showCustomText)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${showCustomText ? 'bg-[#E10600]' : 'bg-zinc-800'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${showCustomText ? 'left-6' : 'left-1'}`} />
                </button>
              </h2>

              {showCustomText && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 flex items-center gap-1"><Type size={10} /> Obsah textu</label>
                    <textarea
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      className="w-full bg-black border border-white/10 p-2 text-xs font-black uppercase tracking-widest outline-none focus:border-[#E10600] min-h-[60px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 flex items-center gap-1"><Palette size={10} /> Barva Textu</label>
                    <div className="flex gap-2">
                      {BRAND_COLORS.map(c => (
                        <button
                          key={`ct-${c.id}`}
                          onClick={() => setCustomTextColor(c.hex)}
                          title={c.name}
                          className={`w-8 h-8 border-2 transition-all flex items-center justify-center font-black text-xs ${customTextColor === c.hex ? 'border-white scale-110' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                          style={{ backgroundColor: c.hex === '#FFFFFF' ? '#000' : '#FFF', color: c.hex }}
                        >
                          T
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                      <span className="flex items-center gap-1"><Maximize size={10} /> Velikost Textu</span>
                      <span>{Math.round(customTextScale * 100)}%</span>
                    </label>
                    <input type="range" min="0.5" max="5" step="0.1" value={customTextScale} onChange={e => setCustomTextScale(parseFloat(e.target.value))} className="w-full accent-[#E10600]" />
                  </div>
                </div>
              )}
            </section>

            {/* Publikování na sítě */}
            <section className="bg-red-600/10 border border-red-600/20 p-6 space-y-4 shadow-xl">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#E10600] flex items-center gap-2">
                <Hash size={14} /> 5. Publikace na sítě
              </h2>

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-400">Popisek příspěvku (FB/IG)</label>
                  <textarea
                    value={postMessage}
                    onChange={(e) => setPostMessage(e.target.value)}
                    className="w-full bg-black border border-white/10 p-3 text-xs text-zinc-300 outline-none focus:border-[#E10600] min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-400">Odkaz (Facebook)</label>
                  <input
                    type="text"
                    value={postLink}
                    onChange={(e) => setPostLink(e.target.value)}
                    className="w-full bg-black border border-white/10 p-3 text-xs text-zinc-300 outline-none focus:border-[#E10600]"
                  />
                </div>
              </div>
            </section>

          </div>

          {/* DYNAMICKÝ CANVAS (Mění poměr stran podle vybraného formátu) */}
          <div className="flex-1 flex justify-center sticky top-8 w-full">
            <div
              ref={canvasRef}
              className={`relative bg-zinc-900/50 border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_0_100px_rgba(225,6,0,0.1)] w-full transition-all duration-300 ${format === 'story' ? 'max-w-[450px] aspect-[9/16]' : 'max-w-[600px] aspect-square'
                }`}
            >
              {uploadedImage ? (
                <img src={uploadedImage} alt="Uploaded" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
              ) : (
                <div className="text-zinc-600 text-[10px] uppercase tracking-widest font-black text-center px-8 pointer-events-none">
                  Pracovní plocha ({format.toUpperCase()})<br />
                  <span className="opacity-50">(Nejprve nahrajte hlavní obrázek)</span>
                </div>
              )}

              {/* Logo Overlay (Draggable) */}
              {uploadedLogo && (
                <motion.div
                  drag
                  dragMomentum={false}
                  dragConstraints={canvasRef}
                  className="absolute z-40 cursor-move group"
                  initial={{ x: 0, y: -150 }}
                  style={{ scale: logoScale }}
                >
                  <img src={uploadedLogo} className="w-32 drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)] pointer-events-none" alt="Custom Logo" />
                  <div className="absolute -top-4 -right-4 bg-[#E10600] p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <Move size={12} className="text-white" />
                  </div>
                </motion.div>
              )}

              {/* BRUTAL CTA BUTTON (Draggable) */}
              {showCTA && uploadedImage && (
                <motion.div
                  drag
                  dragMomentum={false}
                  dragConstraints={canvasRef}
                  className="absolute z-40 cursor-move group"
                  initial={{ x: 0, y: format === 'story' ? 250 : 150 }}
                  style={{ scale: btnScale }}
                >
                  <div
                    className="px-6 py-3 font-black uppercase tracking-tighter text-xl shadow-2xl pointer-events-none transition-colors text-center"
                    style={{
                      backgroundColor: btnBg,
                      color: btnTextColor,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 1000,
                      border: `4px solid ${btnTextColor === btnBg ? '#FFFFFF' : btnTextColor}`,
                      boxShadow: '6px 6px 0px rgba(0,0,0,0.8)',
                      transform: 'skewX(-10deg)',
                    }}
                  >
                    <div style={{ transform: 'skewX(10deg)' }}>{btnText}</div>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-[#E10600] p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <Move size={12} className="text-white" />
                  </div>
                </motion.div>
              )}

              {/* CUSTOM TEXT (Draggable) */}
              {showCustomText && uploadedImage && (
                <motion.div
                  drag
                  dragMomentum={false}
                  dragConstraints={canvasRef}
                  className="absolute z-40 cursor-move group"
                  initial={{ x: 0, y: -50 }}
                  style={{ scale: customTextScale }}
                >
                  <div
                    className="font-black uppercase tracking-tighter text-4xl shadow-2xl pointer-events-none transition-colors whitespace-pre-wrap text-center leading-[0.9] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    style={{
                      color: customTextColor,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 1000,
                    }}
                  >
                    {customText}
                  </div>
                  <div className="absolute -top-4 -right-4 bg-[#E10600] p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <Move size={12} className="text-white" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}