/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7A1E2D',
          light: '#9A3E4D',
          dark: '#5A0E1D',
        },
        accent: {
          DEFAULT: '#C9A24D',
          light: '#D9B26D',
        },
        background: {
          DEFAULT: '#FAF9F7',
          alt: '#F5F3F0',
        },
        brand: {
          text: '#1C1C1C',
          light: '#666666',
          muted: '#999999',
        },
        border: '#E5E2DE',
        success: '#2E7D32',
        warning: '#ED6C02',
        error: '#D32F2F',
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#128C7E',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        site: '1280px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(28,28,28,0.05)',
        md: '0 4px 12px rgba(28,28,28,0.08)',
        lg: '0 8px 24px rgba(28,28,28,0.12)',
        xl: '0 16px 48px rgba(28,28,28,0.16)',
        accent: '0 4px 20px rgba(201,162,77,0.25)',
        primary: '0 4px 20px rgba(122,30,45,0.25)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(0.8)' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
        },
        modalFade: {
          from: { opacity: '0', transform: 'translateY(20px) scale(0.96)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeZoom: {
          from: { opacity: '0.5', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1.05)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'scroll-pulse': 'scrollPulse 2s ease-in-out infinite',
        'modal-fade': 'modalFade 0.25s ease',
        'logo-zoom': 'fadeZoom 1.2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
