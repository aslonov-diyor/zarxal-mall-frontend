import { maskPhoneInput } from '../utils/phoneMask';

export default function PhoneInput({ value, onChange, label = 'Telefon raqamingiz', error }) {
  const handleChange = (e) => {
    const masked = maskPhoneInput(e.target.value, value);
    onChange(masked);
  };

  const handleFocus = () => {
    if (!value) onChange('+998 ');
  };

  return (
    <div>
      <label className="block text-xs text-smoke mb-1.5">{label}</label>
      <input
        type="tel"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder="+998 90 123 45 67"
        className={`w-full bg-obsidian border rounded-lg px-4 py-3 text-ivory placeholder:text-smoke/60 outline-none transition-colors ${
          error ? 'border-red-500/60' : 'border-line focus:border-gold-dim'
        }`}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
