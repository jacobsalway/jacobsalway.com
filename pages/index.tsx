import type { NextPage } from 'next';
import { useContext } from 'react';
import { FadeState } from '../components/FadeIn';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import { hero, terminal } from '../content';
import HeroAnimateContext from '../contexts/heroAnimate';

const Home: NextPage = () => {
    const [heroAnimated, setHeroAnimated] = useContext(HeroAnimateContext)
    const shouldHeroAnimate = heroAnimated ? FadeState.NONE : FadeState.ANIMATE

    return (
        <Layout>
            <Hero heroText={hero.heroText} terminal={terminal} animate={shouldHeroAnimate} onComplete={() => setHeroAnimated(true)} />
        </Layout>
    )
}

export default Home
