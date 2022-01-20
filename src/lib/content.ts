import { Hero, Project } from '@types'
import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

const projectsFile = path.join(process.cwd(), 'content', 'projects.yml')
const heroFile = path.join(process.cwd(), 'content', 'hero.yml')

export const getProjects = () => {
    const file = fs.readFileSync(projectsFile, 'utf-8')
    const projects = YAML.parse(file) as Project[]

    return projects
}

export const getHero = () => {
    const file = fs.readFileSync(heroFile, 'utf-8')
    const hero = YAML.parse(file) as Hero

    return hero
}
