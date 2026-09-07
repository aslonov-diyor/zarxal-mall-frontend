import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiUpload, FiImage, FiPlus } from 'react-icons/fi';
import AdminHeader from '../components/AdminHeader';
import AdminBottomNav from '../components/AdminBottomNav';
import AddBrandModal from '../components/AddBrandModal';
import { fetchBrands } from '../api/brands';
import { fetchPerfumeById, updatePerfume } from '../api/perfumes';

const SIZES = [10, 20, 30, 50, 75, 100];
const GENDERS = [
  { value: 'MALE', label: 'Erkaklar uchun' },
  { value: 'FEMALE', label: 'Ayollar uchun' },
  { value: 'UNISEX', label: 'Unisex' },
];

export default function AdminEditPerfume() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [showAddBrand, setShowAddBrand] = useState(false);

  const { data: perfume, isLoading } = useQuery({
    queryKey: ['perfume', id],
    queryFn: () => fetchPerfumeById(id),
  });

  const { data: brands = [] } = useQuery({ queryKey: ['brands'], queryFn: fetchBrands });

  const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm({
    defaultValues: { name: '', brandId: '', gender: '', description: '' },
  });

  useEffect(() => {
    if (perfume) {
      reset({
        name: perfume.name,
        brandId: perfume.brandId,
        gender: perfume.gender,
        description: perfume.description || '',
      });
      setSelectedSizes(perfume.sizes || []);
      setPreview(perfume.image);
    }
  }, [perfume, reset]);

  const mutation = useMutation({
    mutationFn: (formData) => updatePerfume(id, formData),
    onSuccess: () => {
      toast.success("O'zgarishlar saqlandi");
      queryClient.invalidateQueries({ queryKey: ['admin-perfumes'] });
      queryClient.invalidateQueries({ queryKey: ['perfume', id] });
      navigate('/admin/perfumes');
    },
    onError: (err) => toast.error(err.message || 'Server bilan bog\u2019lanishda xatolik yuz berdi.'),
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const onSubmit = (values) => {
    if (selectedSizes.length === 0) {
      toast.error('Kamida bitta hajm tanlang.');
      return;
    }
    const formData = new FormData();
    formData.append('name', values.name.trim());
    formData.append('brandId', values.brandId);
    formData.append('gender', values.gender);
    formData.append('description', values.description?.trim() || '');
    formData.append('sizes', JSON.stringify(selectedSizes));
    if (imageFile) formData.append('image', imageFile);

    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-line border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <AdminHeader title="Atirni tahrirlash" />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        <div>
          <label className="block text-xs text-smoke mb-2">Rasm</label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-square rounded-xl border border-dashed border-line bg-charcoal flex flex-col items-center justify-center gap-2 overflow-hidden hover:border-gold-dim transition-colors"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <FiImage size={28} className="text-smoke" />
                <span className="text-sm text-smoke flex items-center gap-1.5">
                  <FiUpload size={14} /> Rasm yuklash
                </span>
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label className="block text-xs text-smoke mb-1.5">Atir nomi</label>
          <input
            {...register('name', { required: true })}
            className={`w-full bg-obsidian border rounded-lg px-4 py-3 text-ivory outline-none transition-colors ${
              errors.name ? 'border-red-500/60' : 'border-line focus:border-gold-dim'
            }`}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs text-smoke">Brend</label>
            <button
              type="button"
              onClick={() => setShowAddBrand(true)}
              className="flex items-center gap-1 text-xs text-gold hover:text-gold-dim transition-colors"
            >
              <FiPlus size={13} /> Yangi brend
            </button>
          </div>
          <select
            {...register('brandId', { required: true })}
            className="w-full bg-obsidian border border-line rounded-lg px-4 py-3 text-ivory outline-none focus:border-gold-dim transition-colors"
          >
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-smoke mb-2">Hajmi</label>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSize(s)}
                className={`px-3.5 py-2 rounded-lg text-sm border transition-colors ${
                  selectedSizes.includes(s)
                    ? 'border-gold text-gold bg-gold/10'
                    : 'border-line text-bone hover:border-gold-dim'
                }`}
              >
                {s} ml
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs text-smoke mb-2">Jinsi</label>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <div className="flex gap-2">
                {GENDERS.map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => field.onChange(g.value)}
                    className={`flex-1 px-2 py-2.5 rounded-lg text-sm border transition-colors ${
                      field.value === g.value
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-line text-bone hover:border-gold-dim'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            )}
          />
        </div>

        <div>
          <label className="block text-xs text-smoke mb-1.5">Tavsif</label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full bg-obsidian border border-line rounded-lg px-4 py-3 text-ivory outline-none focus:border-gold-dim transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-3.5 rounded-lg bg-gold text-obsidian font-medium hover:bg-gold-dim disabled:opacity-60 transition-colors"
        >
          {mutation.isPending ? 'Saqlanmoqda...' : "O'ZGARISHLARNI SAQLASH"}
        </button>
      </form>

      <AddBrandModal
        open={showAddBrand}
        onClose={() => setShowAddBrand(false)}
        onCreated={(brand) => setValue('brandId', brand.id, { shouldValidate: true })}
      />

      <AdminBottomNav />
    </div>
  );
}
