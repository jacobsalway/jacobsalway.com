import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer: React.FC = () => {
    return (
        <div className="mt-10 flex w-full items-center justify-between border-t py-6 text-sm dark:border-gray-600 dark:text-gray-400">
            Built by Jacob Salway
            <div className="mt-3 flex space-x-5 text-xl">
                <a
                    className="flex flex-row items-center"
                    href="https://github.com/jacobsalway"
                    target="_blank"
                    rel="noreferrer"
                    style={{ borderBottom: 'none' }}
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                    className="flex flex-row items-center"
                    href="https://www.linkedin.com/in/jacobsalway/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ borderBottom: 'none' }}
                >
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </div>
        </div>
    )
}

export default Footer
