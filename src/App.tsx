import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import { BlogLoader } from './components/Blog';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Page from './components/Page';
import { hero, terminal } from './content';
import './sass/blog.sass';
import './sass/hero.sass';
import './sass/nav.sass';

const Blog = React.lazy(() => {
    return Promise.all([
        import('./components/Blog'),
        new Promise(resolve => setTimeout(resolve, 1000))
    ]).then(([moduleExports]) => moduleExports)
});

const App = () => {
    return (
        <div className='app'>
            <Router>
                <Nav />
                <div className='content'>
                    <Switch>
                        <Page exact path='/'>
                            <Hero heroText={hero.heroText} terminal={terminal}/>
                        </Page>
                        <Page path='/blog' title='Blog'>
                            <div className='blog-content'>
                                <Suspense fallback={<BlogLoader />}>
                                    <Blog />
                                </Suspense>
                            </div>
                        </Page>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
