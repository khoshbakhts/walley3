/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0F172A',
          lighter: '#1E293B',
          light: '#334155',
        },
        gold: {
          light: '#FFD700',
          DEFAULT: '#FFA500',
          dark: '#FF8C00',
        },
        purple: {
          light: '#A78BFA',
          DEFAULT: '#8B5CF6',
          dark: '#6D28D9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};