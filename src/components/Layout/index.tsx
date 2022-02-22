import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import Footer from './Footer'
import Nav from './Nav'

type Props = {
    title?: string
    footer?: boolean
}

const Layout: React.FC<PropsWithChildren<Props>> = ({
    children,
    title,
    footer,
}) => {
    return (
        <div className="app mx-auto flex min-h-screen max-w-screen-md flex-col p-6 text-lg">
            <Head>
                <title>
                    {title ? `${title} / Jacob Salway` : 'Jacob Salway'}
                </title>
            </Head>
            <Nav />
            <div className="mt-20 flex-grow">{children}</div>
            {footer && <Footer />}
        </div>
    )
}

export default Layout
