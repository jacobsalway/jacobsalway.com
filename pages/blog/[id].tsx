import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Post from '../../components/Blog/Post'
import Layout from '../../components/Layout'
import styles from '../../styles/Blog.module.sass'
import { posts } from '../../content'

const Blog: NextPage = () => {
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

export default Blog
