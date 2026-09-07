import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiSearch, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import AdminHeader from '../components/AdminHeader';
import AdminBottomNav from '../components/AdminBottomNav';
import { RowSkeleton } from '../components/Skeleton';
import { fetchCustomers, fetchCustomerStats } from '../api/customers';
import { formatDateTime } from '../utils/formatDate';

export default function AdminCustomers() {
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-customers', search],
    queryFn: () => fetchCustomers({ search, limit: 50 }),
  });

  const { data: stats } = useQuery({
    queryKey: ['customer-stats'],
    queryFn: fetchCustomerStats,
  });

  const customers = data?.data || [];

  const STAT_ITEMS = [
    { key: 'today', label: 'Bugun' },
    { key: 'week', label: 'Bu hafta' },
    { key: 'month', label: 'Bu oy' },
    { key: 'total', label: 'Jami' },
  ];

  return (
    <div className="min-h-screen pb-24">
      <AdminHeader title="Mijozlar" />

      <div className="max-w-5xl mx-auto px-4 pt-4">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {STAT_ITEMS.map((s) => (
            <div key={s.key} className="border border-line rounded-lg bg-charcoal p-3 text-center">
              <p className="font-display text-lg text-gold">{stats?.[s.key] ?? '—'}</p>
              <p className="text-[10px] text-smoke mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" size={15} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ism yoki telefon bo'yicha qidirish"
            className="w-full bg-charcoal border border-line rounded-lg pl-9 pr-3 py-2.5 text-sm text-ivory placeholder:text-smoke outline-none focus:border-gold-dim transition-colors"
          />
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => <RowSkeleton key={i} />)}
          </div>
        ) : customers.length === 0 ? (
          <p className="text-center text-bone text-sm py-14">Hozircha mijozlar mavjud emas</p>
        ) : (
          <div className="space-y-2">
            {customers.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.3) }}
                className="flex items-center gap-3 p-3 border border-line rounded-lg bg-charcoal"
              >
                <div className="w-10 h-10 rounded-full border border-gold-dim flex items-center justify-center shrink-0">
                  <FiUser className="text-gold" size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-ivory text-sm font-medium truncate">{c.name}</p>
                  <p className="text-smoke text-xs">{c.phone}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-smoke">Oxirgi tashrif</p>
                  <p className="text-xs text-bone">{formatDateTime(c.lastVisit)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AdminBottomNav />
    </div>
  );
}
