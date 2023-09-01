/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    colors: {
      'white': '#ffffff',
      'purple': '#6345D5'
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}