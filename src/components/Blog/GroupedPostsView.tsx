import { GroupedPosts, Post } from '@types'
import React from 'react'
import PostView from './PostView'

const GroupedPostsview: React.FC<GroupedPosts<Post>> = ({ group, posts }) => {
    if (!posts || (posts instanceof Array && posts.length === 0)) {
        return <span>No content.</span>
    }

    return (
        <div className="pb-8">
            <h2 className="text-2xl font-semibold pb-2 mb-4 border-b">
                {group}
            </h2>
            {posts.map(PostView)}
        </div>
    )
}

export default GroupedPostsview
