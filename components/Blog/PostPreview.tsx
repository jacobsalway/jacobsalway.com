import Link from 'next/link'
import React from 'react'
import { PostProps } from '../../types'
import { formatDate } from './utils'

const PostPreview: React.FC<PostProps> = ({ title, id, date }) => {
    return (
        <div className='pb-0.5 mb-4 border-b w-full flex justify-between' key={id}>
            <h1 className='text-xl font-medium'><Link href={`/blog/${id}`}>{title}</Link></h1>
            <div className='text-gray-500 border-gray-300'>
                {formatDate(date)}
            </div>
        </div>
    )
}

export default PostPreview;