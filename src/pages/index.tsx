import Layout from '@components/Layout'
import Page from '@components/Page'
import { getHero } from '@lib/content'
import { Hero } from '@types'
import type { GetStaticProps, NextPage } from 'next'

type Props = { hero: Hero }

const Home: NextPage<Props> = ({ hero }) => {
    const { name, subtext } = hero

    return (
        <Layout>
            <Page heading="About">
                <div className="text-lg">
                    <p>Hi! My name is {name}.</p>
                    {subtext.map((p, i) => (
                        <p
                            className="mt-4"
                            key={i}
                            dangerouslySetInnerHTML={{ __html: p }}
                        />
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
