import Container from '@components/Container'
import { faArrowRight, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getHero } from '@lib/content'
import { formatDate } from '@lib/dateutils'
import { getPosts, getPostViews, sortPostsByDate } from '@lib/posts'
import { Hero, Post } from '@types'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'

type Props = { hero: Hero; topPosts: Post[] }

const Home: NextPage<Props> = ({ hero, topPosts }) => {
    const { name, tagline, subtext } = hero

    return (
        <Container showFooter={false}>
            <h1 className="mb-2 text-4xl font-bold sm:text-5xl">{name}</h1>
            <h2
                className="text-lg sm:text-xl"
                dangerouslySetInnerHTML={{ __html: tagline }}
            />
            <div className="mt-4">
                {subtext.map((e, i) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: e }} />
                ))}
            </div>
            <h3 className="mt-16 text-2xl font-semibold">Recent posts</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {topPosts.map((p) => (
                    <Link key={p.id} href={`/blog/${p.id}`}>
                        <a className="flex flex-col justify-between rounded border p-4 no-underline shadow-md dark:border-gray-500">
                            <div className="text-lg font-semibold">
                                {p.title}
                            </div>
                            <div className="mt-6 text-sm text-gray-400">
                                <div>{formatDate(p.date)}</div>
                                <div className="mt-2 text-xs">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mr-1.5"
                                    />
                                    {p.views} views
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
            <Link href="/blog">
                <a className="mt-8 flex items-center no-underline">
                    Read all posts{' '}
                    <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                </a>
            </Link>
        </Container>
    )
}

export const getStaticProps: GetStaticProps<Props> = () => {
    const hero = getHero()
    const posts = getPosts()
    const topPosts = sortPostsByDate(posts).slice(0, 3)

    const postViews = getPostViews()
    topPosts.forEach((p) => (p.views = postViews.get(p.id)))

    return {
        props: { hero, topPosts },
    }
}

export default Home
