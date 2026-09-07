import { AnimatePresence, motion } from 'framer-motion';

export default function ConfirmModal({ open, title, description, confirmLabel = "O'chirish", onConfirm, onCancel, loading }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={onCancel} />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full sm:max-w-sm bg-charcoal border border-line rounded-t-2xl sm:rounded-2xl p-6"
          >
            <h3 className="font-display text-lg text-ivory mb-2">{title}</h3>
            {description && <p className="text-sm text-bone mb-6">{description}</p>}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 py-3 rounded-lg border border-line text-bone hover:border-gold-dim transition-colors"
              >
                Bekor qilish
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-red-600/90 text-ivory hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {loading ? '...' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
