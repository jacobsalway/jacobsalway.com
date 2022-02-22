import styles from '@styles/Projects.module.sass'
import { Project } from '@types'
import React from 'react'

const ProjectView: React.FC<Project> = ({ name, links, description }) => {
    return (
        <div className="rounded-md border p-6 shadow-md">
            <span className="text-lg font-bold">{name}</span>
            <ul
                className={`mt-1 flex list-none whitespace-nowrap text-base ${styles.projectLinks}`}
            >
                {links.map(({ name, link }, key) => (
                    <li key={key}>
                        <a href={link} target="_blank" rel="noreferrer">
                            {name}
                        </a>
                    </li>
                ))}
            </ul>
            <p className="mt-4">{description}</p>
        </div>
    )
}

export default ProjectView
