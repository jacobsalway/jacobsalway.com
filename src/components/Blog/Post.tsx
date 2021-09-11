import React from 'react';
import { Link, RouteComponentProps, useRouteMatch } from 'react-router-dom';
import { BlogProps } from '../../types';
import { formatDate } from './utils';
import pfp from '../../img/Jacob.jpg';

type RouteInfo = {
    id?: string;
}

const Post: React.FC<RouteComponentProps<RouteInfo> & BlogProps> = ({ match, posts }) => {
    const post = posts?.find(p => p.id === match.params.id);
    const { path } = useRouteMatch();

    if (post == null) return <div>No post found</div>;

    const { title, time, content } = post;

    return (
        <div className='post'>
            <div className='post-go-back'><Link to={`${path.substring(0, path.lastIndexOf('/'))}`}>Back to blog</Link></div>
            <div className='post-meta'>
                <div className='post-meta-upper'>
                    <span>{formatDate(time)}</span>
                </div>
                <h1>{title}</h1>
                <div className='post-meta-lower'>
                    <div className='circle' style={{ backgroundImage: `url(${pfp})`, backgroundSize: 'cover' }}/>
                    <span>Jacob Salway</span>
                </div>
            </div>
            <div className='post-content'>
                {content.map((p, i) => <p key={i}>{p}</p>)}
            </div>
        </div>
    )
}

export default Post;