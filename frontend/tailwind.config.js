/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "coinsense-blue": "#152DFF",
        "coinsense-blue-darker": "#0418bf",
      },
      colors: {
        "coinsense-blue": "#152DFF",
      },
    },
  },
  plugins: [],
};
