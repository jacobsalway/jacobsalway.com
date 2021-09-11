import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import { BlogProps } from '../../types';
import Page from '../Page';
import PostList from './PostList';
import Post from './Post';
import '../../sass//Blog.sass';

const Blog: React.FC<BlogProps> = ({ posts }) => {
    const { path } = useRouteMatch();

    return (
        <div className='blog-content'>
            <Switch>
                <Page exact path={`${path}`} title='Blog'>
                    <PostList posts={posts}/>
                </Page>
                <Page exact path={`${path}/:id`} title='Blog post' render={routeProps =>
                    <Post {...routeProps} posts={posts} />
                } />
            </Switch>
        </div>
    )
}

export default Blog;