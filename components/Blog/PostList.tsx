import React from 'react'
import { BlogProps } from '../../types'
import PostPreview from './PostPreview'
import { groupBy } from './utils'

const PostList: React.FC<BlogProps> = ({ posts }) => {
    if (posts == null || (posts instanceof Array && posts.length === 0)) {
        return <span>No content.</span>
    }

    const postsByYear = groupBy(posts, post => new Date(post.date).getFullYear())
    const postsByYearSorted = Array.from(postsByYear)
        .map(([year, posts]) => {
            const sortedPosts = posts.sort((a, b) => Date.parse(b.date).valueOf() - Date.parse(a.date).valueOf())
            return ({ year, posts: sortedPosts })
        })

    return (
        <>
            {postsByYearSorted.map(({ year, posts }, index) => {
                return <div className='pb-8' key={index}>
                    <h2 className='text-2xl font-semibold pb-2 mb-4 border-b'>{year}</h2>
                    {posts.map(PostPreview)}
                </div>
            })}
        </>
    )
}

export default PostList