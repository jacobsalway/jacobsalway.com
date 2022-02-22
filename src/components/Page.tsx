import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

type Props = {
    topLink?: {
        name: string
        link: string
    }
    article?: boolean
    details?: React.ReactNode
    heading?: string
}

const Page: React.FC<PropsWithChildren<Props>> = ({
    topLink,
    heading,
    article,
    details,
    children,
}) => {
    const content = (
        <>
            {(heading || details) && (
                <header>
                    {topLink && (
                        <div className="mb-8 font-bold">
                            <Link href={topLink.link}>
                                <a>Back to {topLink.name}</a>
                            </Link>
                        </div>
                    )}
                    {heading && (
                        <h1 className="mb-8 text-4xl font-bold">{heading}</h1>
                    )}
                    {details && <div className="mb-8">{details}</div>}
                </header>
            )}
            {children}
        </>
    )
    return article ? <article>{content}</article> : content
}

export default Page
