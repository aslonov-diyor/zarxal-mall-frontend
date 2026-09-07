import { useEffect, useState, useRef } from 'react';

// Animates a number from 0 to `target` over `duration` ms once `target` is defined.
export function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  const startRef = useRef(null);
  const fromRef = useRef(0);

  useEffect(() => {
    if (target === undefined || target === null) return;
    fromRef.current = 0;
    startRef.current = null;
    let raf;

    const step = (ts) => {
      if (startRef.current === null) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(fromRef.current + (target - fromRef.current) * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}
