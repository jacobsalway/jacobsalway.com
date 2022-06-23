import React from 'react'

type Props = {
    date: string
    readTime: number
}

const PostMetaView: React.FC<Props> = ({ date, readTime }) => {
    return (
        <>
            <div className="flex flex-col justify-between text-sm text-gray-400 dark:text-gray-300 xs:flex-row xs:items-center">
                <div className="flex flex-row items-center">
                    <div
                        className="mr-2 hidden h-8 w-8 rounded-full xs:block"
                        style={{
                            backgroundImage: 'url(/Jacob.jpg)',
                            backgroundSize: 'cover',
                        }}
                    />
                    <span>Jacob Salway / {date}</span>
                </div>
                <span>{readTime} min read</span>
            </div>
        </>
    )
}

export default PostMetaView
