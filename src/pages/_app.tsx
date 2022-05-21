import '@styles/globals.css'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        // <ThemeProvider attribute="class">
        <Component {...pageProps} />
        // </ThemeProvider>
    )
}
