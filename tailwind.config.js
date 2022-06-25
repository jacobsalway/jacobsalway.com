const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './next.config.js',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                highlight: '#2779F6',
                gray: {
                    0: '#fff',
                    100: '#fafafa',
                    200: '#eaeaea',
                    250: '#bbbbbb',
                    300: '#999999',
                    400: '#888888',
                    500: '#666666',
                    600: '#444444',
                    700: '#333333',
                    800: '#222222',
                    900: '#111111',
                },
            },
            screens: {
                xs: '420px',
            },
            fontFamily: {
                sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
