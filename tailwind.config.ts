import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          base: '#0A0A0B',
          surface: '#111113',
          elevated: '#1A1A1F',
          overlay: 'rgba(0, 0, 0, 0.8)',
        },
        text: {
          primary: '#F5F5F7',
          secondary: '#A1A1AA',
          muted: '#71717A',
          accent: '#818CF8',
        },
        border: {
          DEFAULT: '#1F1F23',
          hover: '#2E2E35',
          active: '#3E3E47',
        },
        accent: {
          DEFAULT: '#818CF8',
          hover: '#6366F1',
          glow: 'rgba(129, 140, 248, 0.15)',
        },
        status: {
          live: '#34D399',
          dev: '#FBBF24',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      fontSize: {
        'display': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-mobile': ['36px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'heading-1': ['48px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '500' }],
        'heading-1-mobile': ['28px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '500' }],
        'heading-2': ['36px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' }],
        'heading-2-mobile': ['24px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' }],
        'heading-3': ['24px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'heading-3-mobile': ['20px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body-lg': ['20px', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'body-lg-mobile': ['18px', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],
        'caption-mobile': ['13px', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],
        'micro': ['12px', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
        'micro-mobile': ['11px', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
        'post-title': ['40px', { lineHeight: '1.2', fontWeight: '600' }],
        'post-title-mobile': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        'post-body': ['18px', { lineHeight: '1.75', fontWeight: '400' }],
        'post-body-mobile': ['16px', { lineHeight: '1.75', fontWeight: '400' }],
        'post-h2': ['28px', { lineHeight: '1.3', fontWeight: '500' }],
        'post-h2-mobile': ['22px', { lineHeight: '1.3', fontWeight: '500' }],
        'post-h3': ['22px', { lineHeight: '1.4', fontWeight: '500' }],
        'post-h3-mobile': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
        '40': '10rem',
      },
      maxWidth: {
        'page': '1200px',
        'text': '720px',
        'model': '960px',
        'about': '640px',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'badge': '6px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'cta-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(129, 140, 248, 0.15)' },
          '50%': { boxShadow: '0 0 0 8px transparent' },
        },
        'live-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'cta-pulse': 'cta-pulse 3s ease-in-out infinite',
        'live-pulse': 'live-pulse 2s ease-in-out infinite',
      },
      backdropBlur: {
        'nav': '12px',
      },
    },
  },
  plugins: [],
}

export default config
