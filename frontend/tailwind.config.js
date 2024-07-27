/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2d7864",
        secondary: "#ff981a",
        hitam: "#232323",
        "hijau-muda": "#d9edbf",
        "hijau-normal": "#90d26d",
      },
    },
  },
  plugins: [],
};
