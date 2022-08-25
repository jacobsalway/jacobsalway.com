import Container from '@components/Container'
import { faArrowRightLong, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getHero } from '@lib/content'
import { formatDate } from '@lib/dateutils'
import { Hero, Post } from '@types'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

const PostCard: React.FC<{ post?: Post }> = ({ post }) => {
    if (!post) {
        return (
            <div className="rounded border p-4 shadow-md">
                <div className="text-lg font-semibold">
                    <Skeleton count={3} />
                </div>
                <div className="mt-6 text-sm text-gray-400">
                    <Skeleton count={1.5} />
                </div>
            </div>
        )
    }
    return (
        <Link key={post.id} href={`/blog/${post.id}`}>
            <a className="group flex flex-col justify-between rounded border p-4 no-underline shadow-md dark:border-gray-500">
                <div className="text-lg font-semibold">{post.title}</div>
                <div className="mt-6 text-sm text-gray-400 group-hover:text-blue-500">
                    <div>{formatDate(post.date)}</div>
                    <div className="mt-2 text-xs">
                        <FontAwesomeIcon icon={faEye} className="mr-1.5" />
                        {post.views?.toLocaleString()} views
                    </div>
                </div>
            </a>
        </Link>
    )
}

type Props = { hero: Hero }

const Home: NextPage<Props> = ({ hero }) => {
    const { name, tagline, subtext } = hero
    const [topPosts, setTopPosts] = useState<Post[]>()

    useEffect(() => {
        fetch(`/api/top-posts/`)
            .then((response) => response.json())
            .then((data) => setTopPosts(data))
    }, [])

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
            <h3 className="mt-16 text-2xl font-semibold">Top posts</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {topPosts
                    ? topPosts.map((p) => <PostCard key={p.id} post={p} />)
                    : [1, 2, 3].map((id) => <PostCard key={id} />)}
            </div>
            <Link href="/blog">
                <a className="mt-8 flex items-center no-underline">
                    Read all posts{' '}
                    <FontAwesomeIcon icon={faArrowRightLong} className="ml-1" />
                </a>
            </Link>
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
