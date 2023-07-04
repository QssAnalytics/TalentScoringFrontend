const { transform } = require("typescript");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        inter: "Inter",
        manrope: "Manrope",
      },
      colors: {
        qss: {
          primary: "#103557",
          secondary: "#038477",
          alternative: "#025C60",
          background: "#FBFBFB",
          input: "#F2F6F6",
          inputText: "#444444",
          border: "#F4F4F4",
          "base-100": "#CACACA",
          "base-200": "#D9D9D9",
          "base-300": "#ADADAD",
          "base-400": "#E1EEED",
        },
      },

      animation: {
        heart: "heart 4s ease-in-out infinite",
        "fade-in": "fade-in 0.2s ease-in",
      },
      keyframes: {
        heart: {
          "0%,100%": { transform: "translate(-1%,-2%)" },
          "50%": { transform: "translate(0)" },
        },

        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
