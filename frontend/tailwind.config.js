/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brown': '#623A14',
        'light-brown': '#EECD74',
        'custom-gray' : '#1e1e1e',
        'footer-gray': '#434343',
      }
    },
    container: {
      padding: {
        md: "10rem",
        sm: "5rem",
        // xs: "2rem",
      }
    },
  },
  plugins: [],
}

