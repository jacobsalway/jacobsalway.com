import type { AppProps } from 'next/app'
import { HeroAnimateProvider } from '../contexts/heroAnimate'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <HeroAnimateProvider>
            <Component {...pageProps} />
        </HeroAnimateProvider>
    )

}

export default MyApp