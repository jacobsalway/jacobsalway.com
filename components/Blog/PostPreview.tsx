import Link from 'next/link'
import React from 'react'
import { PostProps } from '../../types'
import styles from '../../styles/Blog.module.sass'
import { formatDate } from './utils'

const PostPreview: React.FC<PostProps> = ({ title, id, time, content }) => {
    const readTime = Math.ceil(content.map(x => x.trim()).join(' ').split(/\s+/).length / 225);

    return (
        <div className={styles.postPreview} key={id}>
            <h1><Link href={`/blog/${id}`}>{title}</Link></h1>
            <div className={styles.postMeta}><span>Posted on {formatDate(new Date(time))} - {readTime} mins</span></div>
            <div className={styles.postContent}><p>{content[0]}</p></div>
            <div className={styles.postReadMore}><Link href={`/blog/${id}`}>Read more...</Link></div>
        </div>
    );
};

export default PostPreview;