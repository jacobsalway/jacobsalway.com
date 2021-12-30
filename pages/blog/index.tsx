import type { GetStaticProps, NextPage } from 'next'
import PostList from '../../components/Blog/PostList'
import Layout from '../../components/Layout'
import { getAllPosts } from '../../lib/posts'
import { BlogProps } from '../../types'

const Blog: NextPage<BlogProps> = ({ posts }) => {
    return (
        <Layout title='Blog' footer={true}>
            <div className='max-w-screen-md mx-auto'>
                <h1 className='text-3xl font-bold pb-8'>Blog</h1>
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