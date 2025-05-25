/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'rainDrop': 'rainDrop 1s linear infinite',
        'snowfall': 'snowfall 6s linear infinite',
        'lightning': 'lightning 5s ease-in-out infinite',
        'fogMove': 'fogMove 20s ease-in-out infinite',
      },
      keyframes: {
        rainDrop: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        snowfall: {
          '0%': { transform: 'translate(0, 0)', opacity: '0.8' },
          '100%': { transform: 'translate(10px, 100vh)', opacity: '0' }
        },
        lightning: {
          '0%, 95%, 100%': { opacity: '0' },
          '96%, 99%': { opacity: '1' }
        },
        fogMove: {
          '0%': { transform: 'translateX(-10px)', opacity: '0.2' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateX(10px)', opacity: '0.2' }
        },
      },
    },
  },
  plugins: [],
};