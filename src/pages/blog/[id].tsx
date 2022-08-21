import CodeFormatter from '@components/CodeFormatter'
import Container from '@components/Container'
import PostFooter from '@components/PostFooter'
import PostMetaView from '@components/PostMetaView'
import { formatDate } from '@lib/dateutils'
import { getAdjacentPosts, getFullPost, getPostIds } from '@lib/posts'
import { calculateReadTime } from '@lib/utils'
import styles from '@styles/Blog.module.sass'
import { FullPost, Post } from '@types'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

type Params = { id: string }
type Props = { post: FullPost; prevPost: Post | null; nextPost: Post | null }

const BlogPost: NextPage<Props> = ({ post, prevPost, nextPost }) => {
    const { id, title, date, content } = post
    const [views, setViews] = useState<number>()

    useEffect(() => {
        fetch(`/api/post-views/${id}`)
            .then((response) => response.json())
            .then((data) => setViews(data['views']))
    }, [id])

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
                    date={formatDate(date)}
                    readTime={calculateReadTime(content)}
                    views={views}
                />
            </div>
            <ReactMarkdown
                className={`leading-relaxed ${styles.postContent}`}
                components={{ code: CodeFormatter }}
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
