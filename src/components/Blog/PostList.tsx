import React from 'react';
import { BlogProps } from '../../types';
import PostPreview from './PostPreview';

const PostList: React.FC<BlogProps> = ({ posts }) => {
    if (posts == null || (posts instanceof Array && posts.length === 0)) {
        return <span>No blog content yet.</span>;
    } else {
        return (
            <div className='post-preview-list'>
                {posts.map(PostPreview)}
            </div>
        )
    }
}

export default PostList;