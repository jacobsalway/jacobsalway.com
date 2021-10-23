import React, { useState } from 'react';
import { HeroProps } from '../../types';
import { AnimateProps, FadeState } from '../FadeIn';
import styles from '../../styles/Hero.module.sass';
import HeroText from './HeroText';
import Terminal from './Terminal';

const Hero: React.FC<HeroProps & AnimateProps> = ({ heroText, terminal: { output }, animate, onComplete}) => {
    const [heroTextAnimated, setHeroTextAnimated] = useState(false);

    const heroAnimate = animate ? FadeState.ANIMATE : FadeState.NONE;
    const terminalAnimate = animate ? (heroTextAnimated ? FadeState.ANIMATE : FadeState.HIDE) : FadeState.NONE;

    return (
        <div className={styles.hero}>
            <div className={styles.heroContent}>
                <HeroText animate={heroAnimate} onComplete={() => setHeroTextAnimated(true)} {...heroText} />
                <Terminal animate={terminalAnimate} onComplete={() => onComplete()} output={output} />
            </div>
        </div>
    )
}

export default Hero;