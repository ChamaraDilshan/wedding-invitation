/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#2f3542',        // deep navy-charcoal panel
        inkdeep: '#232833',
        cream: '#f7f3ec',
        gold: '#c9a86a',
      },
      fontFamily: {
        script: ['"Alex Brush"', 'cursive'],
        display: ['"Cormorant Garamond"', 'serif'],
        label: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
}
