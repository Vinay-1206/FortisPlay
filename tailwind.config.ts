import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Core brand palette (derived from FortisPlay UI)
        primary: {
          50: '#EEF2FF',
          100: '#E0E8FF',
          200: '#C2D1FF',
          300: '#9AB0FF',
          400: '#6D8BFF',
          500: '#2563FF', // brand blue
          600: '#1E50DB',
          700: '#1A3FB3',
          800: '#16308C',
          900: '#0F172A', // deep navy text
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8FAFC', // light row background
          muted: '#F1F5F9', // borders / dividers
          page: '#F5F7FB', // page background
        },
        status: {
          live: '#16A34A', // betting in progress
          stopped: '#DC2626', // betting stopped
          warning: '#F59E0B',
        },
        ink: {
          900: '#0F172A',
          700: '#334155',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        elevated: '0 4px 16px -2px rgba(15, 23, 42, 0.08)',
        modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'auth-gradient':
          'radial-gradient(circle at top, #DDF4FF 0%, #F4FBFF 45%, #FFFFFF 100%)',
        'brand-gradient': 'linear-gradient(135deg, #2563FF 0%, #1A3FB3 100%)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-in-right': 'slide-in-right 0.25s ease-out',
        shimmer: 'shimmer 2s infinite linear',
      },
    },
  },
  plugins: [],
};

export default config;
