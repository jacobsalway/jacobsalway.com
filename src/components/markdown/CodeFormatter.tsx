import styles from '@styles/Blog.module.sass'
import type { CSSProperties } from 'react'
import { CodeComponent } from 'react-markdown/lib/ast-to-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import CopyButton from '../CopyButton'

// set a fixed width for the line numbers
// so that all code in the post is aligned
const lineNumberStyle = {
    minWidth: '1.5em',
    paddingRight: '1em',
    fontWeight: 'normal',
    textAlign: 'left',
    userSelect: 'none',
    color: '#888',
} as CSSProperties

const CodeFormatter: CodeComponent = ({
    inline,
    className,
    children,
    ...props
}) => {
    const match = /language-(\w+)/.exec(className || '')
    const code = children.toString().trim()

    return !inline && match ? (
        <div className={styles.codeBlock}>
            <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                showLineNumbers={true}
                showInlineLineNumbers={false}
                lineNumberStyle={lineNumberStyle}
                customStyle={{ padding: 0, margin: 0, background: 'none' }}
            >
                {code}
            </SyntaxHighlighter>
            <CopyButton className={styles.copyButton} valueToCopy={code} />
        </div>
    ) : (
        <code className={className} {...props}>
            {children}
        </code>
    )
}

export default CodeFormatter
