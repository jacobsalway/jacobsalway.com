import React, { useState } from 'react'
import styles from '../../styles/Hero.module.sass'
import { HeroProps } from '../../types'
import { AnimateProps, FadeState } from '../FadeIn'
import HeroText from './HeroText'

const Hero: React.FC<HeroProps & AnimateProps> = ({ heroText, animate, onComplete}) => {
    const heroAnimate = animate ? FadeState.ANIMATE : FadeState.NONE

    return (
        <div className='max-w-screen-2xl mx-auto h-full flex'>
            <div className='flex justify-center flex-grow'>
                <HeroText animate={heroAnimate} onComplete={onComplete} {...heroText} />
            </div>
        </div>
    )
}

export default Hero