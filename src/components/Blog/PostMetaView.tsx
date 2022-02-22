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
            <div className="flex flex-col text-gray-500 xs:flex-row xs:items-center">
                <div
                    className="mr-3 hidden h-12 w-12 rounded-full md:block"
                    style={{
                        backgroundImage: 'url(/Jacob.jpg)',
                        backgroundSize: 'cover',
                    }}
                />
                <b className="text-black">Jacob Salway</b>
                <span className="hidden xs:block">&nbsp;</span>
                <div className="mt-0.5 flex flex-row xs:mt-0">
                    <span className="hidden xs:block">on</span>
                    <span className="hidden xs:block">&nbsp;</span>
                    <span>{date}</span>
                    <span className="mx-1.5">·</span>
                    <span>{readTime} min read</span>
                </div>
            </div>
            {tags && (
                <div className="mt-3 flex items-center space-x-3 font-mono text-base sm:mt-5">
                    {tags.map((tag) => Tag(tag))}
                </div>
            )}
        </>
    )
}

const Tag = (tag: string) => {
    return (
        <Link href={`/blog/tags/${tag}`}>
            <a className="link-box hover:border-b-0.5 rounded border py-1 px-2 shadow-sm hover:border-domain-green sm:py-1.5">{`#${tag}`}</a>
        </Link>
    )
}

export default PostMetaView
