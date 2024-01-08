/** @type {import('tailwindcss').Config} */

// tailwind.config.js
const { nextui } = require("@nextui-org/react");

export default {
  content: [
  "./index.html",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}

