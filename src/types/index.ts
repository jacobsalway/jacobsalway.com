export interface Hero {
    name: string
    tagline: string
    subtext: string[]
}

export interface Post {
    title: string
    id: string
    date: string
}

export interface FullPost extends Post {
    tags: string[] | null
    content: string
}

export interface GroupedPosts<T extends Post> {
    group: string | number
    posts: T[]
}

export interface Project {
    name: string
    links: {
        name: string
        link: string
    }[]
    description: string
}

export enum FadeState {
    NONE,
    ANIMATE,
    HIDE,
}

export interface Animatable {
    animate: FadeState
    onComplete: () => void
}
