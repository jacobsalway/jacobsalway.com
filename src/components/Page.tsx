import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { PageProps } from '../types';

const Page: React.FC<PageProps & RouteProps> = (props) => {
    useEffect(() => {
        document.title = 'Jacob Salway' + (props.title ? ` | ${props.title}` : '');
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { title, ...rest } = props;
    return <Route {...rest} />;
}

export default Page;