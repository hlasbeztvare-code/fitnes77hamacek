"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GymPage() {
  return (
    <main className="bg-black text-white min-h-screen font-sans">

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight">
            FITNESS 77
          </h1>

          <p className="mt-6 text-zinc-400 text-lg">
            Silový trénink. Reálné výsledky. Žádné zbytečnosti.
          </p>

          <Link
            href="/kontakt"
            className="inline-block mt-10 px-8 py-4 border border-white hover:bg-white hover:text-black transition"
          >
            Rezervovat trénink
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <p className="text-zinc-400 leading-relaxed">
          Jsme menší gym zaměřený na individuální přístup. Žádný přeplněný prostor,
          žádné zbytečné věci. Jen kvalitní vybavení, trenéři a výsledky.
        </p>
      </section>

      {/* TRAINERS */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {["HAMÁČEK", "SOUSTRUŽNÍK"].map((name, i) => (
          <div key={i}>
            <div className="relative h-[400px]">
              <Image
                src={`/images/trainers/old_web_${i + 1}.jpg`}
                alt={name}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-bold">{name}</h3>
              <p className="text-zinc-400 mt-2">Osobní trenér</p>
            </div>
          </div>
        ))}

      </section>

      {/* PRICING */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Ceník</h2>

        <div className="space-y-6 text-lg">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span>Jednorázový vstup</span>
            <span>160 Kč</span>
          </div>

          <div className="flex justify-between border-b border-white/10 pb-2">
            <span>Měsíční členství</span>
            <span>1490 Kč</span>
          </div>

          <div className="flex justify-between border-b border-white/10 pb-2">
            <span>Roční členství</span>
            <span>12990 Kč</span>
          </div>
        </div>

        <Link
          href="/kontakt"
          className="inline-block mt-10 px-8 py-4 border border-white hover:bg-white hover:text-black transition"
        >
          Začít
        </Link>
      </section>

    </main>
  );
}
