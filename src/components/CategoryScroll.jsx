const CATEGORIES = [
  { key: '', label: 'Barcha atirlar' },
  { key: 'MALE', label: 'Erkaklar' },
  { key: 'FEMALE', label: 'Ayollar' },
  { key: 'UNISEX', label: 'Unisex' },
];

export default function CategoryScroll({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.key;
        return (
          <button
            key={cat.key || 'all'}
            onClick={() => onChange(cat.key)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm border transition-colors ${
              isActive
                ? 'bg-gold text-obsidian border-gold font-medium'
                : 'bg-transparent text-bone border-line hover:border-gold-dim'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
