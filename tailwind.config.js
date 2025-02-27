/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    backgroundColors: {
      'primary': '#A1CEDC',
      'secondary': '#1D3D47',
    },
    extend: {},
  },
  plugins: [],
}

