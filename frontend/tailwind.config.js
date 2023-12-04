/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    colors,
    extend: {
      colors: {
        "active": "#3F5CF4",
        "main": "#353B47",
        "secondary": "#A9B7D1",
      },
      fontSize: {
        "bigger" : "14rem"
      },
      letterSpacing: {
        widest: '.5em'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

