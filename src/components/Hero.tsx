import React, { useState } from 'react';
import { HeroProps, HeroTextProps, TerminalProps } from '../types';
import FadeIn, { FadeState } from './FadeIn';
import '../sass/Hero.sass';

type AnimateProps = {
    animate: FadeState;
    onComplete: () => void;
}

const HeroText: React.FC<HeroTextProps & AnimateProps> = ({ name, intro, subtext, animate, onComplete }) => {
    return (
        <div className='hero-text'>
            <FadeIn animate={animate} delay={150} onComplete={onComplete}>
                <h3>Hi, my name is</h3>
                <h1>{name}</h1>
                <h2>{intro}</h2>
                <div className='hero-text-subtext'>
                    {subtext.map((p, i) => <p key={i} dangerouslySetInnerHTML={{__html: p}}></p>)}
                </div>
            </FadeIn>
        </div>
    );
}

const Terminal: React.FC<TerminalProps & AnimateProps> = ({ output, animate, onComplete }) => {
    return (
        <div className='terminal-container'>
            <FadeIn animate={animate} onComplete={onComplete}>
                <div className='terminal'>
                    <div className='terminal-header'>
                        <div className='header-button red'></div>
                        <div className='header-button yellow'></div>
                        <div className='header-button green'></div>
                    </div>
                    <div className='terminal-window'>
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
        <div className='hero'>
            <div className='hero-content'>
                <HeroText animate={heroAnimate} onComplete={() => setHeroTextAnimated(true)} {...heroText} />
                <Terminal animate={terminalAnimate} onComplete={() => onComplete()} output={output} />
            </div>
        </div>
    )
}

export default Hero;