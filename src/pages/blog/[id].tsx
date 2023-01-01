import Container from '@components/Container'
import CodeFormatter from '@components/markdown/CodeFormatter'
import HeaderRenderer from '@components/markdown/HeaderRenderer'
import PostFooter from '@components/PostFooter'
import PostMetaView from '@components/PostMetaView'
import { getAdjacentPosts, getFullPost, getPostIds } from '@lib/posts'
import { calculateReadTime } from '@lib/utils'
import styles from '@styles/Blog.module.sass'
import { FullPost, Post } from '@types'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type Params = { id: string }
type Props = { post: FullPost; prevPost: Post | null; nextPost: Post | null }

const BlogPost: NextPage<Props> = ({ post, prevPost, nextPost }) => {
    const { id, title, date, content } = post
    const { data } = useSWR<{ views: number }>(`/api/post-views/${id}`, fetcher)

    return (
        <Container
            title={post.title}
            customFooter={
                <PostFooter prevPost={prevPost} nextPost={nextPost} />
            }
        >
            <div className="mb-8 font-bold">
                <Link href="/blog">
                    <a>Back to blog</a>
                </Link>
            </div>
            <h1 className="mb-4 text-4xl font-bold">{title}</h1>
            <div className="mb-8">
                <PostMetaView
                    date={date}
                    readTime={calculateReadTime(content)}
                    views={data?.views}
                />
            </div>
            <ReactMarkdown
                className={`leading-relaxed ${styles.postContent}`}
                components={{
                    code: CodeFormatter,
                    h1: HeaderRenderer,
                    h2: HeaderRenderer,
                    h3: HeaderRenderer,
                }}
            >
                {content}
            </ReactMarkdown>
        </Container>
    )
}

export const getStaticProps: GetStaticProps<Props, Params> = ({ params }) => {
    if (!params) return { notFound: true }

    const { id } = params
    const post = getFullPost(id)
    const { prevPost, nextPost } = getAdjacentPosts(post)

    return { props: { post, prevPost, nextPost } }
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
    const allPostIds = getPostIds()
    const paths = allPostIds.map((postId) => ({
        params: {
            id: postId,
        },
    }))

    return { paths, fallback: false }
}

export default BlogPost
