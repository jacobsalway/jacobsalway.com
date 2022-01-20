import HeroView from '@components/Hero/HeroView'
import Layout from '@components/Layout'
import HeroAnimateContext from '@contexts/heroAnimate'
import { getHero } from '@lib/content'
import { FadeState, Hero } from '@types'
import type { GetStaticProps, NextPage } from 'next'
import { useContext } from 'react'

type Props = { hero: Hero }

const Home: NextPage<Props> = ({ hero }) => {
    const [heroAnimated, setHeroAnimated] = useContext(HeroAnimateContext)
    const shouldHeroAnimate = heroAnimated ? FadeState.NONE : FadeState.ANIMATE

    const { name, intro, subtext } = hero

    return (
        <Layout>
            <HeroView
                name={name}
                intro={intro}
                subtext={subtext}
                animate={shouldHeroAnimate}
                onComplete={() => setHeroAnimated(true)}
            />
        </Layout>
    )
}

export const getStaticProps: GetStaticProps<Props> = () => {
    const hero = getHero()

    return {
        props: { hero },
    }
}

export default Home
