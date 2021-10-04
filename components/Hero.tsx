import React, { useState } from 'react';
import { HeroProps, HeroTextProps, TerminalProps } from '../types';
import FadeIn, { FadeState} from './FadeIn'
import styles from '../styles/Hero.module.sass'

type AnimateProps = {
    animate: FadeState;
    onComplete: () => void;
}

const HeroText: React.FC<HeroTextProps & AnimateProps> = ({ name, intro, subtext, animate, onComplete }) => {
    return (
        <div className={styles.heroText}>
            <FadeIn animate={animate} delay={150} onComplete={onComplete}>
                <h3>Hi, my name is</h3>
                <h1>{name}</h1>
                <h2>{intro}</h2>
                <div className={styles.heroTextSubtext}>
                    {subtext.map((p, i) => <p key={i} dangerouslySetInnerHTML={{__html: p}}></p>)}
                </div>
            </FadeIn>
        </div>
    );
}

const Terminal: React.FC<TerminalProps & AnimateProps> = ({ output, animate, onComplete }) => {
    return (
        <div className={styles.terminalContainer}>
            <FadeIn animate={animate} onComplete={onComplete}>
                <div className={styles.terminal}>
                    <div className={styles.terminalHeader}>
                        <div className={`${styles.headerButton} ${styles.red}`}></div>
                        <div className={`${styles.headerButton} ${styles.yellow}`}></div>
                        <div className={`${styles.headerButton} ${styles.green}`}></div>
                    </div>
                    <div className={styles.terminalWindow}>
                        {output.map((cmd, i) => <div key={i}>{cmd}</div>)}
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}

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