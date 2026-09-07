import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const GENDER_LABEL = { MALE: 'Erkaklar', FEMALE: 'Ayollar', UNISEX: 'Unisex' };

export default function PerfumeCard({ perfume, index = 0 }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const shineX = useTransform(mx, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4), ease: [0.65, 0, 0.35, 1] }}
      style={{ perspective: 800 }}
    >
      <Link
        ref={ref}
        to={`/perfume/${perfume.id}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor-hover
        className="group relative flex flex-col rounded-lg overflow-hidden border border-line bg-charcoal transition-[border-color,box-shadow] duration-300 hover:border-gold-dim hover:shadow-[0_18px_40px_-16px_rgba(183,150,91,0.25)]"
      >
        <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="flex flex-col">
          <div className="relative aspect-[3/4] overflow-hidden bg-obsidian">
            {!loaded && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-line/40 to-transparent" />
            )}
            <img
              src={perfume.image}
              alt={perfume.name}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover group-hover:scale-[1.06] transition-[transform,opacity] duration-700 ease-out ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {/* moving light sheen on hover */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: useTransform(
                  shineX,
                  (v) => `linear-gradient(115deg, transparent 30%, rgba(183,150,91,0.14) ${v}, transparent 70%)`
                ),
              }}
            />
            {/* corner accent that draws in on hover */}
            <span className="absolute top-2.5 right-2.5 w-5 h-5 border-t border-r border-gold/0 group-hover:border-gold/70 transition-colors duration-300" />
          </div>
          <div className="p-3 flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-widest2 text-gold">{perfume.brand?.name}</span>
            <h3 className="font-display text-base text-ivory leading-snug line-clamp-1">{perfume.name}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-smoke">{GENDER_LABEL[perfume.gender]}</span>
              <span className="text-xs text-bone">
                {perfume.sizes?.length ? `${Math.min(...perfume.sizes)}\u2013${Math.max(...perfume.sizes)} ml` : ''}
              </span>
            </div>
            <span className="mt-2 text-xs text-gold-dim group-hover:text-gold group-hover:underline underline-offset-4 transition-colors">
              Batafsil
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
