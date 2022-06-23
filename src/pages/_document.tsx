import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Source+Code+Pro:wght@400;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body className="bg-gray-50 dark:bg-gray-800">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
