import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';

interface PostProps {
    title: string;
    id: string;
    time: Date | string;
    content: string[];
}

const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const day = date.getDate().toString();
    const month = months[date.getMonth()]
    const year = date.getFullYear().toString();

    return `${day} ${month}, ${year}`;
}

const getPreview = (post: PostProps): PostProps => {
    return {
        title: post.title,
        id: post.id,
        time: formatDate(new Date(post.time)),
        content: [post.content[0]]
    }
}

const Post: FC<PostProps> = ({ title, id, time, content }) => {
    return (
        <div className="post">
            <h1>{title}</h1>
            <div className="post-meta"><span>Posted on {time}</span></div>
            <div className="post-content">{content.map(x => <p>{x}</p>)}</div>
            <div className="post-read-more"><a href={`/blog/${id}`}>Read more →</a></div>
        </div>
    );
};

export const BlogLoader = () => {
    return (
        <ContentLoader viewBox="0 0 800 220">
            <rect x="0" y="0" rx="1" ry="1" width="800" height="43" />
            <rect x="0" y="50" rx="1" ry="1" width="150" height="30" />
            <rect x="0" y="100" rx="1" ry="1" width="800" height="21" />
            <rect x="0" y="130" rx="1" ry="1" width="800" height="21" />
            <rect x="0" y="160" rx="1" ry="1" width="600" height="21" />
        </ContentLoader>
    )
}

interface BlogProps {
    posts?: PostProps[];
}

const Blog: FC<BlogProps> = ({ posts }) => {
    if (posts == null || (posts instanceof Array && posts.length === 0)) {
        return <span>No blog content yet.</span>;
    } else {
        return (
            <div>
                {posts.map(getPreview).map(Post)}
            </div>
        )
    }

}

export default Blog;