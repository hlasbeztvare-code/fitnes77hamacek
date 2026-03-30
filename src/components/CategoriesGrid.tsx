import React from 'react';

const categories = [
  { id: '01', title: 'SUPLEMENTY', desc: 'Výživa pro maximální výkon.' },
  { id: '02', title: 'VYBAVENÍ', desc: 'Profi stroje pro tvůj gym.' },
  { id: '03', title: 'BAZAR', desc: 'Stroje z druhé ruky za top ceny.' },
  { id: '04', title: 'GYM / TRENÉŘI', desc: 'Coaching od opravdových profíků.' },
];

export default function CategoriesGrid() {
  return (
    <section className="bg-black py-12 px-4 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col border border-zinc-800 p-6 bg-zinc-950 hover:border-red-600 transition-all min-h-[160px]">
            <span className="text-red-600 font-black text-xs mb-2 tracking-widest">{cat.id}</span>
            <h3 className="text-white font-black italic uppercase text-xl mb-2 tracking-tighter leading-none">
              {cat.title}
            </h3>
            <p className="text-zinc-500 text-xs leading-tight uppercase font-medium">
              {cat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
