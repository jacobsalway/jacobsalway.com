import GroupedPostView from '@components/Blog/GroupedPostsView'
import Layout from '@components/Layout'
import { getPosts, groupPostsByYear } from '@lib/posts'
import { GroupedPosts, Post } from '@types'
import type { GetStaticProps, NextPage } from 'next'

type Props = { posts: GroupedPosts<Post>[] }

const Blog: NextPage<Props> = ({ posts }) => {
    return (
        <Layout title="Blog" footer={true}>
            <div className="max-w-screen-md mx-auto">
                <h1 className="text-3xl font-bold pb-8">Blog</h1>
                {posts.map(GroupedPostView)}
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps<Props> = () => {
    const posts = getPosts()
    const sortedPosts = groupPostsByYear(posts, true)

    return {
        props: { posts: sortedPosts },
    }
}

export default Blog
