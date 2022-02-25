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
                'domain-green': '#0ea800',
            },
            screens: {
                xs: '420px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
