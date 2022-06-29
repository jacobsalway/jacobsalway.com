import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import { PropsWithChildren, useEffect, useState } from 'react'
import Footer from './Footer'
import NavLink from './NavLink'

type Props = {
    title?: string
    showFooter?: boolean
    customFooter?: React.ReactNode
}

const Container: React.FC<PropsWithChildren<Props>> = ({
    title,
    showFooter = true,
    customFooter,
    children,
}) => {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    return (
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col">
            <Head>
                <title>
                    {title ? `${title} / Jacob Salway` : 'Jacob Salway'}
                </title>
            </Head>
            <nav className="mb-14 flex w-full items-center justify-between py-6 pl-3 pr-6">
                <div>
                    <NavLink href="/" text="Home" />
                    <NavLink href="/projects" text="Projects" />
                    <NavLink href="/blog" text="Blog" />
                </div>
                <button
                    className="flex h-9 w-9 items-center justify-center rounded bg-gray-200 hover:ring-2 dark:bg-gray-600"
                    onClick={() =>
                        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
                    }
                >
                    {mounted && (
                        <FontAwesomeIcon
                            icon={resolvedTheme === 'dark' ? faSun : faMoon}
                        />
                    )}
                </button>
            </nav>
            <div
                className={
                    'flex flex-grow flex-col px-6 ' +
                    (!showFooter ? 'pb-6' : '')
                }
            >
                <main className="w-full flex-grow">{children}</main>
                {showFooter && customFooter}
                {showFooter && <Footer />}
            </div>
        </div>
    )
}

export default Container
