/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      roboto: ["roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#2d7864",
        secondary: "#ff981a",
        hitam: "#232323",
        coklat: "#AF4D04",
        "hijau-muda": "#d9edbf",
        "hijau-normal": "#90d26d",
      },
    },
  },
  plugins: [],
};
