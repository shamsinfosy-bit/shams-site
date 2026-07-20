/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        shams: {
          50: '#fef9e7',
          100: '#fdf0c4',
          200: '#fbe49d',
          300: '#f8d36c',
          400: '#f5c248',
          500: '#c9a050',
          600: '#b8893a',
          700: '#8c662c',
          800: '#6b4d21',
          900: '#4a3516',
        },
      },
    },
  },
  plugins: [],
};
