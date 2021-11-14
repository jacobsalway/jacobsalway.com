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
    date: Date;
    content: string;
}

export type BlogProps = {
    posts?: PostProps[];
}