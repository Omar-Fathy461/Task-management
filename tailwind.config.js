/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(132deg, rgba(10, 10, 10, 1) 0%, rgba(34, 36, 40, 0.119) 100%)',
      },
      backdropBlur: {
        '10': '10px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}