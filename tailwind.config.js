/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'caprasimo': ['Caprasimo', 'serif'],
        'hanuman': ['Hanuman', 'serif'],
        'bayon': ['Bayon', 'sans-serif'],
        'popin' : ['Poppins', 'sans-serif'],
        'protest': ["Protest Guerrilla",'sans-serif']
      },
    },
  },
  plugins: [],
}

