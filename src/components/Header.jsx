import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser } from 'react-icons/fi';

export default function Header({ search, onSearchChange, showSearch = true }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled ? 'bg-obsidian/95 border-line shadow-[0_8px_24px_-16px_rgba(0,0,0,0.6)]' : 'bg-obsidian/70 border-line/40'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="shrink-0" data-cursor-hover>
          <span className="font-display text-lg tracking-[0.18em] text-ivory">
            ZARXAL <span className="text-gold">MALL</span>
          </span>
        </Link>

        {showSearch && (
          <div className="flex-1 relative max-w-xs ml-auto">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" size={16} />
            <input
              value={search}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Atir yoki brend qidirish"
              className="w-full bg-charcoal border border-line rounded-full pl-9 pr-3 py-2 text-sm text-ivory placeholder:text-smoke focus:border-gold-dim outline-none transition-colors"
            />
          </div>
        )}

        <button
          onClick={() => navigate('/admin/login')}
          aria-label="Admin"
          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-line text-smoke hover:text-gold hover:border-gold-dim transition-colors"
        >
          <FiUser size={16} />
        </button>
      </div>
    </header>
  );
}
