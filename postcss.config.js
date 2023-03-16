import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindConfig from './src/assets/styles/tailwind.config.cjs'

export default {
  plugins: [tailwind(tailwindConfig), autoprefixer],
}