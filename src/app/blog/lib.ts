import { promises as fs } from "fs";
import path from "path";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type Post = {
  title: string;
  slug: string;
  date: Date;
  contentHtml: string;
};

const postsDir = path.join(process.cwd(), "posts");

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkParseFrontmatter)
  .use(remarkRehype)
  .use(rehypeExternalLinks, { target: "_blank", rel: [] })
  .use(rehypeHighlight)
  .use(rehypeStringify);

export async function getPost(slug: string) {
  const fileContent = await fs.readFile(path.join(postsDir, `${slug}.md`));
  const result = await processor.process(fileContent);

  const meta = result.data.frontmatter as { title: string; date: string };

  return {
    title: meta.title,
    slug,
    date: new Date(meta.date),
    contentHtml: result.value.toString(),
  };
}

export async function getAllPosts() {
  const fileNames = await fs.readdir(postsDir);
  return await Promise.all(
    fileNames.map(
      async (fileName) => await getPost(fileName.replace(/.md$/, "")),
    ),
  );
}

export function sortPosts(posts: Post[]): Post[] {
  return posts.toSorted((a, b) => b.date.getTime() - a.date.getTime());
}
