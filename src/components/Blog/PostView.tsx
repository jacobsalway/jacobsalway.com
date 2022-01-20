import { Post } from '@types'
import Link from 'next/link'
import React from 'react'
import { formatDate } from './utils'

const PostView: React.FC<Post> = ({ title, id, date }) => {
    return (
        <div
            className="pb-1 mb-2 w-full flex-col sm:flex-row flex justify-between"
            key={id}
        >
            <h1 className="text-lg md:text-xl font-medium">
                <Link href={`/blog/${id}`}>{title}</Link>
            </h1>
            <div className="text-gray-500 mt-1 sm:mt-0 border-gray-300 sm:w-56 flex items-center sm:justify-end">
                {formatDate(date)}
            </div>
        </div>
    )
}

export default PostView
