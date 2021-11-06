import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../styles/Nav.module.sass'

const NavLinks = () => {
    return <>
        <a className='flex flex-row items-center' href='https://github.com/jacobsalway' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faGithub} className='text-lg mr-1' /><span>Github</span></a>
        <a className='flex flex-row items-center mt-2 sm:mt-0' href='https://www.linkedin.com/in/jacobsalway/' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faLinkedin} className='text-lg mr-1' /><span>LinkedIn</span></a>
        <Link href='/blog'><a className='mt-2 sm:mt-0'>Blog</a></Link>
    </>;
}

const Nav: React.FC = () => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <header className='w-full bg-gray-200 z-30'>
            <nav className={`${styles.nav} max-w-screen-md mx-auto flex items-center justify-between py-3`}>
                <div onClick={() => setNavOpen(false)}>
                    <Link href='/'>jacobsalway.com</Link>
                </div>
                <div className='flex'>
                    <div className='hidden sm:flex align-items-center space-x-5' onClick={() => setNavOpen(false)}>
                        <NavLinks />
                    </div>
                    <button className='block sm:hidden text-black z-50' onClick={() => setNavOpen(!navOpen)}>
                        <FontAwesomeIcon icon={navOpen ? faTimes : faBars} />
                    </button>
                </div>
                <div className={'absolute top-0 left-0 invisible h-screen w-[300px] z-20' + (navOpen ? ' block': ' hidden')} onClick={() => setNavOpen(false)}/>
                <aside className={'fixed top-0 right-0 w-[75vw] h-screen z-30 bg-white transition-transform' + (navOpen ? ' block transform translate-x-0' : ' hidden transform translate-x-[100vw]')}>
                    <div className='flex flex-col px-10 py-10' onClick={() => setNavOpen(false)}>
                        <NavLinks />
                    </div>
                </aside>
            </nav>
        </header>
    );
}

export default Nav