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
        100: '40rem',
        120: '55.3rem',
        130: '57.56rem',
        150: '60rem',
        170: '62.5rem'
      },
    },
    // screens: {
    //   sm: '640px',
    //   md: '768px',
    //   lg: '1024px',
    //   xl: '1280px',
    // },
  },
  plugins: [],
}
