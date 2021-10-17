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

export type CustomContent = {
    type: string;
    content: string;
}

export type ContentType = string | CustomContent;

// Blog and Blog sub-component props
export type PostProps = {
    title: string;
    id: string;
    time: string;
    content: ContentType[];
}

export type BlogProps = {
    posts?: PostProps[];
}