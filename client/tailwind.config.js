/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.js',
    './src/**/*.jsx'
  ],
  theme: {
    extend: {
      height: {
        97: '28rem',
        98: '31rem',
        99: '38rem',
        // 100: '40rem',
        100: '90.3vh',
        101: '100vh',
        120: '55.3rem',
        130: '57.56rem',
        150: '60rem',
        170: '62.5rem'
      },
      width: {
        101: '100vw',
      },
      animation: {
        "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "slide-out-right": "slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
      },
      keyframes: {
        "slide-in-right": {
          "0%": {
              transform: "translateX(1000px)",
              opacity: "0"
          },
          to: {
              transform: "translateX(0)",
              opacity: "1"
          }
        },
        "slide-out-right": {
          "0%": {
              transform: "translateX(0)",
              opacity: "1"
          },
          to: {
              transform: "translateX(1000px)",
              opacity: "0"
          }
        },
      }
    },
    screens: {
      // sm: '640px',
      // md: '768px',
      // lg: '1024px',
      // xl: '1280px',
      'short': { 'raw': '(min-height: 500px)'},
      'mid': { 'raw': '(min-height: 900px)'},
      'tall': { 'raw': '(min-height: 1100px)' }
    },
  },
  plugins: [],
}
