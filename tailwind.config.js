/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primaryBlue: 'var(--color-primary-blue)',
        primaryBlueLight: 'var(--color-primary-blue-light)',
        primaryBlueSupLight: 'var(--color-primary-blue-sup-light)',
        darkBlue: 'var(--color-dark-blue)',
        darkGrayishBlue: 'var(--color-dark-grayish-blue)',
        veryDarkBlue: 'var(--color-very-dark-blue)',
        veryPaleBlue: 'var(--color-very-pale-blue)',
        veryLightGray: 'var(--color-very-light-gray)',
      },
    },
  },
  plugins: [],
};
