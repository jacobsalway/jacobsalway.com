import styles from '@styles/Projects.module.sass'
import { Project } from '@types'
import React from 'react'

const ProjectView: React.FC<Project> = ({ name, links, description }) => {
    return (
        <div className="p-6 rounded-md shadow-md border">
            <span className="text-lg font-bold">{name}</span>
            <ul className={`flex list-none ${styles.projectLinks}`}>
                {links.map(({ name, link }, key) => (
                    <li className="font-semibold" key={key}>
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
