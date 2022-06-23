import Container from '@components/Container'
import { getHero } from '@lib/content'
import { Hero } from '@types'
import type { GetStaticProps, NextPage } from 'next'

type Props = { hero: Hero }

const Home: NextPage<Props> = ({ hero }) => {
    const { name, tagline, subtext } = hero

    return (
        <Container showFooter={false}>
            <h1 className="mb-2 text-5xl font-bold">{name}</h1>
            <h2
                className="text-xl"
                dangerouslySetInnerHTML={{ __html: tagline }}
            />
            <div className="mt-4">
                {subtext.map((e, i) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: e }} />
                ))}
            </div>
        </Container>
    )
}

export const getStaticProps: GetStaticProps<Props> = () => {
    const hero = getHero()

    return {
        props: { hero },
    }
}

export default Home
