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
            className={`${styles.nav} flex w-full items-center justify-between text-lg`}
        >
            <div className="font-mono font-bold" onClick={close}>
                <Link href="/">&lt;Jacob Salway /&gt;</Link>
            </div>
            <div className="flex">
                <div
                    className="align-items-center hidden space-x-8 sm:flex"
                    onClick={close}
                >
                    <NavLinks mobile={false} />
                </div>
                <button
                    className="z-50 block text-black sm:hidden"
                    onClick={toggle}
                >
                    <FontAwesomeIcon icon={navOpen ? faTimes : faBars} />
                </button>
            </div>
            <div
                className={
                    'absolute top-0 left-0 z-50 h-screen w-1/3' +
                    (navOpen ? ' block' : ' hidden')
                }
                onClick={close}
            />
            <aside
                className={
                    'fixed top-0 right-0 z-30 h-screen w-2/3 bg-white shadow-md transition-transform' +
                    (navOpen
                        ? ' block translate-x-0 transform'
                        : ' hidden translate-x-[100vw] transform')
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
