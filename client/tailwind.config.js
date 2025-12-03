/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4A90E2',
          DEFAULT: '#357ABD',
          dark: '#2A5F8E',
        },
        secondary: {
          light: '#738290',
          DEFAULT: '#5A6774',
          dark: '#48525D',
        },
        neutral: {
          light: '#F8F9FA',
          DEFAULT: '#E9ECEF',
          dark: '#DEE2E6',
        },
        text: {
          DEFAULT: '#212529',
          light: '#495057',
        },
      },
    },
  },
  plugins: [],
};