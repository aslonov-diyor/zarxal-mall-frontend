import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import PhoneInput from './PhoneInput';
import { submitCustomer } from '../api/customers';
import { isCompletePhone, toRawPhone } from '../utils/phoneMask';

export default function CustomerFormModal({ open, onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const mutation = useMutation({
    mutationFn: submitCustomer,
    onSuccess: () => {
      toast.success('Ma\u2019lumotlaringiz saqlandi');
      setName('');
      setPhone('');
      onSuccess?.();
      onClose();
    },
    onError: (err) => {
      toast.error(err.message || 'Server bilan bog\u2019lanishda xatolik yuz berdi.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!name.trim() || name.trim().length < 2) nextErrors.name = 'Ismingizni to\u2019liq kiriting.';
    if (!isCompletePhone(phone)) nextErrors.phone = 'Telefon raqamini to\u2019liq kiriting.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    mutation.mutate({ name: name.trim(), phone: toRawPhone(phone) });
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

            <h3 className="font-display text-lg text-ivory mb-1">Aloqa ma'lumotlaringiz</h3>
            <p className="text-sm text-smoke mb-5">Sizga tezroq javob berishimiz uchun</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-smoke mb-1.5">Ismingiz</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ismingizni kiriting"
                  className={`w-full bg-obsidian border rounded-lg px-4 py-3 text-ivory placeholder:text-smoke/60 outline-none transition-colors ${
                    errors.name ? 'border-red-500/60' : 'border-line focus:border-gold-dim'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>

              <PhoneInput value={phone} onChange={setPhone} error={errors.phone} />

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-3 rounded-lg bg-gold text-obsidian font-medium hover:bg-gold-dim disabled:opacity-60 transition-colors"
              >
                {mutation.isPending ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
