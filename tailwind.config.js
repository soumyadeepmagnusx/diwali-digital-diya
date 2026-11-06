/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        festive: {
          dark: '#070614',
          night: '#0c0a24',
          deep: '#140f38',
          royal: '#1f1347',
          maroon: '#4a0e17',
          gold: '#f59e0b',
          'gold-light': '#fbbf24',
          'gold-dark': '#b45309',
          amber: '#f59e0b',
          flame: '#ff4d00',
          kumkum: '#dc2626',
          haldi: '#eab308',
          rangoli: '#ec4899',
          peacock: '#0284c7',
        }
      },
      animation: {
        'flame-flicker': 'flame 1.2s ease-in-out infinite alternate',
        'diya-glow': 'glow 2.5s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        flame: {
          '0%': { transform: 'scale(1) rotate(-1deg)', filter: 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.8))' },
          '25%': { transform: 'scale(1.08, 0.94) rotate(1.5deg)', filter: 'drop-shadow(0 0 18px rgba(239, 68, 68, 0.9))' },
          '50%': { transform: 'scale(0.96, 1.04) rotate(-1.5deg)', filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.85))' },
          '75%': { transform: 'scale(1.04, 0.98) rotate(1deg)', filter: 'drop-shadow(0 0 22px rgba(251, 191, 36, 0.95))' },
          '100%': { transform: 'scale(1) rotate(0deg)', filter: 'drop-shadow(0 0 16px rgba(245, 158, 11, 0.8))' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px 2px rgba(245, 158, 11, 0.4)' },
          '100%': { boxShadow: '0 0 45px 12px rgba(245, 158, 11, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        }
      },
      fontFamily: {
        festive: ['"Cinzel Decorative"', 'serif'],
        sanskrit: ['"Rozha One"', 'serif'],
        display: ['"Cinzel"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
