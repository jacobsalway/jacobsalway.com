import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Nav: FC = () => {
    return (
        <header>
            <nav>
                <div className='nav-left'>
                    <Link to='/'>jacobsalway.com</Link>
                </div>
                <div className='nav-right'>
                    <a href='https://github.com/jacobsalway' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faGithub} />Github</a>
                    <a href='https://www.linkedin.com/in/jacobsalway/' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faLinkedin} />LinkedIn</a>
                    <Link to='/blog'>Blog</Link>
                </div>
            </nav>
        </header>
    );
}

export default Nav;