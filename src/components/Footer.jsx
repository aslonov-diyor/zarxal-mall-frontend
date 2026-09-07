import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 px-4 pb-10 pt-8 border-t border-line text-center"
    >
      <p className="font-display text-lg tracking-[0.18em] text-ivory">
        ZARXAL <span className="text-gold">MALL</span>
      </p>
      <p className="text-xs text-smoke mt-3 max-w-xs mx-auto leading-relaxed">
        Did bilan tanlangan premium atirlar. Har bir flakon &mdash; o'ziga xos hikoya.
      </p>
      <div className="w-8 h-px bg-gold-dim/50 mx-auto mt-5" />
      <p className="text-[10px] text-smoke/60 mt-5 tracking-wide">
        &copy; {new Date().getFullYear()} Zarxal Mall
      </p>
    </motion.footer>
  );
}
