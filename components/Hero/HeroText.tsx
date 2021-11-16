import { faGithub, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from '../../styles/Hero.module.sass'
import { HeroTextProps } from '../../types'
import FadeIn, { AnimateProps } from '../FadeIn'

const HeroText: React.FC<HeroTextProps & AnimateProps> = ({ name, subtext, animate, onComplete }) => {
    return (
        <div className='max-w-screen-md'>
            <FadeIn animate={animate} delay={150} onComplete={onComplete}>
                <span className='font-mono text-sm text-domain-green sm:text-lg'>Hey there,</span>
                <h1 className='text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-light mt-1 pb-5 border-b'>I'm <span className='font-semibold'>{name}.</span></h1>
                <div className={`${styles.heroSubtext} mt-6 leading-relaxed`}>
                    {subtext.map((p, i) => <p className='mt-4' key={i} dangerouslySetInnerHTML={{__html: p}}></p>)}
                </div>
                <div className='mt-5'>
                    <span>If you want to connect, you can find me on:</span>
                    <div className='flex mt-4 space-x-4 text-3xl'>
                        <a className='flex flex-row items-center' href='https://github.com/jacobsalway' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faGithub} /></a>
                        <a className='flex flex-row items-center' href='https://www.linkedin.com/in/jacobsalway/' target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faLinkedin} /></a>
                    </div>
                </div>
            </FadeIn>
        </div>
    )
}

export default HeroText