import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import pfp from '../../img/Jacob.jpg';
import styles from '../../styles/Blog.module.sass';
import { PostProps } from '../../types';
import { formatDate } from './utils';

const Post: React.FC<PostProps> = ({ title, date, content }) => {
    return (
        <div className={styles.post}>
            <div className={styles.postGoBack}><Link href='/blog'>Back to blog</Link></div>
            <div className={styles.postMeta}>
                <div className={styles.postMetaUpper}>
                    <span>{formatDate(new Date(date))}</span>
                </div>
                <h1>{title}</h1>
                <div className={styles.postMetaLower}>
                    <div className={styles.circle} style={{ backgroundImage: `url(${pfp.src})`, backgroundSize: 'cover' }}/>
                    <span className={styles.postMetaAuthor}>Jacob Salway</span>
                </div>
            </div>
            <ReactMarkdown
                className={styles.postContent}
                children={content}
                components={{
                    code: ({node, inline, className, children, ...props}) => {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                showLineNumbers={true}>
                                {children}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    }
                }}
            />
        </div>
    )
}

export default Post;