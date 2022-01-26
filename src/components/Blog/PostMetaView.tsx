import Link from 'next/link'
import React from 'react'

type Props = {
    date: string
    readTime: number
    tags: string[] | null
}

const PostMetaView: React.FC<Props> = ({ date, readTime, tags }) => {
    return (
        <>
            <div className="flex flex-col xs:flex-row xs:items-center text-gray-500">
                <div
                    className="hidden md:block w-12 h-12 mr-3 rounded-full"
                    style={{
                        backgroundImage: 'url(/Jacob.jpg)',
                        backgroundSize: 'cover',
                    }}
                />
                <b className="text-black">Jacob Salway</b>
                <span className="hidden xs:block">&nbsp;</span>
                <div className="flex flex-row mt-0.5 xs:mt-0">
                    <span className="hidden xs:block">on</span>
                    <span className="hidden xs:block">&nbsp;</span>
                    <span>{date}</span>
                    <span className="mx-1.5">·</span>
                    <span>{readTime} min read</span>
                </div>
            </div>
            {tags && (
                <div className="flex space-x-3 items-center mt-3 sm:mt-5 font-mono text-base">
                    {tags.map((tag) => Tag(tag))}
                </div>
            )}
        </>
    )
}

const Tag = (tag: string) => {
    return (
        <Link href={`/blog/tags/${tag}`}>
            <a className="link-box py-1 px-2 sm:py-1.5 border shadow-sm rounded hover:border-b-0.5 hover:border-domain-green">{`#${tag}`}</a>
        </Link>
    )
}

export default PostMetaView
