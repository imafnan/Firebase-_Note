/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors:{
        "brandColor":"D4F6FF",
        "secondColor":"#C6C6C6",
      }
    },
    fontFamily:{
      "poppins" : ["Poppins", "serif"]
    }
  },
  plugins: [],
}
