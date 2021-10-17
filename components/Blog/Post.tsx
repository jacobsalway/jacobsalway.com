import React from 'react';
import Link from 'next/link'
import { PostProps } from '../../types';
import pfp from '../../img/Jacob.jpg';
import styles from '../../styles/Blog.module.sass'
import { formatDate, mapPostContent } from './utils'

const Post: React.FC<PostProps> = ({ title, id, time, content }) => {
    return (
        <div className={styles.post}>
            <div className={styles.postGoBack}><Link href='/blog'>Back to blog</Link></div>
            <div className={styles.postMeta}>
                <div className={styles.postMetaUpper}>
                    <span>{formatDate(new Date(time))}</span>
                </div>
                <h1>{title}</h1>
                <div className={styles.postMetaLower}>
                    <div className={styles.circle} style={{ backgroundImage: `url(${pfp.src})`, backgroundSize: 'cover' }}/>
                    <span>Jacob Salway</span>
                </div>
            </div>
            <div className={styles.postContent}>
                {content.map(mapPostContent)}
            </div>
        </div>
    )
}

export default Post;