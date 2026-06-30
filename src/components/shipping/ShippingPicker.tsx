'use client';

import { useState, useEffect } from 'react';
import { SHIPPING_METHODS, ShippingMethodId } from '@/lib/shipping';

// Type pro Zásilkovna Packeta
declare global {
  interface Window {
    Packeta?: any;
  }
}

interface ShippingPickerProps {
  selectedShipping: ShippingMethodId;
  shippingPointName: string;
  error?: string;
  onChange: (methodId: ShippingMethodId, shippingId?: string, shippingPointName?: string) => void;
}

export default function ShippingPicker({ selectedShipping, shippingPointName, error, onChange }: ShippingPickerProps) {
  
  // Asynchronní lazy loading widgetu Packety
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.packeta.com/v6/www/js/library.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePacketaOpen = () => {
    if (window.Packeta) {
      window.Packeta.Widget.pick(
        process.env.NEXT_PUBLIC_ZASILKOVNA_API || 'vas_api_klic',
        (pickupPoint: any) => {
          if (pickupPoint) {
            onChange('ZASILKOVNA', pickupPoint.id, pickupPoint.name);
          }
        },
        { 
          country: 'cz', 
          language: 'cs',
          color: '#E10600' // Custom styling (červená barva) pro L-Code design
        }
      );
    }
  };

  const handleSelection = (methodId: ShippingMethodId) => {
    if (methodId === 'ZASILKOVNA') {
      // Předvolíme Zásilkovnu, ale resetujeme pobočku a otevřeme widget
      onChange(methodId, undefined, '');
      handlePacketaOpen();
    } else {
      onChange(methodId, undefined, '');
    }
  };

  return (
    <div className="bg-white/[0.02] border border-white/10 p-5 lg:p-6">
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#E10600] mb-6 border-b border-white/10 pb-4">
        3. Doprava
      </h3>
      <div className="space-y-3">
        {Object.values(SHIPPING_METHODS).map((method) => (
          <label 
            key={method.id} 
            className={`flex items-start p-4 border cursor-pointer transition-all ${selectedShipping === method.id ? 'border-[#E10600] bg-[#E10600]/5' : 'border-white/10 bg-black hover:border-white/30'}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <input 
                type="radio" 
                name="shippingMethod" 
                value={method.id} 
                checked={selectedShipping === method.id}
                onChange={() => handleSelection(method.id as ShippingMethodId)}
                className="accent-[#E10600] w-4 h-4"
              />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-black text-white uppercase tracking-wider">{method.name}</span>
                <span className="text-sm font-black text-[#E10600]">{method.price === 0 ? 'ZDARMA' : `${method.price} Kč`}</span>
              </div>
              <p className="text-xs text-zinc-500">{method.description}</p>
              {method.id === 'ZASILKOVNA' && selectedShipping === 'ZASILKOVNA' && (
                <div className="mt-3 bg-white/5 border border-white/10 p-3 flex justify-between items-center">
                  <span className="text-sm text-white font-bold">{shippingPointName || 'Nevybráno (Zásilkovna / AlzaBox)'}</span>
                  <button 
                    type="button" 
                    onClick={(e) => { e.preventDefault(); handlePacketaOpen(); }}
                    className="text-xs font-black uppercase tracking-widest text-[#E10600] hover:text-white transition-colors"
                  >
                    {shippingPointName ? 'Změnit' : 'Vybrat pobočku'}
                  </button>
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && <p className="text-[#E10600] text-[10px] mt-2">{error}</p>}
    </div>
  );
}
