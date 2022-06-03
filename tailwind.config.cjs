module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",

  theme: {
    extend: {
      scale: {
        102.5: "1.025",
      },
    },
  },

  plugins: [require("tailwindcss-global-dark")],
};
