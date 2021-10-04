import type { NextPage } from 'next'
import { useState, useContext } from 'react';
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import { hero, terminal } from '../content'
import { FadeState } from '../components/FadeIn';
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
