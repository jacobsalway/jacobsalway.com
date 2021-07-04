import React, { FC } from 'react';

interface IHeroTextProps {
    name: string;
    intro: string;
    subtext: string[];
}

const HeroText: FC<IHeroTextProps> = ({ name, intro, subtext }) => {
    return (
        <div className='hero-text'>
            <h3>Hi, my name is</h3>
            <h1>{name}</h1>
            <h2>{intro}</h2>
            <div className='hero-text-subtext'>
                {subtext.map(x => <p dangerouslySetInnerHTML={{__html: x}}></p>)}
            </div>
        </div>
    );
}

interface ITerminalProps {
    output: string[];
}

const Terminal: FC<ITerminalProps> = ({ output }) => {
    return (
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
}

interface IHeroProps {
    heroText: IHeroTextProps;
    terminal: string[];
}

const Hero: FC<IHeroProps> = ({ heroText, terminal }) => {
    return (
        <div className='hero'>
            <div className='hero-content'>
                <HeroText {...heroText} />
                <Terminal output={terminal}/>
            </div>
        </div>
    )
}

export default Hero;