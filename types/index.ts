// Hero and Hero sub-component props
export type HeroTextProps = {
    name: string;
    intro: string;
    subtext: string[];
}

export type TerminalProps = {
    output: string[];
}

export type HeroProps = {
    heroText: HeroTextProps;
    terminal: TerminalProps;
}

// Blog and Blog sub-component props
export type PostProps = {
    title: string;
    id: string;
    date: string;
    content: string;
}

export type BlogProps = {
    posts?: PostProps[];
}


// Project and Project sub-component props
export type ProjectProps = {
    name: string;
    links: {name: string, link: string}[];
    description: string;
}

export type ProjectsProps = {
    projects: ProjectProps[];
}