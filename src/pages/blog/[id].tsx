import CodeFormatter from '@components/Blog/CodeFormatter'
import PostMetaView from '@components/Blog/PostMetaView'
import Layout from '@components/Layout'
import Page from '@components/Page'
import { getFullPost, getPostIds } from '@lib/posts'
import styles from '@styles/Blog.module.sass'
import { FullPost } from '@types'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import ReactMarkdown from 'react-markdown'

export const formatDate = (date: Date | string, full = true): string => {
    date = typeof date === 'string' ? new Date(date) : date

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const day = date.getDate()
    const month = full
        ? months[date.getMonth()]
        : months[date.getMonth()].slice(0, 3)
    const year = date.getFullYear().toString()

    return `${month} ${day}, ${year}`
}

export const calculateReadTime = (content: string): number => {
    return Math.ceil(content.trim().split(/\s+/).length / 225)
}

type Params = { id: string }
type Props = { post: FullPost }

const BlogPost: NextPage<Props> = ({ post }) => {
    const { title, date, tags, content } = post

    return (
        <Layout title={post.title} footer={true}>
            <Page
                topLink={{ name: 'blog', link: '/blog' }}
                article={true}
                heading={title}
                details={
                    <PostMetaView
                        date={formatDate(date)}
                        readTime={calculateReadTime(content)}
                        tags={tags}
                    />
                }
            >
                <ReactMarkdown
                    className={`leading-normal ${styles.postContent}`}
                    components={{ code: CodeFormatter }}
                >
                    {content}
                </ReactMarkdown>
            </Page>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps<Props, Params> = ({ params }) => {
    if (!params) return { notFound: true }

    const { id } = params
    const post = getFullPost(id)

    return { props: { post } }
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
