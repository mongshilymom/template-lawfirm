/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        legend: {
          black: '#0A0A0A',
          gold: '#FFD700',
          platinum: '#E5E4E2',
          crimson: '#DC143C'
        }
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
        korean: ['var(--font-noto-sans-kr)', 'Noto Sans KR', 'sans-serif']
      }
    }
  },
  plugins: []
};