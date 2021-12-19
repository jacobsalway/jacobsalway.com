import React from 'react'
import { ProjectProps } from '../../types'
import styles from '../../styles/Projects.module.sass'

const Project: React.FC<ProjectProps> = ({ name, links, description }) => {
    return (
        <div className='p-6 rounded-md shadow-md border'>
            <span className='text-lg font-bold'>{name}</span>
            <ul className={`flex list-none ${styles.projectLinks}`}>
                {links.map(({ name, link }) => <li className='font-semibold'><a href={link} target='_blank'>{name}</a></li>)}
            </ul>
            <p className='mt-4'>{description}</p>
        </div>
    )
}

export default Project