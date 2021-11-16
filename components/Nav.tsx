import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../styles/Nav.module.sass'

const oldLinks = <>
    <a className='flex flex-row items-center' href='https://github.com/jacobsalway' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faGithub} className='text-lg mr-1' /><span>Github</span></a>
    <a className='flex flex-row items-center mt-2 sm:mt-0' href='https://www.linkedin.com/in/jacobsalway/' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faLinkedin} className='text-lg mr-1' /><span>LinkedIn</span></a>
</>

const NavLinks: React.FC<{ mobile: boolean }> = ({ mobile }) => {
    return (
        mobile ?
            <ul className='divide-y'>
                <li><Link href='/projects'><a className='my-4 inline-block'>Projects</a></Link></li>
                <li><Link href='/blog'><a className='my-4 inline-block'>Blog</a></Link></li>
            </ul>
        :
            <>
                <Link href='/projects'>Projects</Link>
                <Link href='/blog'>Blog</Link>
            </>
    )
}

const Nav: React.FC = () => {
    const [navOpen, setNavOpen] = useState(false)
    const close = () => setNavOpen(false)
    const toggle = () => setNavOpen(!navOpen)

    return (
        <header className='w-full font-semibold z-30'>
            <nav className={`${styles.nav} max-w-screen-2xl mx-auto flex items-center justify-between`}>
                <div className='font-mono' onClick={close}>
                    <Link href='/'>&lt;Jacob Salway /&gt;</Link>
                </div>
                <div className='flex'>
                    <div className='hidden sm:flex align-items-center space-x-8' onClick={close}>
                        <NavLinks mobile={false}/>
                    </div>
                    <button className='block sm:hidden text-black z-50' onClick={toggle}>
                        <FontAwesomeIcon icon={navOpen ? faTimes : faBars} />
                    </button>
                </div>
                <div className={'absolute top-0 left-0 h-screen w-1/3 z-50' + (navOpen ? ' block': ' hidden')} onClick={close}/>
                <aside className={'fixed top-0 right-0 w-2/3 h-screen shadow-md z-30 bg-white transition-transform' + (navOpen ? ' block transform translate-x-0' : ' hidden transform translate-x-[100vw]')}>
                    <div className='flex flex-col p-6' onClick={close}>
                        <NavLinks mobile={true}/>
                    </div>
                </aside>
            </nav>
        </header>
    );
}

export default Nav