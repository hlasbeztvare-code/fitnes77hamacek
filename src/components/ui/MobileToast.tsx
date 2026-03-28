'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function MobileToast({ message, duration = 2000, onDone }: any) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-sm transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
      <div className="bg-zinc-900 border border-emerald-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl">
        <CheckCircle2 className="text-emerald-500" size={20} />
        <span className="text-sm font-bold uppercase tracking-tight">{message}</span>
      </div>
    </div>
  );
}
