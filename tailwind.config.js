/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0f0f0f",
          light: "#f8f5f0",
          gold: "#d4af37",
          teal: "#006d5f",
          tealDark: "#004d44",
          greenLight: "#e0f2e9",
          muted: "#555555",
        },
      },
      fontFamily: {
        sans: ["IRANSansX", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};