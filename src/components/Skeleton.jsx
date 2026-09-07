export function PerfumeCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden border border-line bg-charcoal">
      <div className="aspect-[3/4] bg-line/40 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-2.5 w-1/3 bg-line/40 rounded animate-pulse" />
        <div className="h-3.5 w-2/3 bg-line/40 rounded animate-pulse" />
        <div className="h-2.5 w-1/2 bg-line/40 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function PerfumeGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {[...Array(count)].map((_, i) => (
        <PerfumeCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 border border-line rounded-lg bg-charcoal">
      <div className="w-10 h-10 rounded-full bg-line/40 animate-pulse shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-1/3 bg-line/40 rounded animate-pulse" />
        <div className="h-2.5 w-1/2 bg-line/40 rounded animate-pulse" />
      </div>
    </div>
  );
}
