import { getAllPosts, getPost } from "../lib";
import "./hljs.css";
import "./prose.css";

export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await getPost(params.slug);
  return { title: post.title };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await getPost(params.slug);

  return (
    <>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="mt-4">{post.date.toISOString().slice(0, 10)}</div>
      <div
        className="prose mt-4 space-y-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </>
  );
}
