import { AnimatePresence, motion } from 'framer-motion';
import { FiCopy, FiPhone, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const SELLER_PHONE = '+998 94 883 99 30';

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
          className="z-50 fixed inset-0 flex justify-center items-end sm:items-center"
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
            className="relative bg-charcoal p-6 pb-8 border border-line sm:rounded-2xl rounded-t-2xl w-full sm:max-w-sm"
          >
            <button
              onClick={onClose}
              className="top-4 right-4 absolute text-smoke hover:text-ivory"
              aria-label="Yopish"
            >
              <FiX size={20} />
            </button>

            <div className="flex justify-center items-center mb-4 border border-gold-dim rounded-full w-10 h-10">
              <FiPhone className="text-gold" size={18} />
            </div>

            <h3 className="mb-1 font-display text-ivory text-lg">Buyurtma berish uchun biz bilan bog'laning</h3>
            {perfumeName && <p className="mb-5 text-smoke text-sm">{perfumeName}</p>}

            <div className="flex justify-between items-center bg-obsidian mb-4 px-4 py-3.5 border border-line rounded-lg">
              <span className="font-medium text-ivory tracking-wide">{SELLER_PHONE}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 hover:bg-gold/10 px-3 py-1.5 border border-gold-dim rounded-full text-gold text-xs transition-colors"
              >
                <FiCopy size={13} />
                Raqamni nusxalash
              </button>
            </div>

            <a
              href={`tel:${SELLER_PHONE.replace(/\s/g, '')}`}
              className="block bg-gold hover:bg-gold-dim py-3 rounded-lg w-full font-medium text-obsidian text-center transition-colors"
            >
              Qo'ng'iroq qilish
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
