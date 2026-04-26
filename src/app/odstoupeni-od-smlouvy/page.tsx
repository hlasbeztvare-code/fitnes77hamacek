'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle } from 'lucide-react';

const withdrawalSchema = z.object({
  orderId: z.string().min(1, 'Zadejte číslo objednávky'),
  name: z.string().min(3, 'Zadejte celé jméno'),
  email: z.string().email('Zadejte platný email'),
  date: z.string().min(1, 'Vyberte datum převzetí zboží'),
  reason: z.string().optional(),
  confirmation: z.boolean().refine(v => v === true, 'Musíte potvrdit podmínky'),
});

type WithdrawalForm = z.infer<typeof withdrawalSchema>;

export default function WithdrawalPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const { register, handleSubmit, formState: { errors } } = useForm<WithdrawalForm>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      confirmation: false
    }
  });

  const onSubmit = async (data: WithdrawalForm) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/odstoupeni', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="w-24 h-24 bg-[#E10600] rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(225,6,0,0.3)]">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Odesláno!</h1>
          <p className="text-zinc-400 font-medium">Vaše žádost o odstoupení byla přijata do systému. Ozveme se Vám do 24 hodin s dalším postupem.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="inline-block bg-white text-black px-10 py-4 font-black uppercase tracking-widest hover:bg-[#E10600] hover:text-white transition-all"
          >
            Zpět na hlavní stranu
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-12"
        >
          <div className="inline-block border-l-4 border-[#E10600] pl-4 text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
            Legislativa Červen 2026
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
            Odstoupení <br />
            <span className="text-[#E10600]">od smlouvy</span>
          </h1>
          <p className="text-zinc-500 font-medium max-w-lg">
            Vyplňte digitální formulář pro okamžité zahájení procesu vrácení zboží. Vše probíhá plně automatizovaně skrze náš systém.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Číslo objednávky</label>
              <input 
                {...register('orderId')} 
                placeholder="Např. 20260001"
                className={`w-full bg-zinc-50 border-2 px-6 py-4 outline-none transition-all font-bold ${errors.orderId ? 'border-red-500 bg-red-50' : 'border-zinc-100 focus:border-black'}`}
              />
              {errors.orderId && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.orderId.message}</span>}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Datum převzetí</label>
              <input 
                {...register('date')} 
                type="date"
                className={`w-full bg-zinc-50 border-2 px-6 py-4 outline-none transition-all font-bold ${errors.date ? 'border-red-500 bg-red-50' : 'border-zinc-100 focus:border-black'}`}
              />
              {errors.date && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.date.message}</span>}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Jméno a příjmení</label>
            <input 
              {...register('name')} 
              placeholder="Jan Novák"
              className={`w-full bg-zinc-50 border-2 px-6 py-4 outline-none transition-all font-bold ${errors.name ? 'border-red-500 bg-red-50' : 'border-zinc-100 focus:border-black'}`}
            />
            {errors.name && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.name.message}</span>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">E-mail pro komunikaci</label>
            <input 
              {...register('email')} 
              type="email"
              placeholder="vas@email.cz"
              className={`w-full bg-zinc-50 border-2 px-6 py-4 outline-none transition-all font-bold ${errors.email ? 'border-red-500 bg-red-50' : 'border-zinc-100 focus:border-black'}`}
            />
            {errors.email && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.email.message}</span>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Důvod odstoupení (nepovinné)</label>
            <textarea 
              {...register('reason')} 
              rows={4}
              placeholder="Popište stručně důvod vrácení..."
              className="w-full bg-zinc-50 border-2 border-zinc-100 px-6 py-4 outline-none focus:border-black transition-all font-bold resize-none"
            />
          </div>

          <div className="pt-4">
            <label className="flex gap-3 cursor-pointer group">
              <input 
                {...register('confirmation')} 
                type="checkbox"
                className="mt-1 w-5 h-5 rounded border-2 border-zinc-200 text-black focus:ring-black"
              />
              <span className="text-xs font-medium text-zinc-500 leading-relaxed group-hover:text-black transition-colors">
                Potvrzuji, že odstupuji od kupní smlouvy v zákonné lhůtě a beru na vědomí, že zboží musí být vráceno v původním stavu (v případě doplňků stravy neporušené balení).
              </span>
            </label>
            {errors.confirmation && <span className="text-[10px] text-red-500 font-bold uppercase mt-2 block">{errors.confirmation.message}</span>}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-black text-white py-6 px-8 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-[#E10600] transition-all disabled:opacity-50"
          >
            {status === 'loading' ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Odeslat digitální formulář</span>
              </>
            )}
          </button>

          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-bold uppercase tracking-widest"
            >
              <AlertTriangle className="w-4 h-4" />
              Došlo k chybě. Zkuste to prosím znovu nebo nás kontaktujte přímo.
            </motion.div>
          )}
        </form>

        <footer className="mt-20 pt-10 border-t border-zinc-100 text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">
          <p>© 2026 FITNESS 77 MB • HEADLESS SHOPTET BRIDGE</p>
        </footer>
      </div>
    </div>
  );
}

// clean code comment: Digitální formulář pro odstoupení splňuje legislativu 06/2026. Zero-Bloat CSS. smrk
