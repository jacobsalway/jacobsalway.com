import Link from 'next/link'
import React from 'react'
import styles from '../../styles/Blog.module.sass'
import { PostProps } from '../../types'
import { formatDate } from './utils'

const PostPreview: React.FC<PostProps> = ({ title, id, date, content }) => {
    const splitContent = content.trim().split(/\s+/)
    const validStringIndex = splitContent.slice(50).findIndex(v => !/^.*[.,?!]$/.test(v)) + 50
    const previewContent = splitContent.slice(0, validStringIndex).join(' ')

    const readTime = Math.ceil(splitContent.length / 225)

    return (
        <div className={styles.postPreview} key={id}>
            <h1><Link href={`/blog/${id}`}>{title}</Link></h1>
            <div className={styles.postMeta}>
                <span>Posted on {formatDate(new Date(date))} <span className={styles.postMetaDivider}>·</span> {readTime} min read</span>
            </div>
            <div className={styles.postContent}><p>{previewContent}...</p></div>
            <div className={styles.postReadMore}><Link href={`/blog/${id}`}>Read more...</Link></div>
        </div>
    )
}

export default PostPreview;