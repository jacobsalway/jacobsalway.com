import Link from 'next/link'
import React from 'react'

type Props = {
    prevPost?: { title: string; id: string }
    nextPost?: { title: string; id: string }
}

const PostFooter: React.FC<Props> = ({ prevPost, nextPost }) => {
    return (
        <div className="flex flex-row justify-between">
            {prevPost && <Button title={prevPost.title} id={prevPost.id} />}
            {nextPost && <Button title={nextPost.title} id={nextPost.id} />}
        </div>
    )
}

const Button: React.FC<{ title: string; id: string }> = ({ title, id }) => {
    return (
        <Link href={`/blog/${id}`}>
            <a>
                <div>{title}</div>
            </a>
        </Link>
    )
}

export default PostFooter
