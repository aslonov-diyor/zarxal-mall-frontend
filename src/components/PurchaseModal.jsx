import { AnimatePresence, motion } from 'framer-motion';
import { FiCopy, FiPhone, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const SELLER_PHONE = import.meta.env.VITE_SELLER_PHONE || '+998 90 123 45 67';

export default function PurchaseModal({ open, onClose, perfumeName }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SELLER_PHONE.replace(/\s/g, ''));
      toast.success('Telefon raqami nusxalandi');
    } catch {
      toast.error("Nusxalashda xatolik yuz berdi.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full sm:max-w-sm bg-charcoal border border-line rounded-t-2xl sm:rounded-2xl p-6 pb-8"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-smoke hover:text-ivory"
              aria-label="Yopish"
            >
              <FiX size={20} />
            </button>

            <div className="w-10 h-10 rounded-full border border-gold-dim flex items-center justify-center mb-4">
              <FiPhone className="text-gold" size={18} />
            </div>

            <h3 className="font-display text-lg text-ivory mb-1">Buyurtma berish uchun biz bilan bog'laning</h3>
            {perfumeName && <p className="text-sm text-smoke mb-5">{perfumeName}</p>}

            <div className="flex items-center justify-between bg-obsidian border border-line rounded-lg px-4 py-3.5 mb-4">
              <span className="text-ivory font-medium tracking-wide">{SELLER_PHONE}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-gold border border-gold-dim rounded-full px-3 py-1.5 hover:bg-gold/10 transition-colors"
              >
                <FiCopy size={13} />
                Raqamni nusxalash
              </button>
            </div>

            <a
              href={`tel:${SELLER_PHONE.replace(/\s/g, '')}`}
              className="block text-center w-full py-3 rounded-lg bg-gold text-obsidian font-medium hover:bg-gold-dim transition-colors"
            >
              Qo'ng'iroq qilish
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
