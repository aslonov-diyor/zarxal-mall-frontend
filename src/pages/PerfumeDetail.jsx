import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { fetchPerfumeById } from '../api/perfumes';
import PurchaseModal from '../components/PurchaseModal';

const GENDER_LABEL = { MALE: 'Erkaklar uchun', FEMALE: 'Ayollar uchun', UNISEX: 'Unisex' };

export default function PerfumeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPurchase, setShowPurchase] = useState(false);
  const [activeSize, setActiveSize] = useState(null);

  const { data: perfume, isLoading, isError } = useQuery({
    queryKey: ['perfume', id],
    queryFn: () => fetchPerfumeById(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-line border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !perfume) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <p className="text-bone mb-4">Ma'lumot topilmadi.</p>
        <button onClick={() => navigate('/')} className="text-gold text-sm underline">
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  const sizes = [...(perfume.sizes || [])].sort((a, b) => a - b);

  return (
    <div className="min-h-screen pb-28">
      <header className="sticky top-0 z-30 bg-obsidian/90 backdrop-blur-md border-b border-line px-4 py-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-bone hover:text-ivory">
          <FiArrowLeft size={16} />
          Orqaga
        </button>
      </header>

      <div className="relative w-full aspect-square bg-charcoal overflow-hidden">
        <motion.img
          src={perfume.image}
          alt={perfume.name}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="w-full h-full object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,10,8,0.55) 0%, transparent 35%)' }}
        />
      </div>

      <div className="px-5 pt-6">
        <span className="text-xs uppercase tracking-widest2 text-gold">{perfume.brand?.name}</span>
        <h1 className="font-display text-2xl text-ivory mt-2 mb-1">{perfume.name}</h1>
        <p className="text-sm text-smoke">{GENDER_LABEL[perfume.gender]}</p>

        {sizes.length > 0 && (
          <div className="mt-6">
            <p className="text-xs text-smoke mb-2">Mavjud hajmlar</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSize(s)}
                  className={`px-3.5 py-2 rounded-lg text-sm border transition-colors ${
                    activeSize === s
                      ? 'border-gold text-gold bg-gold/10'
                      : 'border-line text-bone hover:border-gold-dim'
                  }`}
                >
                  {s} ml
                </button>
              ))}
            </div>
          </div>
        )}

        {perfume.description && (
          <div className="mt-6">
            <p className="text-xs text-smoke mb-2">Atir haqida</p>
            <p className="text-sm text-bone leading-relaxed">{perfume.description}</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 bg-obsidian/95 backdrop-blur-md border-t border-line p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <motion.button
          onClick={() => setShowPurchase(true)}
          whileTap={{ scale: 0.98 }}
          data-cursor-hover
          className="w-full py-3.5 rounded-lg bg-gold text-obsidian font-medium hover:bg-gold-dim transition-colors"
        >
          Sotib olish
        </motion.button>
      </div>

      <PurchaseModal open={showPurchase} onClose={() => setShowPurchase(false)} perfumeName={perfume.name} />
    </div>
  );
}
