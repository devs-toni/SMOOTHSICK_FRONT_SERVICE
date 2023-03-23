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
        "80p": "80px",
        "350": "350px",
        "80": "80%"
      },
      minWidth: {
        "100": "100px",
        "150": "150px",
        "180": "180px",
        "400": "500px",
        "95": "95%"
      },
      maxWidth: {
        "80": "80%",
        "180": "180px"
      },
      maxHeight: {
        "80p": "80px",
        "270": "270px",
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
