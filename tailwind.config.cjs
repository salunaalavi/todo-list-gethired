const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        colors: {
            'background': '#F4F4F4',
            'white': '#FFFFFF',
            'black': '#111111',
            'blue': '#16ABF8',
            'red': '#ED4C5C',
        },
        fontFamily: {
            sans: ['Poppins', 'sans-serif'],
        },
        fontWeight: {
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        extend: {
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        },
    },
    plugins: [
        plugin(({ addBase }) => {
            addBase({
                'h1': {
                    fontWeight: '700',
                    fontSize: '36px',
                    lineHeight: '54px',
                },
                'h2': {
                    fontSize: '24px',
                    lineHeight: '36px',
                },
                'h3': {
                    fontSize: '18px',
                    lineHeight: '27px',
                },
                'h4': {
                    fontWeight: '700',
                    fontSize: '12px',
                    lineHeight: '18px',
                },
                'p': {
                    fontWeight: '700',
                    fontSize: '16px',
                    lineHeight: '24px',
                },
            })
        }),
        function ({ addComponents }) {
            addComponents({
                '.container': {
                    maxWidth: '80%',
                    '@screen lg': {
                        maxWidth: '1000px',
                    }
                }
            })
        },
    ],
}
