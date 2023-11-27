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
        "color-tertiary": "#DC4D34",
        "color-gray": "#929DAC",
      }
    },
  },
  plugins: [],
}