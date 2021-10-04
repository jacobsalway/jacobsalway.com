import React from 'react'
import Nav from './Nav'
import Head from 'next/head'

type LayoutProps = {
    children: React.ReactNode,
    title?: string
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <div className='app'>
            <Head>
                <title>{title ? `Jacob Salway - ${title}` : 'Jacob Salway'}</title>
            </Head>
            <Nav />
            <div className='content'>
                {children}
            </div>
        </div>
    )
}

export default Layout
