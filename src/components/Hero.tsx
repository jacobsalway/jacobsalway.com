import React, { FC, useState } from 'react';
import FadeIn from 'react-fade-in';

interface IHeroText {
    name: string;
    intro: string;
    subtext: string[];
}

interface HeroTextProps extends IHeroText {
    animatedCallback: () => void;
}

const HeroText: FC<HeroTextProps> = ({ name, intro, subtext, animatedCallback }) => {
    return (
        <div className='hero-text'>
            <FadeIn delay={150} onComplete={() => animatedCallback()}>
                <h3>Hi, my name is</h3>
                <h1>{name}</h1>
                <h2>{intro}</h2>
                <div className='hero-text-subtext'>
                    {subtext.map(x => <p dangerouslySetInnerHTML={{__html: x}}></p>)}
                </div>
            </FadeIn>
        </div>
    );
}

interface ITerminalProps {
    output: string[];
    animate: boolean;
}

const Terminal: FC<ITerminalProps> = ({ output, animate }) => {
    const terminal = (
        <div className='terminal'>
            <div className='terminal-header'>
                <div className='header-button red'></div>
                <div className='header-button yellow'></div>
                <div className='header-button green'></div>
            </div>
            <div className='terminal-window'>
                {output.map(x => <div>{x}</div>)}
            </div>
        </div>
    );

    return (
        <div className='terminal-container'>
            {animate ? <FadeIn delay={150} className='fade-in' childClassName='fade-in'>
                {terminal}
            </FadeIn> : <div style={{visibility: 'hidden'}}>{terminal}</div>}
        </div>
    );
}

interface IHeroProps {
    heroText: IHeroText;
    terminal: string[];
}

const Hero: FC<IHeroProps> = ({ heroText, terminal }) => {
    const [heroAnimated, setHeroAnimated] = useState(false);

    return (
        <div className='hero'>
            <div className='hero-content'>
                <HeroText {...heroText} animatedCallback={() => setHeroAnimated(true)}/>
                <Terminal output={terminal} animate={heroAnimated}/>
            </div>
        </div>
    )
}

export default Hero;