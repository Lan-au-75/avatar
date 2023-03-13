/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                mini: '396px',
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
            gridTemplateColumns: {
                autoPC: 'repeat(auto-fit, minmax(180px, 250px))',
                autoTablet: 'repeat(auto-fit, minmax(180px, 230px))',
                autoMobile: 'repeat(auto-fit, minmax(0, 200px))',
                autoMini: 'repeat(auto-fit, minmax(0, 180px))',
            },

            animation: {
                modalFadeIn: 'modal .4s ease-in-out',
                menuBox: 'menu .2s linear ',
                like: 'like .7s ease-in-out',
                toast: 'toast 1s ease, fadeout 2s ease-in-out 3s forwards',
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
                like: {
                    '0%, 100%': {
                        transform: 'rotate(0deg)',
                    },
                    '50%': {
                        transform: 'rotate(-30deg)',
                    },
                },
                toast: {
                    from: {
                        transform: 'translateX(100%)',
                        opacity: '0',
                    },
                    to: {
                        transform: 'translateX(0%)',
                        opacity: '1',
                    },
                },
                fadeout: {
                    to: {
                        opacity: '0',
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
