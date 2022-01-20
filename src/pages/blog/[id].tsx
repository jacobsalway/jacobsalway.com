import FullPostView from '@components/Blog/FullPostView'
import Layout from '@components/Layout'
import { getFullPost, getPostIds } from '@lib/posts'
import styles from '@styles/Blog.module.sass'
import { FullPost } from '@types'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

type Params = { id: string }
type Props = { post: FullPost }

const BlogPost: NextPage<Props> = ({ post }) => {
    return (
        <Layout title={post.title} footer={true}>
            <div className={`${styles.postContainer} mx-auto`}>
                <FullPostView {...post} />
            </div>
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
