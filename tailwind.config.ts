import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kedar: {
          navy: '#0B2447',
          'navy-light': '#12325f',
          'navy-dark': '#061a33',
          gold: '#D4AF37',
          'gold-light': '#E8C96A',
          'gold-dark': '#B8942E',
          cream: '#FAF7F0',
          'cream-dark': '#F1EAD9',
          wheat: '#E8D5A3',
        },
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0B2447 0%, #12325f 50%, #061a33 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E8C96A 50%, #B8942E 100%)',
        'navy-radial': 'radial-gradient(circle at 30% 20%, #16386b 0%, #0B2447 45%, #061a33 100%)',
        'cream-radial': 'radial-gradient(circle at 50% 0%, #ffffff 0%, #FAF7F0 55%, #F1EAD9 100%)',
      },
      boxShadow: {
        card: '0 4px 24px rgba(11, 36, 71, 0.08)',
        lifted: '0 18px 50px -12px rgba(11, 36, 71, 0.22)',
        gold: '0 4px 20px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 10px 34px -6px rgba(212, 175, 55, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
