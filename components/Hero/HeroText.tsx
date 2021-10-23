import React from 'react';
import { HeroTextProps } from '../../types';
import FadeIn, { AnimateProps } from '../FadeIn';
import styles from '../../styles/Hero.module.sass';

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

export default HeroText;