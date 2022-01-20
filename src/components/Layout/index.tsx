import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import Nav from './Nav'

type Props = {
    children: React.ReactNode
    title?: string
    footer?: boolean
}

const Layout: React.FC<Props> = ({ children, title, footer }) => {
    return (
        <div className={`app flex flex-col min-h-screen p-5 sm:p-10`}>
            <Head>
                <title>
                    {title ? `${title} / Jacob Salway` : 'Jacob Salway'}
                </title>
            </Head>
            <Nav />
            <div className="flex-grow mt-20">{children}</div>
            {footer && <Footer />}
        </div>
    )
}

export default Layout
