const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    colors: {
      gray: colors.coolGray,
      red : colors.rose,
      blue: colors.lightBlue,
      pink: colors.fuchsia,
      white: "#FFFFFF",
      pop: "#f85959",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        150: "37.5rem",
        128: "32rem",
        144: "36rem",
        65 : "16.25rem",
        59 : "14.975rem",
        100 : "25rem",
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
