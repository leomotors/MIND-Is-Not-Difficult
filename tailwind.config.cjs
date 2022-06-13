// @ts-check

/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts,css}"],
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

module.exports = config;
