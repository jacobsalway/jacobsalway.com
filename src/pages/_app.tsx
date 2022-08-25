import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '@styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider attribute="class">
            <Component {...pageProps} />
        </ThemeProvider>
    )
}
