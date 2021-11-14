import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import pfp from '../../img/Jacob.jpg'
import styles from '../../styles/Blog.module.sass'
import { PostProps } from '../../types'
import CodeFormatter from './CodeFormatter'
import { formatDate, readTime } from './utils'

const Post: React.FC<PostProps> = ({ title, date, content }) => {
    return (
        <div className={`${styles.post} mx-auto`}>
            <div className='font-bold'><Link href='/blog'>Back to blog</Link></div>
            <div className='my-12 mx-auto'>
                <h1 className='text-4xl font-medium mb-3'>{title}</h1>
                <div className='pt-2 flex items-center text-gray-500'>
                    <div className='w-12 h-12 mr-3 rounded-full' style={{ backgroundImage: `url(${pfp.src})`, backgroundSize: 'cover' }}/>
                    <span><b>Jacob Salway</b> on {formatDate(date)}</span>
                    <span className='mx-1.5'>·</span>
                    <span>{readTime(content)} min read</span>
                </div>
            </div>
            <ReactMarkdown
                className={`leading-normal ${styles.postContent}`}
                children={content}
                components={{ code: CodeFormatter }}
            />
        </div>
    )
}

export default Post;