/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'background-color':'#212B1E',
        'primary-font-color':'#FF8800',
        'button-primary-color':'7DEB6E',
      },
      
      
    },
  },
  plugins: [],

  theme: {
    extend: {
      colors: {
        smoke: {
          light: 'rgba(0, 0, 0, 0.5)',  // Change the opacity as needed
        },
      },
    },
  },
}

