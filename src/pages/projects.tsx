import Layout from '@components/Layout'
import Page from '@components/Page'
import ProjectView from '@components/Project/ProjectView'
import { getProjects } from '@lib/content'
import { Project } from '@types'
import { GetStaticProps, NextPage } from 'next'

type Props = { projects: Project[] }

const Projects: NextPage<Props> = ({ projects }) => {
    return (
        <Layout title="Projects" footer={true}>
            <Page heading="Projects">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {projects.map(ProjectView)}
                </div>
            </Page>
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
