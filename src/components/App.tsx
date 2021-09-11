import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { hero, terminal } from '../content';
import '../sass/index.sass';
import Blog from './Blog';
import { FadeState } from './FadeIn';
import Hero from './Hero';
import Nav from './Nav';
import Page from './Page';

const App: React.FC = () => {
    const [heroAnimated, setHeroAnimated] = useState(false);
    const shouldAnimateHero = heroAnimated ? FadeState.NONE : FadeState.ANIMATE;

    return (
        <div className='app'>
            <Router>
                <Nav />
                <div className='content'>
                    <Switch>
                        <Page exact path='/'>
                            <Hero heroText={hero.heroText} terminal={terminal} animate={shouldAnimateHero} onComplete={() => setHeroAnimated(true)}/>
                        </Page>
                        <Page path='/blog' title='Blog'>
                            <Blog posts={[]}/>
                        </Page>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
