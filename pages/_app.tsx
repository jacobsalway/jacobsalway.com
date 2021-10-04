import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { HeroAnimateProvider } from '../contexts/heroAnimate'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <HeroAnimateProvider>
            <Component {...pageProps} />
        </HeroAnimateProvider>
    )

}

export default MyApp
