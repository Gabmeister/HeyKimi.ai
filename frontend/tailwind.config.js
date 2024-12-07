/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        pulse: "pulse 1.5s infinite",
        float: "float 3s ease-in-out infinite",
        slowpulse: 'pulse 7s infinite',
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  variants: {
    scrollbar: ['rounded'], // Adds rounded scrollbar variant
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

