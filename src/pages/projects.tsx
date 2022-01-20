import Layout from '@components/Layout'
import ProjectView from '@components/Project/ProjectView'
import { getProjects } from '@lib/content'
import { Project } from '@types'
import { GetStaticProps, NextPage } from 'next'

type Props = { projects: Project[] }

const Projects: NextPage<Props> = ({ projects }) => {
    return (
        <Layout title="Projects" footer={true}>
            <div className="max-w-screen-md mx-auto">
                <h1 className="text-3xl font-bold pb-8">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map(ProjectView)}
                </div>
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps<Props> = () => {
    const projects = getProjects()
    return {
        props: { projects },
    }
}

export default Projects
