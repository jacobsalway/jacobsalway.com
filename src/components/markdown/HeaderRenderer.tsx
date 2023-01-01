import React from 'react'
import { HeadingProps } from 'react-markdown/lib/ast-to-react'
import { onlyText } from './utils'

const headingTextToSlug = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9 ]+/gi, '')
        .replaceAll(' ', '-')

const HeadingLink: React.FC<{ slug: string }> = ({ slug }) => {
    return (
        <a
            className="invisible ml-1 px-1 text-highlight no-underline hover:underline group-hover:visible"
            href={'#' + slug}
        >
            #
        </a>
    )
}

const HeaderRenderer: React.FC<HeadingProps> = ({ level, children }) => {
    const slug = headingTextToSlug(onlyText(children))
    return React.createElement(
        `h${level}`,
        { className: 'group', id: slug },
        children.concat(<HeadingLink slug={slug} />)
    )
}

export default HeaderRenderer
