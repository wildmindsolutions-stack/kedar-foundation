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
          wheat: '#E8D5A3',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0B2447 0%, #12325f 50%, #061a33 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E8C96A 50%, #B8942E 100%)',
      },
      boxShadow: {
        card: '0 4px 24px rgba(11, 36, 71, 0.08)',
        gold: '0 4px 20px rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
};
export default config;
