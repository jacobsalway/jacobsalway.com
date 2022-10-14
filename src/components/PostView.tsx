import { formatDate } from '@lib/utils'
import { Post } from '@types'
import Link from 'next/link'
import React from 'react'

const PostView: React.FC<Post> = ({ title, id, date }) => {
    return (
        <div key={id}>
            <Link href={`/blog/${id}`}>
                <a className="group flex items-baseline justify-between text-lg no-underline md:text-xl">
                    <h1 className="underline">{title}</h1>
                    <span className="ml-3 whitespace-nowrap text-sm text-gray-400 group-hover:text-blue-500">
                        {formatDate(date, false)}
                    </span>
                </a>
            </Link>
        </div>
    )
}

export default PostView
