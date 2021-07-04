import React, { FC } from 'react';

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

interface BlogProps {
    posts?: PostProps[];
}

const Blog: FC<BlogProps> = ({ posts }) => {
    if (posts == null || (posts instanceof Array && posts.length === 0)) {
        return <div className="blog-content">No blog content yet.</div>;
    } else {
        return (
            <div className="blog-content">
                {posts.map(getPreview).map(Post)}
            </div>
        )
    }

}

export default Blog;