import { NextPage } from 'next'
import Layout from '../components/Layout'
import styles from '../styles/Projects.module.sass'

const Projects: NextPage = () => {
    return (
        <Layout title='Projects' footer={true}>
            <div className='max-w-screen-md mx-auto'>
                <h1 className='text-3xl font-bold pb-8'>Projects</h1>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='p-6 rounded-md shadow-md border'>
                        <span className='text-lg font-bold'>Project 1</span>
                        <ul className={`flex list-none ${styles.projectLinks}`}>
                            <li className='font-semibold'><a>slides</a></li>
                            <li className='font-semibold'><a>demo</a></li>
                            <li className='font-semibold'><a>code</a></li>
                        </ul>
                        <p className='mt-4'>
                            This is some text about the project.
                        </p>
                    </div>
                    <div className='p-6 rounded-md shadow-md border'>
                        <span className='text-lg font-bold'>Project 2</span>
                        <ul className={`flex list-none ${styles.projectLinks}`}>
                            <li className='font-semibold'><a>slides</a></li>
                            <li className='font-semibold'><a>demo</a></li>
                            <li className='font-semibold'><a>code</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Projects
