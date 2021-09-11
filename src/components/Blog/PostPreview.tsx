import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { PostProps } from '../../types';
import { formatDate } from './utils';

const PostPreview: React.FC<PostProps> = ({ title, id, time, content }) => {
    const { path } = useRouteMatch();
    const postLink = `${path}/${id}`;

    const readTime = Math.ceil(content.map(x => x.trim()).join(' ').split(/\s+/).length / 225);

    return (
        <div className="post-preview" key={id}>
            <Link to={postLink}><h1>{title}</h1></Link>
            <div className="post-meta"><span>Posted on {formatDate(time)} - {readTime} mins</span></div>
            <div className="post-content"><p>{content[0]}</p></div>
            <div className="post-read-more"><Link to={postLink}>Read more...</Link></div>
        </div>
    );
};

export default PostPreview;