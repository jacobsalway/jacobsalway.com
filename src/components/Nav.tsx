import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../sass/Nav.sass';

const NavLinks = () => {
    return <>
        <a className='nav-link' href='https://github.com/jacobsalway' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faGithub} />Github</a>
        <a className='nav-link' href='https://www.linkedin.com/in/jacobsalway/' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faLinkedin} />LinkedIn</a>
        <Link className='nav-link' to='/blog'>Blog</Link>
    </>;
}

const Nav: React.FC = () => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <header>
            <nav>
                <div className='nav-left' onClick={() => setNavOpen(false)}>
                    <Link to='/'>jacobsalway.com</Link>
                </div>
                <div className='nav-right'>
                    <div className='nav-right-links' onClick={() => setNavOpen(false)}>
                        <NavLinks />
                    </div>
                    <button className='mobile-nav-toggle' onClick={() => setNavOpen(!navOpen)}>
                        <FontAwesomeIcon icon={navOpen ? faTimes : faBars} />
                    </button>
                </div>
                <div className={'mobile-nav-close' + (navOpen ? ' show': '')} onClick={() => setNavOpen(false)}/>
                <aside className={'mobile-nav' + (navOpen ? ' show' : '')}>
                    <div className='mobile-nav-links'>
                        <NavLinks />
                    </div>
                </aside>
            </nav>
        </header>
    );
}

export default Nav;