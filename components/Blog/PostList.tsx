import React from 'react';
import { BlogProps } from '../../types';
import PostPreview from './PostPreview';
import styles from '../../styles/Blog.module.sass'

const PostList: React.FC<BlogProps> = ({ posts }) => {
    if (posts == null || (posts instanceof Array && posts.length === 0)) {
        return <span>No blog content yet.</span>;
    } else {
        return (
            <div className={styles.postPreviewList}>
                {posts.map(PostPreview)}
            </div>
        )
    }
}

export default PostList;