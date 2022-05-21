import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'

type NavLinkProps = {
    href: string
}

const NavLink: React.FC<PropsWithChildren<NavLinkProps>> = ({
    href,
    children,
}) => {
    const { asPath } = useRouter()
    const highlightFont =
        (href === '/' && asPath === href) ||
        (href !== '/' && asPath.startsWith(href))
            ? 'font-semibold'
            : 'font-normal'

    return (
        <Link href={href}>
            <a
                className={`${highlightFont} nav-link mr-1 rounded py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-600`}
            >
                {children}
            </a>
        </Link>
    )
}

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme()

    return (
        <button
            className="flex h-9 w-9 items-center justify-center rounded bg-gray-200 hover:ring-2 dark:bg-gray-600"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
        </button>
    )
}

const Nav: React.FC = () => {
    return (
        <nav className="flex items-center justify-between">
            <div>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/blog">Blog</NavLink>
            </div>
            {/* <ThemeToggle /> */}
        </nav>
    )
}

export default Nav
