module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
  
    extend: {
      colors: {
        gray : {
          default : "#c4c4c4",
          lightest : "#fafafa"
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
