/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1c1917',
        paper: '#ffffff',
        rule: '#e7e0d6',
        maroon: { DEFAULT: '#9b2335', deep: '#6e1b2b', tint: '#fbf2f4', soft: '#e9c9cf' },
        burgundy: {
          50: '#fbf2f4',
          100: '#f6e3e7',
          200: '#edc7ce',
          300: '#df9fa9',
          400: '#cb6f7f',
          500: '#b3485a',
          600: '#973042',
          700: '#7e2434',
          800: '#681b29',
          900: '#531420',
          950: '#340811',
        },
        ivory: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f4ece1',
          300: '#e8dbca',
          400: '#d7c4ad',
          500: '#ba9f83',
          600: '#9d8066',
          700: '#7e644e',
          800: '#634f3e',
          900: '#433428',
          950: '#231b14',
        },
        civic: {
          50: '#fbf9f6',
          100: '#f5f0ea',
          200: '#e6ded4',
          300: '#d2c5b5',
          400: '#9f8f7c',
          500: '#736453',
          600: '#584b3d',
          700: '#41372c',
          800: '#2c251e',
          900: '#1d1813',
          950: '#120f0c',
        },
        crimson: {
          50: '#fbf2f4',
          100: '#f6e3e7',
          500: '#b3485a',
          600: '#973042',
          700: '#7e2434',
          800: '#681b29',
          900: '#531420',
          950: '#340811',
        },
        sand: {
          50: '#faf6ee',
          100: '#f4ece1',
          200: '#e8dbca',
          800: '#433428',
          900: '#231b14',
        },
        gold: {
          50: '#faf7ed',
          100: '#f3ebd4',
          200: '#e6d5a7',
          300: '#d6bc77',
          400: '#c5a34e',
          500: '#ad8a39',
          600: '#8e6d2b',
          700: '#705324',
          800: '#584220',
          900: '#3e2e17',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Mukta"', '"Noto Sans Devanagari"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Mukta"', 'sans-serif'],
        nepali: ['"Mukta"', '"Noto Sans Devanagari"', 'sans-serif'],
        serif: ['"Lora"', '"Noto Serif Devanagari"', 'Georgia', 'serif'],
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
