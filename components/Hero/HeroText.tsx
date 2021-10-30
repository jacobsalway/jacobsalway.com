import React from 'react'
import { HeroTextProps } from '../../types'
import FadeIn, { AnimateProps } from '../FadeIn'
import styles from '../../styles/Hero.module.sass'

const HeroText: React.FC<HeroTextProps & AnimateProps> = ({ name, intro, subtext, animate, onComplete }) => {
    return (
        <div className='w-full xl:w-5/12'>
            <FadeIn animate={animate} delay={150} onComplete={onComplete}>
                <span className='font-mono text-l sm:text-xl'>Hi, my name is</span>
                <h1 className='text-5xl sm:text-7xl font-semibold mt-0.5'>{name}</h1>
                <h2 className='text-2xl sm:text-4xl font-medium mt-1'>{intro}</h2>
                <div className={`${styles.heroSubtext} mt-8 leading-relaxed text-l sm:text-lg`}>
                    {subtext.map((p, i) => <p className='mt-4' key={i} dangerouslySetInnerHTML={{__html: p}}></p>)}
                </div>
            </FadeIn>
        </div>
    )
}

export default HeroText