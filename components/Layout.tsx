import Head from 'next/head'
import React from 'react'
import Nav from './Nav'

export type LayoutProps = {
    children: React.ReactNode,
    title?: string
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <div className='app'>
            <Head>
                <title>{title ? `${title} | Jacob Salway` : 'Jacob Salway'}</title>
            </Head>
            <div className='flex flex-col h-screen'>
                <Nav />
                <div className='flex-grow'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
