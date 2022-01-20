import { HeroAnimateProvider } from '@contexts/heroAnimate'
import '@styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <HeroAnimateProvider>
            <Component {...pageProps} />
        </HeroAnimateProvider>
    )
}

export default MyApp
