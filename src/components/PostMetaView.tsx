import React from 'react'

type Props = {
    date: string
    readTime: number
    views?: number
}

const PostMetaView: React.FC<Props> = ({ date, readTime, views }) => {
    return (
        <>
            <div className="flex w-full flex-row items-center">
                <div
                    className="mr-2 h-10 w-10 rounded-full"
                    style={{
                        backgroundImage: 'url(/Jacob.jpg)',
                        backgroundSize: 'cover',
                    }}
                />
                <div className="flex w-full flex-col justify-between text-sm text-gray-400 dark:text-gray-300 sm:flex-row">
                    <div className="flex flex-row items-center">
                        <span>Jacob Salway / {date}</span>
                    </div>
                    <span>
                        {readTime} min read /{' '}
                        {views ? `${views.toLocaleString()} views` : '———'}
                    </span>
                </div>
            </div>
        </>
    )
}

export default PostMetaView
