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

            animation: {
                modalFadeIn: 'modal .4s ease-in-out',
                menuBox: 'menu .2s linear ',
            },

            keyframes: {
                modal: {
                    from: {
                        transform: 'translateY(-140px)',
                        opacity: '0',
                    },
                    to: {
                        transform: 'translateY(0)',
                        opacity: '1',
                    },
                },
                menu: {
                    from: {
                        transform: 'scale(0)',
                        opacity: '0',
                    },
                    to: {
                        transform: 'scale(1)',

                        opacity: '1',
                    },
                },
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar-hide'),
        require('@tailwindcss/line-clamp'),
        require('tailwindcss-textshadow'),
    ],
}
