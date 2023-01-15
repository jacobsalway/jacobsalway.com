import Container from '@components/Container'
import ProjectView from '@components/ProjectView'
import { NextPage } from 'next'
import { projects } from '../../content/projects'

const Projects: NextPage = () => {
    return (
        <Container title="Projects">
            <h1 className="mb-8 text-4xl font-bold">Projects</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {projects.map(ProjectView)}
            </div>
        </Container>
    )
}

export default Projects
