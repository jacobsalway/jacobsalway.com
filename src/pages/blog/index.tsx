import GroupedPostView from '@components/Blog/GroupedPostsView'
import Layout from '@components/Layout'
import Page from '@components/Page'
import { getPosts, groupPostsByYear } from '@lib/posts'
import { GroupedPosts, Post } from '@types'
import type { GetStaticProps, NextPage } from 'next'

type Props = { posts: GroupedPosts<Post>[] }

const Blog: NextPage<Props> = ({ posts }) => {
    return (
        <Layout title="Blog" footer={true}>
            <Page heading="Blog">
                <div className="flex flex-col space-y-10">
                    {posts.map(GroupedPostView)}
                </div>
            </Page>
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
