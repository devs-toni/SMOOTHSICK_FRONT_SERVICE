/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      minHeight: {
        "100": "350px",
      },
      minWidth: {
        "400": "500px"
      },
      maxWidth: {
        "80": "80%"
      },
      backgroundColor: {
        "chart": "#1a1e1f"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')

  ]
}
