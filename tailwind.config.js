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
          primary: '#AC94F4',
          secondary: '#E8E0FF',
          dark: '#2c1810',
          accent: '#8B6FD9',
          light: '#F5F2FF'
        }
      },
      fontFamily: {
        elegant: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        script: ['Dancing Script', 'cursive']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundSize: {
        '200': '200% auto',
      },
      backgroundPosition: {
        '0': '0% center',
        '100': '100% center',
      },
    },
  },
  plugins: [],
}