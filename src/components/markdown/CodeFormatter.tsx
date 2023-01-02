import styles from '@styles/Blog.module.sass'
import { CodeComponent } from 'react-markdown/lib/ast-to-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import CopyButton from '../CopyButton'

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
                style={darcula}
                language={match[1]}
                showLineNumbers={true}
                lineNumberStyle={{
                    textAlign: 'left',
                    minWidth: '2.5em',
                }}
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
