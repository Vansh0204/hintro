import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B4EFF',
        'primary-light': '#EEE9FF',
        'primary-dark': '#5038CC',
        black: '#0F0F0F',
        gray: {
          50: '#F9F9F9',
          100: '#F3F3F3',
          200: '#E8E8E8',
          300: '#D1D1D1',
          400: '#A0A0A0',
          500: '#717171',
          600: '#4B4B4B',
          700: '#333333',
        },
        white: '#FFFFFF',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        border: '#E5E5E5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },
    },
  },
  plugins: [],
} satisfies Config
