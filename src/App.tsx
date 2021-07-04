import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Blog from './components/Blog';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Page from './components/Page';
import './sass/blog.sass';
import './sass/hero.sass';
import './sass/nav.sass';
import { hero, terminal } from './content';


function App() {
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
                            <Blog />
                        </Page>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
