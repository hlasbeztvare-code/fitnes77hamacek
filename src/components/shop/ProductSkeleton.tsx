export default function ProductSkeleton() {
  return (
    <div className="animate-pulse bg-zinc-900 rounded-3xl p-4 border border-zinc-800">
      <div className="aspect-square bg-zinc-800 rounded-2xl mb-4" />
      <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2" />
      <div className="h-6 bg-zinc-800 rounded w-1/2" />
    </div>
  );
}
