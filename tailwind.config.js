const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    './src/components/**/*.tsx',
    './src/pages/**/*.tsx',
  ],
  theme: {
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',
      'black': colors.black,
      'white': colors.white,
      'gray': colors.slate,
      'emerald': colors.emerald,
      'indigo': colors.indigo,
      'yellow': colors.yellow,
      'green': colors.emerald,
      'purple': colors.violet,
      'yellow': colors.amber,
      'pink': colors.fuchsia,
      'pr-purple': '#9055ff',
      'pr-ocean' : '#13e2da'
    },
    extend: {},
  },
  plugins: [],
}
