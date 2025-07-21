/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // important for React/Vite
  ],
  theme: {
    extend: {
      colors: {
        glow: "#0ff", // for neon glow
      },
      fontFamily: {
        cedarville: ['"Cedarville Cursive"', "cursive"],
        inter: ["Inter", "sans-serif"],
        dm: ['"DM Sans"', "sans-serif"],
        pixel: ['"Pixelify Sans"', "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
