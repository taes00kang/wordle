/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        base:{
          gray: {
            light:"#808384",
            dark: "#3A3A3C"
          },
        }
      }
    },
  },
  plugins: [],
}
