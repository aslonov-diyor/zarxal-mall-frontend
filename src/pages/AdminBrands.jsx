import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import AdminHeader from '../components/AdminHeader';
import AdminBottomNav from '../components/AdminBottomNav';
import AddBrandModal from '../components/AddBrandModal';
import ConfirmModal from '../components/ConfirmModal';
import { RowSkeleton } from '../components/Skeleton';
import { fetchBrands, updateBrand, deleteBrand } from '../api/brands';

export default function AdminBrands() {
  const queryClient = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [toDelete, setToDelete] = useState(null);

  const { data: brands = [], isLoading } = useQuery({
    queryKey: ['admin-brands'],
    queryFn: fetchBrands,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }) => updateBrand(id, { name }),
    onSuccess: () => {
      toast.success('Brend yangilandi');
      queryClient.invalidateQueries({ queryKey: ['admin-brands'] });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      setEditingId(null);
    },
    onError: (err) => toast.error(err.message || "Server bilan bog'lanishda xatolik yuz berdi."),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => {
      toast.success("Brend o'chirildi");
      queryClient.invalidateQueries({ queryKey: ['admin-brands'] });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      setToDelete(null);
    },
    onError: (err) => {
      // Agar brendga bog'liq atirlar bo'lsa, backend 400 qaytaradi (P2003)
      toast.error(err.message || "Bu brendga bog'liq atirlar bor, avval ularni o'chiring yoki boshqa brendga o'tkazing.");
      setToDelete(null);
    },
  });

  const startEdit = (brand) => {
    setEditingId(brand.id);
    setEditingName(brand.name);
  };

  const saveEdit = (id) => {
    if (!editingName.trim()) {
      toast.error('Brend nomini kiriting.');
      return;
    }
    updateMutation.mutate({ id, name: editingName.trim() });
  };

  return (
    <div className="min-h-screen pb-24">
      <AdminHeader title="Brendlar" />

      <div className="max-w-5xl mx-auto px-4 pt-4">
        <button
          onClick={() => setShowAdd(true)}
          className="w-full mb-4 flex items-center justify-center gap-2 py-3 rounded-lg border border-dashed border-line text-bone hover:border-gold-dim hover:text-gold transition-colors"
        >
          <FiPlus size={16} /> Yangi brend qo'shish
        </button>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => <RowSkeleton key={i} />)}
          </div>
        ) : brands.length === 0 ? (
          <p className="text-center text-bone text-sm py-14">Hozircha brendlar mavjud emas</p>
        ) : (
          <div className="space-y-2">
            {brands.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                className="flex items-center gap-3 p-3 border border-line rounded-lg bg-charcoal"
              >
                {editingId === b.id ? (
                  <>
                    <input
                      autoFocus
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit(b.id)}
                      className="flex-1 bg-obsidian border border-gold-dim rounded-md px-3 py-1.5 text-sm text-ivory outline-none"
                    />
                    <button
                      onClick={() => saveEdit(b.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-gold-dim text-gold"
                    >
                      <FiCheck size={14} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-line text-smoke"
                    >
                      <FiX size={14} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-ivory text-sm font-medium truncate">{b.name}</p>
                      <p className="text-smoke text-xs">{b._count?.perfumes ?? 0} ta atir</p>
                    </div>
                    <button
                      onClick={() => startEdit(b)}
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-line text-bone hover:border-gold-dim hover:text-gold transition-colors"
                    >
                      <FiEdit2 size={13} />
                    </button>
                    <button
                      onClick={() => setToDelete(b)}
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-line text-red-400 hover:border-red-500/60 transition-colors"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AddBrandModal open={showAdd} onClose={() => setShowAdd(false)} />

      <ConfirmModal
        open={!!toDelete}
        title="Ushbu brendni o'chirishni xohlaysizmi?"
        description={toDelete?.name}
        onCancel={() => setToDelete(null)}
        onConfirm={() => deleteMutation.mutate(toDelete.id)}
        loading={deleteMutation.isPending}
      />

      <AdminBottomNav />
    </div>
  );
}
