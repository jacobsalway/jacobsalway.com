import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '@styles/Nav.module.sass'
import Link from 'next/link'
import React, { useState } from 'react'
import NavLinks from './NavLinks'

const Nav: React.FC = () => {
    const [navOpen, setNavOpen] = useState(false)
    const close = () => setNavOpen(false)
    const toggle = () => setNavOpen(!navOpen)

    return (
        <nav
            className={`${styles.nav} w-full flex items-center justify-between`}
        >
            <div className="font-mono font-bold" onClick={close}>
                <Link href="/">&lt;Jacob Salway /&gt;</Link>
            </div>
            <div className="flex">
                <div
                    className="hidden sm:flex align-items-center space-x-8"
                    onClick={close}
                >
                    <NavLinks mobile={false} />
                </div>
                <button
                    className="block sm:hidden text-black z-50"
                    onClick={toggle}
                >
                    <FontAwesomeIcon icon={navOpen ? faTimes : faBars} />
                </button>
            </div>
            <div
                className={
                    'absolute top-0 left-0 h-screen w-1/3 z-50' +
                    (navOpen ? ' block' : ' hidden')
                }
                onClick={close}
            />
            <aside
                className={
                    'fixed top-0 right-0 w-2/3 h-screen shadow-md z-30 bg-white transition-transform' +
                    (navOpen
                        ? ' block transform translate-x-0'
                        : ' hidden transform translate-x-[100vw]')
                }
            >
                <div className="flex flex-col p-6" onClick={close}>
                    <NavLinks mobile={true} />
                </div>
            </aside>
        </nav>
    )
}

export default Nav
