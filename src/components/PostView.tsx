import { formatDate } from '@lib/utils'
import { Post } from '@types'
import Link from 'next/link'
import React from 'react'

const PostView: React.FC<Post> = ({ title, id, date }) => {
    return (
        <div key={id}>
            <h1 className="text-lg md:text-xl">
                <Link href={`/blog/${id}`}>{title}</Link>
                <span className="ml-3 whitespace-nowrap text-sm text-gray-400">
                    {formatDate(date, false)}
                </span>
            </h1>
        </div>
    )
}

export default PostView
