import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['var(--font-allison)', 'cursive'],
        pinyon: ['var(--font-pinyon)', 'cursive'],
        quattrocento: ['var(--font-quattrocento)', 'serif'],
        'roboto-mono': ['var(--font-roboto-mono)', 'monospace'],
        cormorant: ['var(--font-cormorant)', 'serif'],
      },
      colors: {
        sand: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#e8e3d9',
          300: '#d9d0bf',
          400: '#c9bca3',
          500: '#b8a588',
          600: '#a18c6e',
          700: '#7d6b52',
          800: '#5a4d3a',
          900: '#3a3127',
        },
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
      },
    },
  },
  plugins: [],
}
export default config
