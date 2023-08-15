/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "node_modules/flowbite-react/**/*.{js,jsx}"
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      gridTemplateColumns: {
        'cust-1': 'repeat(1,minmax(0,300px))',
        'cust-2': 'repeat(2,minmax(0,300px))',
        'cust-3': 'repeat(3,minmax(0,300px))',
        'cust-4': 'repeat(4,minmax(0,300px))',
      },
    },
    fontFamily: {
      'sans': ['Poppins'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
  ],
}

