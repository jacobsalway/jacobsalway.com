import Link from 'next/link'
import React from 'react'

const NavLinks: React.FC<{ mobile: boolean }> = ({ mobile }) => {
    return mobile ? (
        <ul className="divide-y">
            <li>
                <Link href="/projects">
                    <a className="my-4 inline-block">Projects</a>
                </Link>
            </li>
            <li>
                <Link href="/blog">
                    <a className="my-4 inline-block">Blog</a>
                </Link>
            </li>
        </ul>
    ) : (
        <>
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Blog</Link>
        </>
    )
}

export default NavLinks
