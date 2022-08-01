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
      },
      keyframes: {
        sizeUpY: {
          '0%': { transform: 'opacity(0)' },
          '100%': { transform: 'opacity(1)' },
        },
      
      },
      animation: {
        'scale-y': 'sizeUpY .6s ease-in-out',
      }
    },
  },
  plugins: [],
}
