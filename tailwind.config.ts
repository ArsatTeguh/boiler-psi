import { heroui } from '@heroui/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // background: 'var(--background)',
        // foreground: 'var(--foreground)',
        primary: 'rgb(var(--primary))',
        secondary: 'rgb(var(--secondary))',
        // tertiary: 'var(--tertiary)',
        // light: 'var(--light)',
        // dark: 'var(--dark)',
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
          '2xl': '1400px',
          '3xl': '1540px',
        },
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Public Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      layout: {
        borderWidth: {
          small: '1px',
          medium: '1px',
          large: '2px',
        },
        radius: {
          small: '4px',
          medium: '5px',
          large: '6px',
        },
      },
      themes: {
        light: {
          colors: {
            background: '#F2F4F7',
          },
        },
        dark: {
          colors: {
            background: '#F2F4F7',
          },
        },
      },
    }),
  ],
}

export default config
