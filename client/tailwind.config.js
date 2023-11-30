/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{ 
        "color-primary": "#E6E9EA",
        "color-secondary":"#4C5562",
        "color-tertiary": "#244873",
        "color-white": "#FFFFFF",
        "color-blue" : "#BEE9F8",
        "color-blue2": "#306E9C",
        "color-red": "#ce2d4f"

      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('../src/assets/LifeCity.svg')",
     
      }
    },
  },
  plugins: [],
}