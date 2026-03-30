"use client";
export default function CategoriesGrid() {
  const cats = [
    { id: '01', title: 'SUPLEMENTY', desc: 'Maximální výkon.' },
    { id: '02', title: 'VYBAVENÍ', desc: 'Profi stroje.' },
    { id: '03', title: 'BAZAR', desc: 'Top ceny strojů.' },
    { id: '04', title: 'GYM / TRENÉŘI', desc: 'Profi coaching.' },
  ];
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-black font-[1000] italic uppercase text-5xl mb-12 tracking-tighter">KATEGORIE</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map(c => (
            <div key={c.id} className="border border-zinc-100 p-8 flex flex-col bg-white shadow-sm hover:shadow-xl transition-all group min-h-[180px]">
              <span className="text-zinc-300 font-black mb-4">{c.id}</span>
              <h3 className="text-black font-[1000] italic text-2xl group-hover:text-red-600 transition-colors leading-none uppercase">{c.title}</h3>
              <p className="text-zinc-500 text-[10px] uppercase font-bold mt-2">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
