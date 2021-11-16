module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'domain-green': '#0ea800'
      },
      screens: {
        'xs': '390px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
