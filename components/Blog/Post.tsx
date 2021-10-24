import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import pfp from '../../img/Jacob.jpg';
import styles from '../../styles/Blog.module.sass';
import { PostProps } from '../../types';
import { formatDate, codeFormatter } from './utils';

const Post: React.FC<PostProps> = ({ title, date, content }) => {
    return (
        <div className={styles.post}>
            <div className={styles.postGoBack}><Link href='/blog'>Back to blog</Link></div>
            <div className={styles.postMeta}>
                <h1>{title}</h1>
                <div className={styles.postMetaLower}>
                    <div className={styles.circle} style={{ backgroundImage: `url(${pfp.src})`, backgroundSize: 'cover' }}/>
                    <span className={styles.postMetaAuthor}>Jacob Salway on {formatDate(new Date(date))}</span>
                </div>
            </div>
            <ReactMarkdown
                className={styles.postContent}
                children={content}
                components={{ code: codeFormatter }}
            />
        </div>
    )
}

export default Post;