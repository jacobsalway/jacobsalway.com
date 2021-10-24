import { CodeComponent } from 'react-markdown/lib/ast-to-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export const formatDate = (date: Date): string => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const day = date.getDate().toString();
    const month = months[date.getMonth()]
    const year = date.getFullYear().toString();

    return ` ${day} ${month}, ${year}`;
}

export const codeFormatter: CodeComponent = ({node, inline, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
        <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            showLineNumbers={true}
            lineNumberStyle={{ textAlign: 'left', paddingRight: '2em' }}
            customStyle={{ padding: 0, background: null}}>
            {children.toString().trim()}
        </SyntaxHighlighter>
    ) : (
        <code className={className} {...props}>
            {children}
        </code>
    )
}