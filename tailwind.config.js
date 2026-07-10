/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#00B5AD",
          tealDark: "#008F88",
          green: "#7BC043",
          greenLight: "#E8F7F4",
          mint: "#F2FAF0",
          ink: "#333333",
        },
      },
      fontFamily: {
        sans: ["IRANSansX", "Tahoma", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
