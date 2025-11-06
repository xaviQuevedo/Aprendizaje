/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./public/**/*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#0ea5e9", secondary: "#22c55e" },
      fontFamily: { sans: ["ui-sans-serif", "system-ui"] },
    },
  },
  plugins: [],
};
