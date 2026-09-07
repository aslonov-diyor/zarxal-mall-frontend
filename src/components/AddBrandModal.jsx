import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBrand } from '../api/brands';

// Tezkor "yangi brend qo'shish" oynasi — Atir qo'shish/tahrirlash formalaridan
// chiqmasdan turib yangi brend yaratish uchun ishlatiladi.
export default function AddBrandModal({ open, onClose, onCreated }) {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBrand,
    onSuccess: (brand) => {
      toast.success("Brend qo'shildi");
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      queryClient.invalidateQueries({ queryKey: ['admin-brands'] });
      setName('');
      onCreated?.(brand);
      onClose();
    },
    onError: (err) => toast.error(err.message || "Server bilan bog'lanishda xatolik yuz berdi."),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Brend nomini kiriting.');
      return;
    }
    mutation.mutate({ name: name.trim() });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full sm:max-w-sm bg-charcoal border border-line rounded-t-2xl sm:rounded-2xl p-6"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-smoke hover:text-ivory"
              aria-label="Yopish"
            >
              <FiX size={20} />
            </button>

            <h3 className="font-display text-lg text-ivory mb-4">Yangi brend qo'shish</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-smoke mb-1.5">Brend nomi</label>
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masalan: Versace"
                  className="w-full bg-obsidian border border-line rounded-lg px-4 py-3 text-ivory placeholder:text-smoke/60 outline-none focus:border-gold-dim transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-3 rounded-lg bg-gold text-obsidian font-medium hover:bg-gold-dim disabled:opacity-60 transition-colors"
              >
                {mutation.isPending ? "Qo'shilmoqda..." : "Brendni qo'shish"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
