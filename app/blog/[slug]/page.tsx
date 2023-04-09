import { formatDate, loadPost, postIds } from "@/app/lib";
import dynamic from "next/dynamic";
import Link from "next/link";
import { default as ReactMarkdown } from "react-markdown";

export function generateMetadata({ params }: { params: { slug: string } }) {
  const { title } = loadPost(params.slug);

  return {
    title: `${title} / Jacob Salway`,
  };
}

export function generateStaticParams() {
  return postIds.map((id) => ({ slug: id }));
}

export default function Post({ params }: { params: { slug: string } }) {
  const { title, date, content } = loadPost(params.slug);
  const readTime = Math.ceil(content.trim().split(/\s+/).length / 225);

  return (
    <>
      <div className="mb-8 font-bold">
        <Link href="/blog" className="hover:text-blue-500 underline">
          Back to blog
        </Link>
      </div>
      <h1 className="mb-4 text-4xl font-bold">{title}</h1>
      <div className="mb-8">
        <div className="flex w-full flex-row items-center">
          <div className="flex w-full flex-col justify-between text-sm text-gray-500 sm:flex-row">
            <div className="flex flex-row items-center">
              <span>Jacob Salway / {formatDate(date, true)}</span>
            </div>
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>
      <ReactMarkdown
        className="leading-relaxed space-y-5"
        components={{
          code: dynamic(() => import("@/components/CodeFormatter")),
          h2: ({ children }) => (
            <h2 className="font-bold text-2xl">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-bold text-xl">{children}</h3>
          ),
          ol: ({ children }) => (
            <ol className="list-outside pl-8 list-decimal">{children}</ol>
          ),
          ul: ({ children }) => (
            <ul className="list-outside pl-8 list-disc">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="[&:not(:last-child)]:mb-2">{children}</li>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </>
  );
}
