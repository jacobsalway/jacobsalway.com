import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import pfp from '../../img/Jacob.jpg'
import styles from '../../styles/Blog.module.sass'
import { PostProps } from '../../types'
import CodeFormatter from './CodeFormatter'
import { formatDate, readTime } from './utils'

const PostTag: React.FC<{tag: string}> = ({ tag }) => {
    return (
        <a href={`/blog/tags/${tag}`} className='py-1 px-2 sm:py-1.5 border shadow-sm rounded'>{`#${tag}`}</a>
    )
}

const Post: React.FC<PostProps> = ({ title, date, content, tags }) => {
    return (
        <div className={`${styles.post} mx-auto`}>
            <div className='font-bold'><Link href='/blog'>Back to blog</Link></div>
            <div className='my-12 mx-auto'>
                <h1 className='text-3xl sm:text-4xl font-medium mb-3'>{title}</h1>
                <div className='pt-2 flex flex-col xs:flex-row xs:items-center text-gray-500 text-sm sm:text-base'>
                    <div className='hidden xs:block w-6 h-6 sm:w-12 sm:h-12 mr-1.5 sm:mr-3 rounded-full' style={{ backgroundImage: `url(${pfp.src})`, backgroundSize: 'cover' }}/>
                    <b>Jacob Salway</b>
                    <span className='hidden xs:block'>&nbsp;</span>
                    <div className='flex flex-row mt-0.5 xs:mt-0'>
                        <span className='hidden xs:block'>on</span>
                        <span className='hidden xs:block'>&nbsp;</span>
                        <span>{formatDate(date)}</span>
                        <span className='mx-1 xs:mx-1.5'>·</span>
                        <span>{readTime(content)} min read</span>
                    </div>
                </div>
                {tags && <div className='flex space-x-2 sm:space-x-3 items-center mt-3 sm:mt-5 font-mono text-xs sm:text-sm'>
                    {tags.map(tag => <PostTag tag={tag} />)}
                </div>}
            </div>
            <ReactMarkdown
                className={`leading-normal ${styles.postContent}`}
                components={{ code: CodeFormatter }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}

export default Post