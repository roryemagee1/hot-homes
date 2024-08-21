/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Allows access to these themes using font-heading and font-body with tailwind.
        heading: ["Aboreto", "cursive"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
