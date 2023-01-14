import Container from '@components/Container'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {
    faArrowRightLong,
    faEnvelope,
    faEye,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDate } from '@lib/utils'
import { Post } from '@types'
import type { NextPage } from 'next'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const PostCard: React.FC<{ post?: Post }> = ({ post }) => {
    const { resolvedTheme } = useTheme()
    if (!post) {
        const colour = resolvedTheme === 'dark' ? '#585858' : undefined

        return (
            <div className="rounded border p-4 shadow-md dark:text-gray-600">
                <div className="text-lg font-semibold">
                    <Skeleton count={3} baseColor={colour} />
                </div>
                <div className="mt-6 text-sm">
                    <Skeleton count={1.5} baseColor={colour} />
                </div>
            </div>
        )
    }

    return (
        <Link key={post.id} href={`/blog/${post.id}`}>
            <a className="group flex flex-col justify-between rounded border p-4 no-underline shadow-md hover:border-blue-500 dark:border-gray-500 dark:hover:border-blue-500">
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

const Home: NextPage = () => {
    const { data: topPosts } = useSWR<Post[]>('/api/top-posts', fetcher)

    return (
        <Container showFooter={false}>
            <h1 className="mb-2 text-4xl font-bold sm:text-5xl">
                Jacob Salway
            </h1>
            <h2 className="text-lg sm:text-xl">
                Data Engineer at{' '}
                <a
                    href="https://simplemachines.com.au"
                    className="font-semibold"
                >
                    Simple Machines
                </a>
            </h2>
            <div className="mt-6">
                I&apos;m a data engineer based in Sydney, Australia. I mostly
                work with Python, SQL, AWS/Azure, Terraform and other
                data-related tooling, but I also do some web development on the
                side with Typescript and React.
            </div>
            <div className="mt-6 flex space-x-5 text-[24px]">
                <a
                    className="flex flex-row items-center"
                    href="https://github.com/jacobsalway"
                    target="_blank"
                    rel="noreferrer"
                    style={{ borderBottom: 'none' }}
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                    className="flex flex-row items-center"
                    href="https://www.linkedin.com/in/jacobsalway/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ borderBottom: 'none' }}
                >
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                    className="flex flex-row items-center"
                    href="mailto:jacob.salway@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{ borderBottom: 'none' }}
                >
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
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

export default Home
