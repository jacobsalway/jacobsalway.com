import Layout from '@components/Layout'
import Page from '@components/Page'
import { getHero } from '@lib/content'
import { Hero } from '@types'
import type { GetStaticProps, NextPage } from 'next'

type Props = { hero: Hero }

const Home: NextPage<Props> = ({ hero }) => {
    const { name, tagline, subtext } = hero

    return (
        <Layout>
            <Page>
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
            </Page>
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
