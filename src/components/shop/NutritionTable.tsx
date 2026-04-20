"use client";

/**
 * GOLIÁŠ NutritionTable v1.0
 * Čisté a výkonné zobrazení nutričních hodnot.
 */

interface NutritionProps {
  data: Record<string, string>;
}

export default function NutritionTable({ data }: NutritionProps) {
  if (!data || Object.keys(data).length === 0) return null;

  return (
    <div className="mt-12 overflow-hidden border border-zinc-100 bg-zinc-50/50 [clip-path:polygon(2%_0%,100%_0%,98%_100%,0%_100%)]">
      <div className="bg-zinc-900 px-6 py-3">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
          Nutriční Hodnoty / 100g
        </h3>
      </div>
      <div className="p-6 space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between border-b border-zinc-200 pb-2 last:border-0 last:pb-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">{key}</span>
            <span className="text-sm font-black text-zinc-950">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
