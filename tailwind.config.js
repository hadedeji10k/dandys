/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        status: {
          danger: "#E80C33",
          warning: "#FBBC1B",
          success: "#34A853",
          successLight: "#D2EEDF",
          primary: "#4CD58D",
        },
        shades: {
          white: "#FFFFFF",
          black: "#000000",
          gray: "#666",
          lightGray: "#D9D9D9",
          secondary: "#903677",
          primary: "#8F3677",
          red: "#EA4336"
        },
      },
      animation: {
        "pulse-slow": "pulse 2s linear infinite",
        "spin-slow": "spin 3s linear infinite",
        fadeAndScaleIn: "fadeAndScaleIn .8s ease-in-out 1",
      },
      keyframes: {
        fadeAndScaleIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      fontFamily: {
        sans: ["Open Sans", "ubuntu", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}