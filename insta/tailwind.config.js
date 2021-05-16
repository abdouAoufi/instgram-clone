const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    screen: {
      xsm: "400px",
      sm: "512px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      niceBlack: "#000000",
      black: colors.black,
      gray: colors.coolGray,
      red: colors.rose,
      blue: colors.blue,
      pink: colors.fuchsia,
      white: "#FFFFFF",
      pop: "#f85959",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        niceBlack: "#000000",
        black: colors.black,
        blue: colors.blue,
      },
      spacing: {
        150: "37.5rem",
        128: "32rem",
        144: "36rem",
        65: "16.25rem",
        59: "14.975rem",
        100: "25rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["focus-visible"],
      opacity: ["disabled"],
    },
  },
};
