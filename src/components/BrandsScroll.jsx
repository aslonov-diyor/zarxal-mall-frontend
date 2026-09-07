import { useQuery } from '@tanstack/react-query';
import { fetchBrands } from '../api/brands';

export default function BrandsScroll({ activeBrandId, onSelectBrand }) {
  const { data: brands = [], isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  });

  if (isLoading) {
    return (
      <div className="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="shrink-0 w-20 h-8 rounded-full bg-charcoal animate-pulse" />
        ))}
      </div>
    );
  }

  if (!brands.length) return null;

  return (
    <div className="px-4 py-2">
      <p className="text-xs uppercase tracking-widest2 text-smoke mb-2">Brendlar</p>
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onSelectBrand('')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm border transition-colors ${
            !activeBrandId
              ? 'border-gold text-gold'
              : 'border-line text-bone hover:border-gold-dim'
          }`}
        >
          Barchasi
        </button>
        {brands.map((b) => (
          <button
            key={b.id}
            onClick={() => onSelectBrand(b.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm border transition-colors ${
              activeBrandId === b.id
                ? 'border-gold text-gold'
                : 'border-line text-bone hover:border-gold-dim'
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>
    </div>
  );
}
