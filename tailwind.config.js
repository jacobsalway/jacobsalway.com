module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'domain-green': '#0ea800',
        'red': '#f96256',
        'yellow': '#fdbc3d',
        'green': '#33c948'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
