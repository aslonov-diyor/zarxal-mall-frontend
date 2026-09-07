import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
};

export default function PageTransition({ children }) {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={variants}>
      {children}
    </motion.div>
  );
}
