import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer: React.FC = () => {
    return (
        <div className='w-full max-w-screen-md mx-auto mt-10 pt-6 sm:pt-10 border-t flex text-sm items-center justify-between'>
            Built by Jacob Salway
            <div className='flex mt-3 space-x-5 text-xl'>
                <a className='flex flex-row items-center' href='https://github.com/jacobsalway' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faGithub} /></a>
                <a className='flex flex-row items-center' href='https://www.linkedin.com/in/jacobsalway/' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faLinkedin} /></a>
            </div>
        </div>
    )
}

export default Footer
