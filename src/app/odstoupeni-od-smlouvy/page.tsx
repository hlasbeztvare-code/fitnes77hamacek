'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, FileDown } from 'lucide-react';
import Link from 'next/link';
import { jsPDF } from 'jspdf';

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
  const [submittedData, setSubmittedData] = useState<WithdrawalForm | null>(null);
  
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
        setSubmittedData(data);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const generatePDF = () => {
    if (!submittedData) return;

    const doc = new jsPDF();
    const today = new Date().toLocaleDateString('cs-CZ');

    // Header
    doc.setFontSize(22);
    doc.text('FITNESS 77 - PROTOKOL O ODSTOUPENI', 20, 20);
    doc.setFontSize(10);
    doc.text(`VYGENEROVANO SYSTEMEM GOLIAS | DATUM: ${today}`, 20, 30);
    doc.line(20, 35, 190, 35);

    // Content
    doc.setFontSize(12);
    doc.text('UDAJE O OBJEDNAVCE:', 20, 50);
    doc.text(`Cislo objednavky: ${submittedData.orderId}`, 30, 60);
    doc.text(`Zakaznik: ${submittedData.name}`, 30, 70);
    doc.text(`Email: ${submittedData.email}`, 30, 80);
    doc.text(`Datum prevzeti: ${submittedData.date}`, 30, 90);

    doc.text('VYJADRENI ZAKAZNIKA:', 20, 110);
    const reason = submittedData.reason || 'Neuvedeno';
    const splitReason = doc.splitTextToSize(reason, 160);
    doc.text(splitReason, 30, 120);

    doc.line(20, 160, 190, 160);
    doc.setFontSize(10);
    doc.text('Prohlasuji, ze odstupuji od kupni smlouvy v zakonne lhute 14 dnu.', 20, 170);
    doc.text('Beru na vedomi, ze zbozi musi byt vraceno v puvodnim stavu.', 20, 175);

    doc.setFontSize(12);
    doc.text('Podpis zakaznika: .......................................', 20, 200);
    
    doc.save(`odstoupeni-fit77-${submittedData.orderId}.pdf`);
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
          <p className="text-zinc-400 font-medium leading-relaxed">Vaše žádost o odstoupení byla přijata do systému. Potvrzení jsme Vám právě odeslali na e-mail. Níže si můžete stáhnout oficiální PDF protokol.</p>
          
          <div className="flex flex-col gap-4 pt-6">
            <button 
              onClick={generatePDF}
              className="w-full bg-[#E10600] text-white px-10 py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 group"
            >
              <FileDown className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
              STÁHNOUT PDF PROTOKOL
            </button>

            <button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-zinc-900 text-white px-10 py-5 font-black uppercase tracking-widest hover:bg-zinc-800 transition-all"
            >
              Zpět na hlavní stranu
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black py-32 px-6 relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mb-16"
        >
          <div className="inline-block border-l-4 border-[#E10600] pl-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
            LEGISLATIVA MB / 06 / 2026
          </div>
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
            ODSTOUPENÍ <br />
            <span className="text-[#E10600]">OD SMLOUVY</span>
          </h1>
          <p className="text-zinc-600 font-medium max-w-lg text-lg leading-relaxed uppercase tracking-wider text-xs">
            VYPLŇTE DIGITÁLNÍ PROTOKOL PRO OKAMŽITÉ ZAHÁJENÍ PROCESU VRÁCENÍ. SYSTÉM GOLIÁŠ AUTOMATICKY SYNCHRONIZUJE DATA S ADMINISTRACÍ.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="orderId" className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">ČÍSLO OBJEDNÁVKY</label>
              <input 
                id="orderId"
                {...register('orderId')} 
                placeholder="2026XXXX"
                aria-label="Číslo objednávky"
                className={`w-full bg-zinc-50 border-2 px-6 py-5 outline-none transition-all font-black text-xl uppercase tracking-widest focus:ring-4 focus:ring-[#E10600]/10 ${errors.orderId ? 'border-[#E10600]/50' : 'border-zinc-100 focus:border-black'}`}
              />
              {errors.orderId && <span className="text-[9px] text-[#E10600] font-black uppercase tracking-widest">{errors.orderId.message}</span>}
            </div>
            <div className="space-y-2">
              <label htmlFor="date" className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">DATUM PŘEVZETÍ</label>
              <input 
                id="date"
                {...register('date')} 
                type="date"
                aria-label="Datum převzetí zboží"
                className={`w-full bg-zinc-50 border-2 px-6 py-5 outline-none transition-all font-black text-xl uppercase tracking-widest focus:ring-4 focus:ring-[#E10600]/10 ${errors.date ? 'border-[#E10600]/50' : 'border-zinc-100 focus:border-black'}`}
              />
              {errors.date && <span className="text-[9px] text-[#E10600] font-black uppercase tracking-widest">{errors.date.message}</span>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">JMÉNO A PŘÍJMENÍ</label>
            <input 
              id="name"
              {...register('name')} 
              placeholder="JAN NOVÁK"
              aria-label="Jméno a příjmení"
              className={`w-full bg-zinc-50 border-2 px-6 py-5 outline-none transition-all font-black text-xl uppercase tracking-widest focus:ring-4 focus:ring-[#E10600]/10 ${errors.name ? 'border-[#E10600]/50' : 'border-zinc-100 focus:border-black'}`}
            />
            {errors.name && <span className="text-[9px] text-[#E10600] font-black uppercase tracking-widest">{errors.name.message}</span>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">KONTAKTNÍ E-MAIL</label>
            <input 
              id="email"
              {...register('email')} 
              type="email"
              placeholder="EMAIL@SERVER.CZ"
              aria-label="E-mail pro komunikaci"
              className={`w-full bg-zinc-50 border-2 px-6 py-5 outline-none transition-all font-black text-xl uppercase tracking-widest focus:ring-4 focus:ring-[#E10600]/10 ${errors.email ? 'border-[#E10600]/50' : 'border-zinc-100 focus:border-black'}`}
            />
            {errors.email && <span className="text-[9px] text-[#E10600] font-black uppercase tracking-widest">{errors.email.message}</span>}
          </div>

          <div className="space-y-2">
            <label htmlFor="reason" className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">DŮVOD ODSTOUPENÍ (VOLITELNÉ)</label>
            <textarea 
              id="reason"
              {...register('reason')} 
              rows={4}
              placeholder="STRUČNĚ POPIŠTE STAV ZBOŽÍ..."
              aria-label="Důvod odstoupení"
              className="w-full bg-zinc-50 border-2 border-zinc-100 px-6 py-5 outline-none focus:border-black transition-all font-black text-xl uppercase tracking-widest resize-none focus:ring-4 focus:ring-black/5"
            />
          </div>

          <div className="pt-6">
            <label className="flex gap-4 cursor-pointer group items-start">
              <div className="relative flex items-center justify-center mt-1">
                <input 
                  {...register('confirmation')} 
                  type="checkbox"
                  aria-label="Potvrzuji zákonné podmínky"
                  className="peer appearance-none w-6 h-6 border-2 border-zinc-200 checked:bg-[#E10600] checked:border-[#E10600] transition-all cursor-pointer"
                />
                <CheckCircle2 className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <span className="text-[10px] font-bold text-zinc-500 leading-relaxed group-hover:text-black transition-colors uppercase tracking-widest">
                POTVRZUJI, ŽE ODSTUPUJI OD KUPNÍ SMLOUVY V ZÁKONNÉ LHŮTĚ A BERU NA VĚDOMÍ, ŽE ZBOŽÍ MUSÍ BÝT VRÁCENO V PŮVODNÍM STAVU.
              </span>
            </label>
            {errors.confirmation && <span className="text-[9px] text-[#E10600] font-black uppercase tracking-widest mt-3 block">{errors.confirmation.message}</span>}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            aria-label="Odeslat digitální protokol"
            className="w-full bg-black text-white py-8 px-8 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#E10600] focus:ring-8 focus:ring-[#E10600]/20 outline-none transition-all disabled:opacity-50 text-2xl group"
          >
            {status === 'loading' ? (
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            ) : (
              <>
                <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                <span>ODESLAT PROTOKOL</span>
              </>
            )}
          </button>

          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4 p-6 bg-red-50 border border-red-100 rounded-none text-red-600 text-[10px] font-black uppercase tracking-widest"
            >
              <AlertTriangle className="w-5 h-5" />
              DOŠLO K CHYBĚ PŘI SYNCHRONIZACI. ZKUSTE TO ZNOVU NEBO NÁS KONTAKTUJTE.
            </motion.div>
          )}
        </form>

        <footer className="mt-32 pt-10 border-t border-zinc-100 text-[8px] text-zinc-400 font-black uppercase tracking-[0.5em] flex justify-between items-center">
          <p>© 2026 FITNESS 77 MB • GOLIÁŠ STEALTH BYPASS</p>
          <Link href="/" className="hover:text-black transition-colors">ZPĚT NA HOME</Link>
        </footer>
      </div>
    </div>
  );
}

// clean code comment: Goliáš Legislative Bridge | Dark Neon Mode | 06/2026. smrk
