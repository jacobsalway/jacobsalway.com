import FadeIn from '@components/FadeIn'
import {
    faGithub,
    faLinkedin,
    IconDefinition,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '@styles/Hero.module.sass'
import { Animatable, Hero } from '@types'
import React from 'react'

type Props = Hero & Animatable

const HeroView: React.FC<Props> = ({
    name,
    subtext,
    links,
    animate,
    onComplete,
}) => {
    return (
        <div className="max-w-screen-md mx-auto">
            <FadeIn animate={animate} delay={150} onComplete={onComplete}>
                <span className="font-mono text-md text-domain-green sm:text-lg">
                    Hey there,
                </span>
                <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-light mt-1 pb-5 border-b">
                    I&apos;m <span className="font-semibold">{name}.</span>
                </h1>
                <div className={`${styles.heroSubtext} mt-6 leading-relaxed`}>
                    {subtext.map((p, i) => (
                        <p
                            className="mt-4"
                            key={i}
                            dangerouslySetInnerHTML={{ __html: p }}
                        />
                    ))}
                </div>
                <div className="mt-5">
                    <span>If you want to connect, you can find me on:</span>
                    <div className="flex mt-4 space-x-4 text-3xl">
                        {links.map(HeroLink)}
                    </div>
                </div>
            </FadeIn>
        </div>
    )
}

type HeroLinkProps = { link: string; icon: string }

const HeroLink: React.FC<HeroLinkProps> = ({ link, icon }) => {
    const mapping = new Map([
        ['github', faGithub],
        ['linkedin', faLinkedin],
    ])
    return (
        <a
            className="flex flex-row items-center"
            href={link}
            target="_blank"
            rel="noreferrer"
        >
            <FontAwesomeIcon icon={mapping.get(icon) as IconDefinition} />
        </a>
    )
}

export default HeroView
