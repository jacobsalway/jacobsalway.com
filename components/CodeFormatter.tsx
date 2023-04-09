import type { CSSProperties } from "react";
import { CodeComponent } from "react-markdown/lib/ast-to-react";
import SyntaxHighlighter from "./SyntaxHighlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

// set a fixed width for the line numbers
// so that all code in the post is aligned
const lineNumberStyle = {
  minWidth: "1.5em",
  paddingRight: "1em",
  fontWeight: "normal",
  textAlign: "left",
  userSelect: "none",
  color: "#888",
} as CSSProperties;

const CodeFormatter: CodeComponent = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "");
  const code = children.toString().trim();

  return !inline && match ? (
    <div className="font-mono p-4 text-sm bg-[#1e1e1e] rounded-lg">
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        showLineNumbers={true}
        showInlineLineNumbers={false}
        lineNumberStyle={lineNumberStyle}
        customStyle={{ padding: 0, margin: 0, background: "none" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default CodeFormatter;
