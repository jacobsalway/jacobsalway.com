import { CodeComponent } from 'react-markdown/lib/ast-to-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import styles from '../../styles/Blog.module.sass'
import CopyButton from './CopyButton'

const CodeFormatter: CodeComponent = ({node, inline, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '')
    const code = children.toString().trim()

    return !inline && match ? (
        <div className={styles.codeBlock}>
            <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                showLineNumbers={true}
                lineNumberStyle={{ textAlign: 'left', paddingRight: '2em' }}
                customStyle={{ padding: 0, background: null }}>
                {code}
            </SyntaxHighlighter>
            <CopyButton className={styles.copyButton} valueToCopy={code}/>
        </div>
    ) : (
        <code className={className} {...props}>
            {children}
        </code>
    )
}

export default CodeFormatter