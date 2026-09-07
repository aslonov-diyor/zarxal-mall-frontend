import { NavLink } from 'react-router-dom';
import { FiGrid, FiPlusCircle, FiBox, FiTag, FiUsers } from 'react-icons/fi';

const ITEMS = [
  { to: '/admin/dashboard', icon: FiGrid, label: 'Dashboard' },
  { to: '/admin/perfumes/new', icon: FiPlusCircle, label: 'Qo\u2019shish' },
  { to: '/admin/perfumes', icon: FiBox, label: 'Atirlar' },
  { to: '/admin/brands', icon: FiTag, label: 'Brendlar' },
  { to: '/admin/customers', icon: FiUsers, label: 'Mijozlar' },
];

export default function AdminBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-charcoal/95 backdrop-blur-md border-t border-line pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-5xl mx-auto grid grid-cols-5">
        {ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin/perfumes'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2.5 text-[10px] transition-colors ${
                isActive ? 'text-gold' : 'text-smoke hover:text-bone'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
