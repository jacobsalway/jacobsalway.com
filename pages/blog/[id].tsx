import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Post from '../../components/Blog/Post'
import Layout from '../../components/Layout'
import styles from '../../styles/Blog.module.sass'
import { posts } from '../../content'
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

export async function getStaticProps() {
    return { props: { posts: posts } }
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { id: 'first-blog-post' } }],
        fallback: false
    }
}

export default Blog
