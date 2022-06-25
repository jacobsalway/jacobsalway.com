import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Props = { href: string; text: string }

const NavLink: React.FC<Props> = ({ href, text }) => {
    const { asPath } = useRouter()
    const isActive =
        (href === '/' && asPath === href) ||
        (href !== '/' && asPath.startsWith(href))

    return (
        <Link href={href}>
            <a
                className={`${
                    isActive
                        ? 'font-semibold'
                        : 'font-normal text-gray-600 dark:text-gray-400'
                } mr-1 rounded py-2 px-3 no-underline hover:bg-gray-200 dark:hover:bg-gray-700`}
            >
                {text}
            </a>
        </Link>
    )
}

export default NavLink
