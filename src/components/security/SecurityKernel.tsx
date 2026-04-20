"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * L-CODE GUARDIAN | SecurityKernel v1.0
 * 
 * Izoluje klientské chyby a zabraňuje pádu celého e-commerce ekosystému.
 * Mandát: 300% stabilita a ochrana proti "White Screen of Death".
 */
export class SecurityKernel extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Logování do interního monitoringu GOLIÁŠ
    console.error("🚨 SECURITY_KERNEL ALERT:", error.message);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-8 text-center font-black uppercase">
          <div className="max-w-xl border-l-4 border-[#E10600] pl-8 py-12">
            <h1 className="text-[#E10600] text-4xl md:text-6xl mb-4 tracking-tighter">
              System Breach <br /> Isolated
            </h1>
            <p className="text-zinc-500 mb-10 tracking-[0.2em] text-xs">
              Kritická chyba v klientské logice byla zastavena jádrem GOLIÁŠ. <br />
              Integrita dat nebyla ohrožena.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-white text-black px-10 py-5 text-[10px] tracking-[0.3em] hover:bg-[#E10600] hover:text-white transition-all duration-500"
            >
              RESTART SECURITY KERNEL
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
