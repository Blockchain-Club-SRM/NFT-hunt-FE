/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        orbitron : ["Orbitron", "sans-serif"]
      },
      backgroundImage:{
        'stars':"url(../public/stars.jpg)",
        'blue':"url(../public/blue.png)"
      }
    },
  },
  plugins: [],
}
