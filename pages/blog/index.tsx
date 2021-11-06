import type { GetStaticProps, NextPage } from 'next'
import PostList from '../../components/Blog/PostList'
import Layout from '../../components/Layout'
import { getAllPosts } from '../../lib/posts'
import { BlogProps } from '../../types'

const Blog: NextPage<BlogProps> = ({ posts }) => {
    return (
        <Layout title='Blog'>
            <div className='max-w-screen-md mx-auto pb-4 pt-12'>
                <PostList posts={posts} />
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

export default Blog