import React, { useEffect, FC } from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface IPageProps extends RouteProps {
    title?: string;
}

const Page: FC<IPageProps> = (props) => {
    useEffect(() => {
        document.title = 'Jacob Salway' + (props.title ? ` | ${props.title}` : '');
    });

    const { title, ...rest } = props;
    return <Route {...rest} />;
}

export default Page;