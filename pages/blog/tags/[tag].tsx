import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import PostList from '../../../components/Blog/PostList'
import Layout from '../../../components/Layout'
import { getAllPosts } from '../../../lib/posts'
import { BlogProps } from '../../../types'

const PostListByTag: NextPage<BlogProps> = ({ posts }) => {
    const router = useRouter()
    const { tag } = router.query

    const postsByTag = posts?.filter(p => p.tags?.includes(tag as string))

    return (
        <Layout title={`#${tag}`} footer={true}>
            <div className='max-w-screen-md mx-auto'>
                <h1 className='text-3xl font-bold pb-8'>Posts tagged #{tag}</h1>
                <PostList posts={postsByTag} />
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

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getAllPosts()
    const tagsArray = posts
        .map(p => p.tags)
        .filter(e => Boolean(e) && e.length > 0) // filter no tags and empty tags
    const tagsSet = new Set(tagsArray.flat())

    const paths = Array.from(tagsSet).map(tag => ({
        params: { tag }
    }))

    return {
        paths,
        fallback: false
    }
}


export default PostListByTag