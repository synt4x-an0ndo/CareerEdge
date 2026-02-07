/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
      colors: {
        primary: "#F3BF5B",
        secondary: "#80A9C5",
        tertiary: "#294062",
        custom_black: "#02091C",
        navy: {
          dark: "#02091C",
          DEFAULT: "#051C43",
          light: "#294062",
        },
        gold: "#F3BF5B",
        olive: "#827659",
        skyblue: "#80A9C5",
        // Override default colors for dark theme
        "light-bg": "#02091C",
        "lighter-bg": "#051C43",
        "text-dark": "#ffffff",
        "text-gray": "#80A9C5",
        danger: "#ff4757",
        // Override white to navy for bg-white classes
        white: {
          DEFAULT: "#051C43",
          70: "rgba(5, 28, 67, 0.7)",
          90: "rgba(5, 28, 67, 0.9)",
          95: "rgba(5, 28, 67, 0.95)",
        },
        // Override gray colors for dark theme
        gray: {
          50: "#294062",
          100: "#1a3554",
          200: "#294062",
          300: "#3a5478",
          400: "#4d6a8f",
          500: "#80A9C5",
          600: "#9dc0d6",
          700: "#b8d4e8",
          800: "#d4e8f5",
          900: "#e8f4fa",
        },
      },
    },
  },
  plugins: [],
};
