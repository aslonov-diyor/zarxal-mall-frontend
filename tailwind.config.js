/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A08',
        charcoal: '#17160F',
        ivory: '#F6F3EA',
        bone: '#C9C4B4',
        smoke: '#8B8878',
        gold: '#B7965B',
        'gold-dim': '#8A7647',
        line: '#2A2818',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      boxShadow: {
        goldline: '0 1px 0 0 rgba(183,150,91,0.35)',
      },
      keyframes: {
        revealLine: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        revealLine: 'revealLine 1.1s cubic-bezier(0.65,0,0.35,1) forwards',
        fadeUp: 'fadeUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
