/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Lily invitation palette (sampled from the printed card)
        cream: '#f8f8ef',   // ivory paper
        ink: '#3b2f2a',     // deep brown text
        olive: '#5f6f31',   // buttons + small green text (AA contrast on ivory)
        leaf: '#6b7d3a',    // large script names, decorative greens
        gold: '#c99a2e',    // frame / ornaments (decorative only, not small text)
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        display: ['"Cormorant Garamond"', 'serif'],
        label: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
}
