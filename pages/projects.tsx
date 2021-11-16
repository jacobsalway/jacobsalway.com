import { NextPage } from 'next'
import Layout from '../components/Layout'

const Projects: NextPage = () => {
    return (
        <Layout title='Projects' footer={true}>
            <div className='max-w-screen-md mx-auto'>
                <h1 className='text-3xl font-bold pb-8'>Projects</h1>
                Coming soon!
            </div>
        </Layout>
    )
}

export default Projects
