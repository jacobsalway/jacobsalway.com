import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { ProjectProps } from '../types'

const projectsFile = path.join(process.cwd(), 'content', 'projects.yml')

export const getProjects = () => {
    const file = fs.readFileSync(projectsFile, 'utf-8')
    const projects = YAML.parse(file) as ProjectProps[]

    return projects
}