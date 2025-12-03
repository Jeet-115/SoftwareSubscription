/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFDAB9',
          DEFAULT: '#FFA500',
          dark: '#FF8C00',
        },
        secondary: {
          light: '#FFC0CB',
          DEFAULT: '#FF69B4',
          dark: '#FF1493',
        },
        accent: {
          light: '#FFA07A',
          DEFAULT: '#FF0000',
          dark: '#B22222',
        },
      },
    },
  },
  plugins: [],
};