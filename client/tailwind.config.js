import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      ...defaultTheme.screens,
      xs: "475px",
    },
    extend: {},
  },
  plugins: [],
};
