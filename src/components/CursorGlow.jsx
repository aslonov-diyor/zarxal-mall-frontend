import { useEffect, useRef } from 'react';

// Desktop-only magnetic cursor ring. Expands over anything interactive
// (a, button, [role="button"], input, select, textarea, [data-cursor-hover]).
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = ref.current;
    let raf;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (el) el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };

    const isInteractive = (target) =>
      target.closest('a, button, input, select, textarea, [role="button"], [data-cursor-hover]');

    const over = (e) => {
      if (isInteractive(e.target)) el?.classList.add('cursor-hover');
    };
    const out = (e) => {
      if (isInteractive(e.target)) el?.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow hidden sm:block" />;
}
