/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    trailingSlash: true,
    rewrites: async () => {
        // proxy local api requests to mock server
        return [
            {
                source: '/api/:slug*',
                destination: `http://localhost:5000/api/:slug*`,
            },
        ]
    },
}
