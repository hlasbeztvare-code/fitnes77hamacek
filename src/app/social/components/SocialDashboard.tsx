'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Send, Check, AlertCircle, RefreshCcw, Layout, Type, Image as ImageIcon } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  shortDescription: string;
  slug: string;
}

export default function SocialDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });
  
  const [customText, setCustomText] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<'hero' | 'minimalist' | 'industrial'>('hero');

  const selectedProduct = products.find(p => p.id === selectedProductId);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        if (data.length > 0) setSelectedProductId(data[0].id);
        setLoading(false);
      });
  }, []);

  const handlePublish = async () => {
    if (!selectedProduct) return;
    setPublishing(true);
    setStatus({ type: null, msg: '' });

    try {
      const res = await fetch('/api/social/publish', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-internal-secret': 'fit77_internal_secure_2024_auth'
        },
        body: JSON.stringify({
          type: 'product',
          data: {
            ...selectedProduct,
            shortDescription: customText || selectedProduct.shortDescription,
            category: customCategory || selectedProduct.category,
            template: selectedTemplate
          }
        })
      });

      const result = await res.json();
      if (result.success) {
        setStatus({ type: 'success', msg: 'Vizuál úspěšně vypuštěn do světa!' });
      } else {
        setStatus({ type: 'error', msg: result.error || 'Něco se nepovedlo.' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Selhalo spojení se serverem.' });
    } finally {
      setPublishing(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="text-red-600"
      >
        <RefreshCcw size={40} />
      </motion.div>
    </div>
  );

  const previewUrl = selectedProduct 
    ? `/api/social/generate?imageUrl=${encodeURIComponent(selectedProduct.image)}&title=${encodeURIComponent(selectedProduct.name)}&category=${encodeURIComponent(customCategory || selectedProduct.category)}&template=${selectedTemplate}`
    : '';

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-red-600 mb-2"
            >
              <Layout size={20} />
              <span className="text-xs font-black tracking-[0.3em] uppercase">Social Media Pilot</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none"
            >
              Světovej <span className="text-red-600">Vizuál</span>
            </motion.h1>
          </div>
          
          <div className="flex bg-black/50 border border-white/10 p-1 rounded-sm">
             <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest bg-white text-black">Instagram</button>
             <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors">Facebook</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls */}
          <div className="lg:col-span-12 mb-10 overflow-x-auto">
             <h2 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-600"></div>
                Výběr Designové Šablony
              </h2>
              <div className="flex gap-4 min-w-max pb-4">
                {[
                  { id: 'hero', name: 'The Hero (Agresivní)', desc: 'Červený skew, glow a výrazný branding' },
                  { id: 'minimalist', name: 'The Minimalist (Čistý)', desc: 'Čistě černá, produkt v rohu, decentní logo' },
                  { id: 'industrial', name: 'The Industrial (Drsný)', desc: 'Tmavý gradient, technický look' },
                ].map((tpl) => (
                  <button 
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id as any)}
                    className={`text-left p-6 border transition-all w-72 ${
                      selectedTemplate === tpl.id ? 'bg-red-600 border-red-600 text-white' : 'bg-black border-white/10 text-white/60 hover:border-white/20'
                    }`}
                  >
                    <div className="text-[10px] font-black uppercase tracking-widest mb-2">Template 0{tpl.id === 'hero' ? 1 : tpl.id === 'minimalist' ? 2 : 3}</div>
                    <div className="text-lg font-black uppercase tracking-tighter mb-2">{tpl.name}</div>
                    <div className="text-[10px] font-medium leading-relaxed opacity-70 uppercase tracking-wider">{tpl.desc}</div>
                  </button>
                ))}
              </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <section className="bg-black border border-white/5 p-8 rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Type size={120} />
              </div>
              
              <h2 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-600"></div>
                Nastavení Obsahu
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Výběr produktu</label>
                  <select 
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 p-4 text-sm font-bold focus:border-red-600 outline-none transition-colors appearance-none"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Kategorie (Vizuál)</label>
                  <input 
                    type="text"
                    value={customCategory}
                    placeholder={selectedProduct?.category || 'E-SHOP'}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 p-4 text-sm font-bold focus:border-red-600 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Popisek (Caption)</label>
                  <textarea 
                    rows={4}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder={selectedProduct?.shortDescription}
                    className="w-full bg-[#111] border border-white/10 p-4 text-sm font-medium focus:border-red-600 outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </section>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePublish}
              disabled={publishing}
              className={`w-full py-6 flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden ${
                publishing ? 'bg-zinc-800' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {publishing ? (
                <RefreshCcw className="animate-spin" size={20} />
              ) : (
                <>
                  <Send size={18} />
                  Vypustit do světa
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {status.type && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-6 border flex items-center gap-4 ${
                    status.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-red-500/10 border-red-500/50 text-red-500'
                  }`}
                >
                  {status.type === 'success' ? <Check size={24} /> : <AlertCircle size={24} />}
                  <p className="text-xs font-black uppercase tracking-widest">{status.msg}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Preview */}
          <div className="lg:col-span-7">
             <h2 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-600"></div>
                Live Preview (Real-time Sharp Engine)
              </h2>

              <div className="relative aspect-[4/5] bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                {selectedProduct ? (
                  <>
                    <img 
                      key={previewUrl}
                      src={previewUrl} 
                      className="w-full h-full object-contain"
                      alt="Social Preview"
                    />
                    <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20"></div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-white/20">
                    <ImageIcon size={64} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Žádný náhled k dispozici</span>
                  </div>
                )}
              </div>

              <div className="mt-6 p-6 bg-[#111] border border-white/5 text-[10px] font-mono text-zinc-500 leading-relaxed uppercase">
                <p>// META_GRAPH_ENGINE: ACTIVE</p>
                <p>// FORMAT: 1080x1350 (IG_PORTRAIT)</p>
                <p>// TEXTURE_LAYER: DYNAMIC_SKEW_RED</p>
                <p>// BRANDING: F77_BADGE_V1</p>
              </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
      `}</style>
    </div>
  );
}
