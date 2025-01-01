/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        circleButton: "0 4px 16px 1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
