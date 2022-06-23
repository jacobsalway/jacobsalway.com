import Container from '@components/Container'
import ProjectView from '@components/ProjectView'
import { getProjects } from '@lib/content'
import { Project } from '@types'
import { GetStaticProps, NextPage } from 'next'

type Props = { projects: Project[] }

const Projects: NextPage<Props> = ({ projects }) => {
    return (
        <Container title="Projects">
            <h1 className="mb-8 text-4xl font-bold">Projects</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {projects.map(ProjectView)}
            </div>
        </Container>
    )
}

export const getStaticProps: GetStaticProps<Props> = () => {
    const projects = getProjects()
    return {
        props: { projects },
    }
}

export default Projects
