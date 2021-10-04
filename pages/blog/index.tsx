import type { NextPage } from 'next'
import Layout from '../../components/Layout'
import PostList from '../../components/Blog/PostList'
import styles from '../../styles/Blog.module.sass'
import { posts } from '../../content'

const Blog: NextPage = () => {
    return (
        <Layout title='Blog'>
            <div className={styles.blogContent}>
                <PostList posts={posts} />
            </div>
        </Layout>
    )
}

export default Blog
