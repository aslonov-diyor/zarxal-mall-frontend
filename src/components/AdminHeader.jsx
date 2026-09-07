import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function AdminHeader({ title }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Tizimdan chiqdingiz');
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-obsidian/90 backdrop-blur-md border-b border-line">
      <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest2 text-gold">Zarxal Mall Admin</p>
          <h1 className="font-display text-lg text-ivory leading-tight">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          {admin?.name && <span className="hidden sm:block text-sm text-smoke">{admin.name}</span>}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-bone border border-line rounded-full px-3.5 py-2 hover:border-gold-dim hover:text-gold transition-colors"
          >
            <FiLogOut size={14} />
            Chiqish
          </button>
        </div>
      </div>
    </header>
  );
}
