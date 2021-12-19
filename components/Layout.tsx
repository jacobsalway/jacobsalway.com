import Head from 'next/head'
import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

export type LayoutProps = {
    children: React.ReactNode,
    title?: string,
    footer?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, title, footer }) => {
    return (
        <div className={`app flex flex-col min-h-screen p-5 sm:p-10`}>
            <Head>
                <title>{title ? `${title} / Jacob Salway` : 'Jacob Salway'}</title>
            </Head>
            <Nav />
            <div className='flex-grow mt-20'>
                {children}
            </div>
            {footer && <Footer />}
        </div>
    )
}

export default Layout
