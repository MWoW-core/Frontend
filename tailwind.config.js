/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    ripple: (theme) => ({
      colors: theme('colors'),

      textShadow: {
        default: '0 0 5px rgba(104, 182, 255, 0.5)'
      }
    }),

    extend: {
      colors: {
        brand: '#63c0f5',
        ice: 'rgba(104, 182, 255, 0.5)',
        'semi-75': 'rgba(0, 0, 0, 0.75)'
      }
    }
  },
  variants: {},
  plugins: [require('tailwindcss-ripple')()]
}
