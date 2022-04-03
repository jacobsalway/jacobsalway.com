const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './next.config.js',
    ],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                highlight: '#2779F6',
            },
            screens: {
                xs: '420px',
            },
            fontFamily: {
                sans: ['Roboto', ...defaultTheme.fontFamily.sans],
            },
            // fontFamily: {
            //     mono: ['Source Code Pro', ...defaultTheme.fontFamily.mono],
            // },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
