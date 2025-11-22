/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './docs/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // PhishFort brand colors
        primary: {
          50: '#f0f3ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#99A7F0',
          400: '#6484EE',
          500: '#3A5AC4',
          600: '#2e48a0',
          700: '#243a7d',
          800: '#1a2c5a',
          900: '#101c3d',
        },
      },
      backgroundImage: {
        'gradient-phishfort': 'linear-gradient(to top right, #1a2c5a, #3A5AC4)',
      },
      animation: {
        'mask-pulse': 'maskPulse 8s ease-in-out infinite',
      },
      keyframes: {
        maskPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
