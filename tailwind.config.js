/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
    "./app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        first: "#ECE073",
        second: "#48BEC6",
        third: "#2C2C2C",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  // variants: {
  //   extend: {
  //     opacity: ["disabled"],
  //   },
  // },
};
