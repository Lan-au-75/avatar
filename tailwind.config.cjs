/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                mobile: '568px',
                pc: '1025px',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: '#ac372f',
                secondary: '#0b0809',
                base100: '#4d4f57',
                base200: '#313649',
            },
        },
    },
    plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/line-clamp')],
}
