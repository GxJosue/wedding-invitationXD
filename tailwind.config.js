/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          primary: '#d4af37',
          secondary: '#f5e6d3',
          dark: '#2c1810',
          accent: '#a67c52'
        }
      },
      fontFamily: {
        elegant: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}