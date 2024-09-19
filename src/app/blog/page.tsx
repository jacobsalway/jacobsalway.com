import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, sortPosts } from "./lib";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function Blog() {
  const posts = sortPosts(await getAllPosts());

  return (
    <>
      <h1 className="text-2xl font-bold">Posts</h1>
      <ul className="mt-4 list-disc pl-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
