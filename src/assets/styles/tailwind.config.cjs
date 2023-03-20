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
      backgroundColor: {
        "chart": "#1a1e1f"
      },
      backgroundImage: {
        "home-pattern": "url('src/assets/imgs/try.png')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')

  ]
}
