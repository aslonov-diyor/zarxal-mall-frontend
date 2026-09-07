import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiFilter } from 'react-icons/fi';
import AdminHeader from '../components/AdminHeader';
import AdminBottomNav from '../components/AdminBottomNav';
import ConfirmModal from '../components/ConfirmModal';
import { PerfumeGridSkeleton } from '../components/Skeleton';
import { fetchPerfumes, deletePerfume } from '../api/perfumes';
import { fetchBrands } from '../api/brands';

const GENDER_LABEL = { MALE: 'Erkaklar', FEMALE: 'Ayollar', UNISEX: 'Unisex' };

export default function AdminPerfumes() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [brandId, setBrandId] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-perfumes', { search, gender, brandId }],
    queryFn: () => fetchPerfumes({ search, gender, brandId, limit: 50 }),
  });

  const { data: brands = [] } = useQuery({ queryKey: ['brands'], queryFn: fetchBrands });

  const deleteMutation = useMutation({
    mutationFn: deletePerfume,
    onSuccess: () => {
      toast.success("Atir o'chirildi");
      queryClient.invalidateQueries({ queryKey: ['admin-perfumes'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      setToDelete(null);
    },
    onError: (err) => toast.error(err.message || 'Server bilan bog\u2019lanishda xatolik yuz berdi.'),
  });

  const perfumes = data?.data || [];

  return (
    <div className="min-h-screen pb-24">
      <AdminHeader title="Atirlar" />

      <div className="max-w-5xl mx-auto px-4 pt-4 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" size={15} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nomi yoki brend bo'yicha qidirish"
              className="w-full bg-charcoal border border-line rounded-lg pl-9 pr-3 py-2.5 text-sm text-ivory placeholder:text-smoke outline-none focus:border-gold-dim transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
              showFilters ? 'border-gold text-gold' : 'border-line text-smoke'
            }`}
          >
            <FiFilter size={16} />
          </button>
          <Link
            to="/admin/perfumes/new"
            className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-gold text-obsidian"
          >
            <FiPlus size={18} />
          </Link>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2 pb-1">
            {['', 'MALE', 'FEMALE', 'UNISEX'].map((g) => (
              <button
                key={g || 'all'}
                onClick={() => setGender(g)}
                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                  gender === g ? 'border-gold text-gold' : 'border-line text-bone'
                }`}
              >
                {g ? GENDER_LABEL[g] : 'Barchasi'}
              </button>
            ))}
            <select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              className="px-3 py-1.5 rounded-full text-xs border border-line text-bone bg-transparent outline-none"
            >
              <option value="">Barcha brendlar</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id} className="bg-charcoal">{b.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="mt-4">
        {isLoading ? (
          <PerfumeGridSkeleton count={6} />
        ) : perfumes.length === 0 ? (
          <div className="text-center py-16 px-4">
            <p className="text-bone text-sm mb-4">Hozircha atirlar mavjud emas</p>
            <Link to="/admin/perfumes/new" className="text-gold text-sm border border-gold-dim rounded-full px-5 py-2 inline-block hover:bg-gold/10 transition-colors">
              + Atir qo'shish
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 px-4">
            {perfumes.map((p) => (
              <div key={p.id} className="rounded-lg overflow-hidden border border-line bg-charcoal">
                <div className="aspect-[3/4] bg-obsidian">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <span className="text-[10px] uppercase tracking-widest2 text-gold">{p.brand?.name}</span>
                  <h3 className="font-display text-sm text-ivory line-clamp-1 mt-0.5">{p.name}</h3>
                  <p className="text-xs text-smoke mt-0.5">{GENDER_LABEL[p.gender]}</p>
                  <div className="flex gap-2 mt-3">
                    <Link
                      to={`/admin/perfumes/${p.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-md border border-line text-xs text-bone hover:border-gold-dim hover:text-gold transition-colors"
                    >
                      <FiEdit2 size={12} /> Tahrirlash
                    </Link>
                    <button
                      onClick={() => setToDelete(p)}
                      className="w-9 flex items-center justify-center rounded-md border border-line text-red-400 hover:border-red-500/60 transition-colors"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!toDelete}
        title="Ushbu atirni o'chirishni xohlaysizmi?"
        description={toDelete?.name}
        onCancel={() => setToDelete(null)}
        onConfirm={() => deleteMutation.mutate(toDelete.id)}
        loading={deleteMutation.isPending}
      />

      <AdminBottomNav />
    </div>
  );
}
