// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-blue': '#01aff4',
        'dark-gray': '#5e676b',
        'light-blue': '#d3e5ed',
        'drak-text-heading': '#333333',
        'background-light-blue': '#f8f9fa',
      },fontFamily: {
        "h2-text-heading": "var(--h2-text-heading-font-family)",
        "h4-16px-sub-heading": "var(--h4-16px-sub-heading-font-family)",
        "medium-heading-blue": "var(--medium-heading-blue-font-family)",
        "paragraph-text": "var(--paragraph-text-font-family)",
        "small-heading-h6": "var(--small-heading-h6-font-family)",
        "sub-heading": "var(--sub-heading-font-family)",
      },
      boxShadow: {
        shadow: "var(--shadow)",
      },
      fontFamily: {
        'spline': ['"Spline Sans"', 'sans-serif'],
      },
      keyframes: {
        colorChange: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' },
        },
      },
      animation: {
        colorChange: 'colorChange 1s forwards',
      },
      
    },
  },
  plugins: [],
};
