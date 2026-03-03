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
        primary: {
          DEFAULT: "#1d2846",
          dark: "#151d33",
          light: "#2a3a5c",
        },
        secondary: {
          DEFAULT: "#949492",
          dark: "#7a7a78",
          light: "#aeaeac",
        },
        accent: {
          DEFAULT: "#d6d6d5",
          dark: "#bfbfbe",
          light: "#e8e8e7",
        },
        // Background colors
        "light-bg": "#f3f4f5",
        "lighter-bg": "#ffffff",
        // Text colors
        "text-dark": "#1d2846",
        "text-gray": "#949492",
        danger: "#1d2846",
        // White for cards and backgrounds
        white: {
          DEFAULT: "#ffffff",
          70: "rgba(255, 255, 255, 0.7)",
          90: "rgba(255, 255, 255, 0.9)",
          95: "rgba(255, 255, 255, 0.95)",
        },
        // Gray scale matching the color palette
        gray: {
          50: "#f3f4f5",
          100: "#e8e8e7",
          200: "#d6d6d5",
          300: "#bfbfbe",
          400: "#a8a8a6",
          500: "#949492",
          600: "#7a7a78",
          700: "#5f5f5e",
          800: "#454544",
          900: "#1d2846",
        },
      },
    },
  },
  plugins: [],
};
