import Container from '@components/Container'
import GroupedPostView from '@components/GroupedPostsView'
import { getPosts, groupPostsByYear } from '@lib/posts'
import { GroupedPosts, Post } from '@types'
import type { GetStaticProps, NextPage } from 'next'

type Props = { posts: GroupedPosts<Post>[] }

const Blog: NextPage<Props> = ({ posts }) => {
    return (
        <Container title="Blog">
            <h1 className="mb-8 text-4xl font-bold">Blog</h1>
            <div className="flex flex-col space-y-10">
                {posts.map(GroupedPostView)}
            </div>
        </Container>
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
