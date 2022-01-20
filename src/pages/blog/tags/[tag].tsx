import GroupedPostView from '@components/Blog/GroupedPostsView'
import Layout from '@components/Layout'
import { getFullPosts, getPosts, getTags, groupPostsByYear } from '@lib/posts'
import { GroupedPosts, Post } from '@types'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

type Params = { tag: string }
type Props = { tag: string; posts: GroupedPosts<Post>[] }

const PostListByTag: NextPage<Props> = ({ tag, posts }) => {
    return (
        <Layout title={`#${tag}`} footer={true}>
            <div className="max-w-screen-md mx-auto">
                <h1 className="text-3xl font-bold pb-8">Posts tagged #{tag}</h1>
                {posts.map(GroupedPostView)}
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps<Props, Params> = ({ params }) => {
    if (!params) return { notFound: true }

    const { tag } = params
    const fullPosts = getFullPosts()
    const postIdsWithTag = fullPosts
        .filter((post) => post.tags?.includes(tag))
        .map((post) => post.id)
    const sortedPostsWithTag = groupPostsByYear(
        getPosts(...postIdsWithTag),
        true
    )

    return {
        props: {
            tag,
            posts: sortedPostsWithTag,
        },
    }
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
    const tags = getTags()
    const paths = tags.map((tag) => ({
        params: { tag },
    }))

    return {
        paths,
        fallback: false,
    }
}

export default PostListByTag
