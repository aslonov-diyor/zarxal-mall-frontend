import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import AdminHeader from '../components/AdminHeader';
import AdminBottomNav from '../components/AdminBottomNav';
import { fetchDashboardStats } from '../api/auth';
import { useCountUp } from '../hooks/useCountUp';

const STAT_LABELS = [
  { key: 'totalPerfumes', label: 'Jami atirlar' },
  { key: 'totalCustomers', label: 'Jami mijozlar' },
  { key: 'totalBrands', label: 'Jami brendlar' },
  { key: 'todayCustomers', label: 'Bugungi mijozlar' },
];

function StatCard({ label, value, isLoading, delay }) {
  const animated = useCountUp(isLoading ? undefined : value ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="relative border border-line rounded-xl bg-charcoal p-5 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, #B7965B 0%, transparent 70%)' }}
      />
      <p className="relative text-xs text-smoke mb-2">{label}</p>
      {isLoading ? (
        <div className="h-7 w-14 bg-line/40 rounded animate-pulse" />
      ) : (
        <p className="relative font-display text-3xl text-gold tabular-nums">{animated}</p>
      )}
    </motion.div>
  );
}

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  });

  return (
    <div className="min-h-screen pb-24">
      <AdminHeader title="Dashboard" />

      <div className="max-w-5xl mx-auto px-4 pt-6 grid grid-cols-2 gap-3">
        {STAT_LABELS.map((stat, i) => (
          <StatCard
            key={stat.key}
            label={stat.label}
            value={data?.[stat.key]}
            isLoading={isLoading}
            delay={i * 0.06}
          />
        ))}
      </div>

      <AdminBottomNav />
    </div>
  );
}
