import Link from 'next/link'
import React from 'react'
import { PostProps } from '../../types'
import { formatDate, readTime } from './utils'

const PostPreview: React.FC<PostProps> = ({ title, id, date, content }) => {
    const splitContent = content.trim().split(/\s+/)
    const validStringIndex = splitContent.slice(50).findIndex(v => !/^.*[.,?!]$/.test(v)) + 50
    const previewContent = splitContent.slice(0, validStringIndex).join(' ')

    return (
        <div className='pb-12' key={id}>
            <h1 className='text-3xl mb-2 font-medium'><Link href={`/blog/${id}`}>{title}</Link></h1>
            <div className='mb-4 pb-4 text-gray-500 border-b border-gray-300'>
                <span>Posted on {formatDate(new Date(date))} <span className='mx-0.5'>·</span> {readTime(content)} min read</span>
            </div>
            <div className='leading-normal'><p>{previewContent}...</p></div>
            <div className='font-bold mt-4'><Link href={`/blog/${id}`}>Read more...</Link></div>
        </div>
    )
}

export default PostPreview;