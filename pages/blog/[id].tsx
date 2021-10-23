import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Post from '../../components/Blog/Post'
import Layout from '../../components/Layout'
import { getAllPostIds, getAllPosts } from '../../lib/posts'
import styles from '../../styles/Blog.module.sass'
import { BlogProps } from '../../types'

const Blog: NextPage<BlogProps> = ({ posts }) => {
    const router = useRouter()
    const { id } = router.query

    const post = posts?.find(p => p.id === id)

    return (
        <Layout title={post?.title}>
            <div className={styles.blogContent}>
                {post == null ? 'Post not found.' : <Post {...post} /> }
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getAllPosts()
    return {
        props: {
            posts
        }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    const allPostIds = getAllPostIds()
    const paths = allPostIds.map(postId => ({
        params: {
            id: postId
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export default Blog
