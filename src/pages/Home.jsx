import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from 'framer-motion';
import {
  IoDiamondOutline,
  IoShieldCheckmarkOutline,
  IoResizeOutline,
  IoSparklesOutline,
  IoArrowForward,
  IoCheckmarkCircle,
} from 'react-icons/io5';
import Header from '../components/Header';
import CategoryScroll from '../components/CategoryScroll';
import BrandsScroll from '../components/BrandsScroll';
import PerfumeCard from '../components/PerfumeCard';
import Footer from '../components/Footer';
import { PerfumeGridSkeleton } from '../components/Skeleton';
import { fetchPerfumes } from '../api/perfumes';

const WHY_US = [
  {
    icon: IoShieldCheckmarkOutline,
    title: 'Original mahsulotlar',
    desc: "Har bir shisha rasmiy distribyutorlardan, sinov va sertifikatlardan o'tgan.",
  },
  {
    icon: IoDiamondOutline,
    title: 'Premium tanlov',
    desc: "Dunyoning yetakchi parfyumeriya uylaridan diqqat bilan tanlangan iforlar.",
  },
  {
    icon: IoResizeOutline,
    title: 'Turli xil hajmlar',
    desc: 'Har kuni uchun ham, sovg\u2018a uchun ham \u2014 sizga mos hajmni tanlang.',
  },
  {
    icon: IoSparklesOutline,
    title: 'Yuqori xizmat sifati',
    desc: "Buyurtmadan yetkazib berishgacha \u2014 har bir bosqichda g'amxo'rlik.",
  },
];

const STATS = [
  { value: '5000+', label: 'Mamnun mijozlar' },
  { value: '200+', label: 'Original brendlar' },
  { value: '4.8', label: "O'rtacha reyting" },
  { value: '100%', label: 'Original kafolat' },
];

const PAYMENT_METHODS = ['Payme', 'Click', 'Uzcard', 'Humo'];

const TESTIMONIALS = [
  { name: 'Aziz T.', text: 'Original mahsulot, tez javob berishdi. Tavsiya qilaman!', rating: 5 },
  { name: 'Malika R.', text: 'Ifor xuddi rasmdagidek, sifatidan juda mamnunman.', rating: 5 },
  { name: "Jasur K.", text: "Zarxal Mall'dan doim xarid qilaman, hech qachon aldanmaganman.", rating: 5 },
];

/* ---------- Stylised perfume bottle rendered in CSS/SVG, no external asset ---------- */
function PerfumeBottle({ className = '', size = 1 }) {
  return (
    <svg
      viewBox="0 0 220 380"
      className={className}
      style={{ width: 220 * size, height: 380 * size }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="45%" stopColor="#141414" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
        <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E4C98A" />
          <stop offset="55%" stopColor="#B7965B" />
          <stop offset="100%" stopColor="#7C6438" />
        </linearGradient>
        <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F5F1E8" stopOpacity="0" />
          <stop offset="45%" stopColor="#F5F1E8" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#F5F1E8" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="liquid" cx="50%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8A6A2B" stopOpacity="0.25" />
        </radialGradient>
      </defs>

      {/* neck */}
      <rect x="94" y="34" width="32" height="34" rx="3" fill="url(#glass)" stroke="#B7965B" strokeOpacity="0.35" />
      {/* cap */}
      <rect x="84" y="4" width="52" height="34" rx="6" fill="url(#capGrad)" />
      <rect x="84" y="4" width="52" height="8" rx="4" fill="#F0DCA6" opacity="0.5" />

      {/* body */}
      <rect
        x="30"
        y="66"
        width="160"
        height="290"
        rx="20"
        fill="url(#glass)"
        stroke="#B7965B"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      {/* liquid fill */}
      <rect x="34" y="150" width="152" height="200" rx="14" fill="url(#liquid)" />
      {/* sheen sweep */}
      <rect x="30" y="66" width="160" height="290" rx="20" fill="url(#sheen)" />

      {/* label */}
      <rect x="52" y="196" width="116" height="68" rx="2" fill="#0A0A0A" stroke="#B7965B" strokeOpacity="0.5" />
      <line x1="66" y1="216" x2="154" y2="216" stroke="#B7965B" strokeWidth="1" opacity="0.7" />
      <text x="110" y="234" textAnchor="middle" fill="#E9DCB8" fontSize="11" letterSpacing="2" fontFamily="serif">
        ZARXAL
      </text>
      <line x1="66" y1="246" x2="154" y2="246" stroke="#B7965B" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

function FloatingParticles() {
  const dots = [
    { top: '12%', left: '18%', delay: 0, size: 4 },
    { top: '28%', left: '78%', delay: 0.6, size: 3 },
    { top: '58%', left: '10%', delay: 1.1, size: 5 },
    { top: '70%', left: '84%', delay: 0.3, size: 3 },
    { top: '40%', left: '50%', delay: 1.6, size: 4 },
    { top: '85%', left: '40%', delay: 0.9, size: 3 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute bg-gold rounded-full"
          style={{ top: d.top, left: d.left, width: d.size, height: d.size }}
          animate={{ y: [0, -16, 0], opacity: [0.15, 0.75, 0.15] }}
          transition={{ duration: 4.5, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ---------- Rotating showcase of real perfume photos (hero) ---------- */
function HeroShowcase({ images }) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (images.length < 2 || prefersReducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3800);
    return () => clearInterval(id);
  }, [images.length, prefersReducedMotion]);

  if (images.length === 0) {
    return (
      <div className="flex justify-center items-center bg-[#111] border border-line rounded-2xl w-[300px] sm:w-[380px] h-[420px] sm:h-[520px]">
        <span className="bg-gold-dim rounded-full w-2 h-2 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative bg-[#111] border border-gold-dim/60 rounded-2xl w-[300px] sm:w-[380px] h-[420px] sm:h-[520px] overflow-hidden">
      <div
        aria-hidden
        className="bottom-2 left-1/2 absolute bg-black/60 blur-md rounded-full w-40 h-6 -translate-x-1/2"
      />
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="Zarxal Mall atiri"
          loading="lazy"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="relative drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)] mx-auto p-6 w-full h-full object-contain"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div className="bottom-3 left-1/2 absolute flex gap-1.5 -translate-x-1/2">
          {images.map((src, i) => (
            <span
              key={src}
              className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-5 bg-gold' : 'w-1.5 bg-gold-dim'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero({ onScrollToCatalog, images }) {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef(null);
  const [enableParallax, setEnableParallax] = useState(false);

  const rotY = useMotionValue(0);
  const rotX = useMotionValue(0);
  const springY = useSpring(rotY, { stiffness: 60, damping: 18 });
  const springX = useSpring(rotX, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setEnableParallax(mq.matches && !prefersReducedMotion);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [prefersReducedMotion]);

  const handleMouseMove = (e) => {
    if (!enableParallax || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.set(px * 18);
    rotX.set(py * -14);
  };

  const handleMouseLeave = () => {
    rotY.set(0);
    rotX.set(0);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center bg-obsidian min-h-[92vh] overflow-hidden"
    >
      {/* ambient background */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(85% 65% at 78% 45%, rgba(183,150,91,0.16) 0%, transparent 60%), linear-gradient(180deg, #0A0A0A 0%, #101010 55%, #0A0A0A 100%)',
        }}
      />
      <div className="z-10 relative items-center gap-10 grid grid-cols-1 lg:grid-cols-2 mx-auto px-6 lg:px-16 w-full max-w-7xl">
        {/* Left — copy */}
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-[11px] text-gold tracking-[0.25em]"
          >
            ZARXAL MALL
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-ivory text-4xl sm:text-5xl lg:text-6xl leading-[1.02]"
          >
            Nafosingizni ifoda eting
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 max-w-md text-bone text-base leading-relaxed"
          >
            Har bir lahza uchun o'ziga xos va nafis iforlar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 mt-9"
          >
            <button
              onClick={onScrollToCatalog}
              className="bg-gold hover:bg-gold/90 px-7 py-3 rounded-full text-obsidian text-sm tracking-wide transition-colors"
            >
              Parfyumlarni ko'rish
            </button>
            <button className="hover:opacity-70 pb-1 border-gold-dim border-b text-gold text-sm tracking-wide transition-opacity">
              Brendlarni ko'rish
            </button>
          </motion.div>
        </div>

        {/* Right — floating 3D bottle / showcase */}
        <div className="relative flex justify-center items-center h-[460px] sm:h-[560px]" style={{ perspective: 1000 }}>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(45% 55% at 50% 45%, rgba(183,150,91,0.28) 0%, transparent 70%)',
              filter: 'blur(6px)',
            }}
          />
          <FloatingParticles />

          <motion.div
            style={{
              rotateY: springY,
              rotateX: springX,
              transformStyle: 'preserve-3d',
            }}
            animate={prefersReducedMotion ? {} : { y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <HeroShowcase images={images} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust bar: stats + payment methods (no delivery) ---------- */
function TrustBar() {
  return (
    <section className="border-line border-y">
      <div className="gap-8 grid grid-cols-2 lg:grid-cols-4 mx-auto px-6 lg:px-16 py-10 max-w-7xl">
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="font-display text-gold text-2xl sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-smoke text-xs">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mx-auto px-6 lg:px-16 pb-8 max-w-7xl">
        <span className="text-smoke text-xs tracking-wide">To'lov usullari:</span>
        {PAYMENT_METHODS.map((m) => (
          <span
            key={m}
            className="flex items-center gap-1.5 px-4 py-1.5 border border-line rounded-full text-bone text-xs"
          >
            <IoCheckmarkCircle className="text-gold" size={14} />
            {m}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- Brand intro (editorial) ---------- */
function BrandIntro() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [6, -6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);

  return (
    <section ref={ref} className="mx-auto px-6 lg:px-16 py-24 max-w-7xl">
      <div className="items-center gap-14 grid grid-cols-1 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-[11px] text-gold tracking-[0.25em]">ZARXAL MALL</p>
          <h2 className="max-w-md font-display text-ivory text-3xl sm:text-4xl leading-tight">
            Hashamatli iforlar olami
          </h2>
          <p className="mt-5 max-w-md text-bone text-sm sm:text-base leading-relaxed">
            Biz dunyoning eng nafis parfyumeriya uylarini bir joyga jamladik — har biri o'z
            hikoyasi, o'z shaxsiyati bilan. Zarxal Mall'da siz nafaqat atir, balki his-tuyg'u
            va xotira sotib olasiz.
          </p>
        </motion.div>

        <motion.div
          style={{ rotate, scale, transformStyle: 'preserve-3d' }}
          className="flex justify-center items-center bg-[#111] py-14 border border-line rounded-2xl min-h-[320px]"
        >
          <PerfumeBottle size={0.85} />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Badge helper for product cards ---------- */
function getBadge(p, index) {
  if (p.discount) return { text: `-${p.discount}%`, color: 'bg-red-500/90' };
  if (p.isNew) return { text: 'Yangi', color: 'bg-gold' };
  if (index < 2) return { text: 'Bestseller', color: 'bg-gold' };
  return null;
}

/* ---------- Featured perfumes, 4-col responsive grid ---------- */
function FeaturedPerfumes({ perfumes, isLoading, isError, onRetry }) {
  return (
    <section id="katalog" className="mx-auto px-6 lg:px-16 py-6 max-w-7xl">
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-end gap-3 mb-10">
        <div>
          <p className="mb-2 text-[11px] text-gold tracking-[0.25em]">KOLLEKSIYA</p>
          <h2 className="font-display text-ivory text-3xl">Tanlangan atirlar</h2>
        </div>
        <button className="pb-0.5 border-gold-dim border-b w-fit text-gold text-sm">
          Barchasini ko'rish
        </button>
      </div>

      {isLoading ? (
        <div className="gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <PerfumeGridSkeleton count={8} />
        </div>
      ) : isError ? (
        <div className="py-20 text-center">
          <p className="text-bone text-sm">Ma'lumotlarni yuklashda xatolik yuz berdi.</p>
          <button
            onClick={onRetry}
            className="bg-gold hover:bg-gold/90 mt-5 px-6 py-2.5 rounded-full text-obsidian text-sm transition-colors"
          >
            Qayta urinish
          </button>
        </div>
      ) : perfumes.length === 0 ? (
        <div className="py-20 text-center">
          <div className="flex justify-center items-center mx-auto mb-4 border border-line rounded-full w-12 h-12">
            <span className="bg-gold-dim rounded-full w-1.5 h-1.5" />
          </div>
          <p className="text-bone text-sm">Hozircha atirlar mavjud emas.</p>
        </div>
      ) : (
        <div className="gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {perfumes.map((p, i) => {
            const badge = getBadge(p, i);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.05 }}
                whileHover={{ y: -6 }}
                className="relative bg-[#111] border border-line hover:border-gold-dim rounded-xl overflow-hidden transition-colors duration-300"
              >
                {badge && (
                  <span
                    className={`absolute top-3 left-3 z-10 ${badge.color} text-obsidian text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full`}
                  >
                    {badge.text}
                  </span>
                )}
                <PerfumeCard perfume={p} index={i} />
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* ---------- Testimonials (social proof) ---------- */
function Testimonials() {
  return (
    <section className="mx-auto px-6 lg:px-16 py-20 max-w-7xl">
      <p className="mb-2 text-[11px] text-gold text-center tracking-[0.25em]">MIJOZLAR FIKRI</p>
      <h2 className="mb-12 font-display text-ivory text-3xl text-center">Bizga ishonishadi</h2>
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-[#111] p-6 border border-line rounded-xl"
          >
            <div className="flex gap-1 mb-3 text-gold">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <span key={idx}>★</span>
              ))}
            </div>
            <p className="text-bone text-sm leading-relaxed">{t.text}</p>
            <p className="mt-4 text-smoke text-xs">{t.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Why Zarxal Mall ---------- */
function WhyUs() {
  return (
    <section className="mx-auto px-6 lg:px-16 py-20 max-w-7xl">
      <h2 className="mb-12 font-display text-ivory text-3xl text-center">Nega Zarxal Mall?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-line border-t border-b sm:divide-x divide-y sm:divide-y-0 divide-line">
        {WHY_US.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="px-6 py-8 sm:py-2 text-center">
            <Icon className="mx-auto mb-4 w-7 h-7 text-gold" />
            <p className="font-display text-ivory text-base">{title}</p>
            <p className="mt-2 text-smoke text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCta({ onScrollToCatalog }) {
  return (
    <section className="relative flex justify-center items-center bg-obsidian py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 70% at 50% 100%, rgba(183,150,91,0.18) 0%, transparent 65%), linear-gradient(180deg, #060606 0%, #0A0A0A 100%)',
        }}
      />
      <div className="absolute inset-0 flex justify-center items-end opacity-30 pb-0" aria-hidden>
        <PerfumeBottle size={0.9} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="z-10 relative px-6 text-center"
      >
        <h2 className="font-display text-ivory text-3xl sm:text-4xl">Yangi iforingizni toping.</h2>
        <p className="mx-auto mt-4 max-w-sm text-bone text-sm sm:text-base">
          Zarxal Mall bilan o'zingizga mos iforni kashf eting.
        </p>
        <p className="mt-3 text-gold text-xs tracking-wide">
          ✓ 100% original &nbsp;·&nbsp; ✓ Xavfsiz to'lov &nbsp;·&nbsp; ✓ Har kuni yangi mahsulotlar
        </p>
        <button
          onClick={onScrollToCatalog}
          className="bg-gold hover:bg-gold/90 mt-8 px-8 py-3 rounded-full text-obsidian text-sm tracking-wide transition-colors"
        >
          Atirlarni ko'rish
        </button>
      </motion.div>
    </section>
  );
}

/* ---------- Home page ---------- */
export default function Home() {
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [brandId, setBrandId] = useState('');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['perfumes', { search, gender, brandId }],
    queryFn: () => fetchPerfumes({ search, gender, brandId, limit: 40 }),
  });

  const perfumes = data?.data || [];

  const heroImages = [...new Set(perfumes.map((p) => p.image).filter(Boolean))].slice(0, 6);

  const scrollToCatalog = () => {
    document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-obsidian min-h-screen">
      <Header search={search} onSearchChange={setSearch} />

      <Hero onScrollToCatalog={scrollToCatalog} images={heroImages} />
      <TrustBar />
      <BrandIntro />

      <BrandsScroll activeBrandId={brandId} onSelectBrand={setBrandId} />
      <CategoryScroll active={gender} onChange={setGender} />

      <FeaturedPerfumes
        perfumes={perfumes}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
      />

      <Testimonials />
      <WhyUs />
      <FinalCta onScrollToCatalog={scrollToCatalog} />

      <Footer />
    </div>
  );
}