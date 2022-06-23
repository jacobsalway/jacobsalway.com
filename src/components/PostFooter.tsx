import Link from 'next/link'
import React from 'react'

// Nulls rather than undefined because of serialisability
type Props = {
    prevPost: { title: string; id: string } | null
    nextPost: { title: string; id: string } | null
}

const PostFooter: React.FC<Props> = ({ prevPost, nextPost }) => {
    return (
        <div className="pt-10">
            <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="w-full sm:w-2/5">
                    {prevPost && (
                        <div>
                            <div className="mb-1 text-sm text-gray-400">
                                Previous
                            </div>
                            <Link href={`/blog/${prevPost.id}`}>
                                <a>{prevPost.title}</a>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="w-full sm:w-2/5 sm:text-right">
                    {nextPost && (
                        <div className={prevPost ? 'mt-4 sm:mt-0' : ''}>
                            <div className="mb-1 text-sm text-gray-400">
                                Next
                            </div>
                            <Link href={`/blog/${nextPost.id}`}>
                                <a>{nextPost.title}</a>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PostFooter
