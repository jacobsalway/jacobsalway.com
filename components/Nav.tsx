import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Nav.module.sass';

const NavLinks = () => {
    return <>
        <a className={styles.navLink} href='https://github.com/jacobsalway' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faGithub} />Github</a>
        <a className={styles.navLink} href='https://www.linkedin.com/in/jacobsalway/' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faLinkedin} />LinkedIn</a>
        <Link href='/blog'><a className='nav-link'>Blog</a></Link>
    </>;
}

const Nav: React.FC = () => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.navLeft} onClick={() => setNavOpen(false)}>
                    <Link href='/'>jacobsalway.com</Link>
                </div>
                <div className={styles.navRight}>
                    <div className={styles.navRightLinks} onClick={() => setNavOpen(false)}>
                        <NavLinks />
                    </div>
                    <button className={styles.mobileNavToggle} onClick={() => setNavOpen(!navOpen)}>
                        <FontAwesomeIcon icon={navOpen ? faTimes : faBars} />
                    </button>
                </div>
                <div className={styles.mobileNavClose + (navOpen ? ` ${styles.show}`: '')} onClick={() => setNavOpen(false)}/>
                <aside className={styles.mobileNav + (navOpen ? ` ${styles.show}` : '')}>
                    <div className={styles.mobileNavLinks} onClick={() => setNavOpen(false)}>
                        <NavLinks />
                    </div>
                </aside>
            </nav>
        </header>
    );
}

export default Nav