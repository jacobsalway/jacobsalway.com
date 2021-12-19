import { NextPage, GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { ProjectsProps } from '../types'
import Project from '../components/Projects/Project'
import { getProjects } from '../lib/projects'


const Projects: NextPage<ProjectsProps> = ({ projects }) => {
    return (
        <Layout title='Projects' footer={true}>
            <div className='max-w-screen-md mx-auto'>
                <h1 className='text-3xl font-bold pb-8'>Projects</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {projects.map(Project)}
                </div>
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = () => {
    const projects = getProjects()
    return {
        props: { projects }
    }
}

export default Projects
