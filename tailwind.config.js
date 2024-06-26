/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      dark: "#0A0908",
      midnight: "#110F0A",
      primary: "#DFBF7B",
      green: "#00A478",
      red: "#D41515",
      red_bg: "rgba(212, 21, 21, 0.14)",
      brightprimary: "#D8A353",
      darkprimary: "#685F4C",
      grey: "#A7A7A7",
    },
    extend: {},
  },
  plugins: [],
};
