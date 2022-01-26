import { GroupedPosts, Post } from '@types'
import React from 'react'
import PostView from './PostView'

const GroupedPostsview: React.FC<GroupedPosts<Post>> = ({ group, posts }) => {
    if (!posts || (posts instanceof Array && posts.length === 0)) {
        return <span>No content.</span>
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">{group}</h2>
            <div className="flex flex-col space-y-3">{posts.map(PostView)}</div>
        </div>
    )
}

export default GroupedPostsview
