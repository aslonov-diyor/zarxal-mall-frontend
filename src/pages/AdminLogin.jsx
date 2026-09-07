import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import PhoneInput from '../components/PhoneInput';
import { useAuth } from '../hooks/useAuth';
import { isCompletePhone, toRawPhone } from '../utils/phoneMask';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = 'Ismni kiriting.';
    if (!isCompletePhone(phone)) nextErrors.phone = 'Telefon raqamini to\u2019liq kiriting.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      await login({ phone: toRawPhone(phone), name: name.trim() });
      toast.success('Xush kelibsiz');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.message || 'Telefon raqami yoki ism noto\u2019g\u2019ri.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-10 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 w-[380px] h-[380px] rounded-full blur-[100px] opacity-[0.14]"
        style={{ background: 'radial-gradient(circle, #B7965B 0%, transparent 70%)' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <p className="font-display text-xl tracking-[0.18em] text-ivory">
            ZARXAL <span className="text-gold">MALL</span>
          </p>
          <p className="text-xs text-smoke mt-2 uppercase tracking-widest2">Admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 border border-line rounded-2xl bg-charcoal p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
          <PhoneInput value={phone} onChange={setPhone} label="Telefon raqami" error={errors.phone} />

          <div>
            <label className="block text-xs text-smoke mb-1.5">Ism</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ismingiz"
              className={`w-full bg-obsidian border rounded-lg px-4 py-3 text-ivory placeholder:text-smoke/60 outline-none transition-colors ${
                errors.name ? 'border-red-500/60' : 'border-line focus:border-gold-dim'
              }`}
            />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            data-cursor-hover
            className="w-full py-3.5 rounded-lg bg-gold text-obsidian font-medium hover:bg-gold-dim disabled:opacity-60 transition-colors"
          >
            {loading ? 'Kirilmoqda...' : 'Kirish'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
