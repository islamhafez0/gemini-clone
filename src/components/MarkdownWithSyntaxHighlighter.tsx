import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy } from "react-icons/fa";
import { useState, memo } from "react";
import { IoMdCheckmark } from "react-icons/io";

interface MarkdownWithSyntaxHighlighterProps {
  content: string;
}

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

const CodeBlock = memo(({ className, children, ...props }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const code = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div
        style={{
          width: !language ? "fit-content" : "",
        }}
        className="code-info-wrapper"
      >
        <span>{language}</span>
        {!copied ? (
          <span onClick={handleCopy}>
            <FaCopy /> Copy code
          </span>
        ) : (
          <span>
            <IoMdCheckmark size={18} />
            Copied!
          </span>
        )}
      </div>
      <SyntaxHighlighter
        style={materialDark}
        language={language}
        PreTag="div"
        {...props}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
});

const MarkdownWithSyntaxHighlighter: React.FC<
  MarkdownWithSyntaxHighlighterProps
> = ({ content = "" }) => {
  return (
    <>
      <Markdown
        className="markdown"
        children={content}
        components={{
          code: CodeBlock as any,
        }}
      />
    </>
  );
};

export default MarkdownWithSyntaxHighlighter;
