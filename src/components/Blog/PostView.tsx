import { Post } from '@types'
import Link from 'next/link'
import React from 'react'
import { formatDate } from './utils'

const PostView: React.FC<Post> = ({ title, id, date }) => {
    return (
        <div key={id}>
            <h1 className="text-lg md:text-xl">
                <Link href={`/blog/${id}`}>{title}</Link>
                <span className="text-grey-500 ml-3 text-sm whitespace-nowrap text-gray-500">
                    {formatDate(date, false)}
                </span>
            </h1>
        </div>
    )
}

export default PostView
