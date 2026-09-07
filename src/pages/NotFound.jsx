import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-4xl text-gold mb-3">404</p>
      <p className="text-bone mb-6">Ma'lumot topilmadi.</p>
      <Link to="/" className="text-sm border border-gold-dim text-gold rounded-full px-5 py-2 hover:bg-gold/10 transition-colors">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
