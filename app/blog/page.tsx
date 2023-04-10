import { formatDate, groupAndSortByYear, loadPost, postIds } from "@/app/lib";
import Link from "next/link";

export const metadata = {
  title: "Blog / Jacob Salway",
};

export default function Blog() {
  const posts = postIds.map((id) => loadPost(id));
  const groupedPosts = groupAndSortByYear(posts);

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>
      <div className="flex flex-col space-y-10">
        {groupedPosts.map(({ group: year, values: posts }) => (
          <div key={year}>
            <h2 className="mb-4 text-3xl font-bold">{year}</h2>
            <div className="flex flex-col space-y-3">
              {posts.map((post) => (
                <div key={post.id}>
                  <Link
                    href={`/blog/${post.id}`}
                    className="group flex items-baseline justify-between text-lg no-underline hover:text-blue-500 md:text-xl"
                  >
                    <h1 className="underline">{post.title}</h1>
                    <span className="ml-3 whitespace-nowrap text-sm text-gray-400 group-hover:text-blue-500">
                      {formatDate(post.date, false)}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
