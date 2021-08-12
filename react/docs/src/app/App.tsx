import React from 'react';
import './App.scss';

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Components from './views/components/Components';
import CDK from './views/cdk/CDK';
import Guide from './views/guide/Guide';
import Home from './views/Home';
import NotFound from './views/NotFound/NotFound';

function App() {
  return (
    <Router>
      <header className="root-header ml-primary-style">
        <div className="root-header-left-nav">
          <Link to="/home">Home</Link>
          <Link to="/components/categories">Components</Link>
          <Link to="/cdk/categories">CDK</Link>
          <Link to="/guide/categories">Guide</Link>
        </div>

        <div className="root-header-right-nav">
          {/* <button mlButton>v{{ version }}</button> */}

          {/* <button mlButton (click)="toggleDarkTheme()"> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" width="24" viewBox="0 0 24 24" fill="white" > <g><path d="M0,0h24v24H0V0z" fill="none" /></g> <g> <path d="M12,4.81L12,19c-3.31,0-6-2.63-6-5.87c0-1.56,0.62-3.03,1.75-4.14L12,4.81 M6.35,7.56L6.35,7.56C4.9,8.99,4,10.96,4,13.13 C4,17.48,7.58,21,12,21c4.42,0,8-3.52,8-7.87c0-2.17-0.9-4.14-2.35-5.57l0,0L12,2L6.35,7.56z" /> </g> </svg> */}
          {/* </button> */}

          <a href="https://github.com/junpei10/material-lite" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>github-circle-white-transparent</title><path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0 0 10 0z" fill="#FFF" fillRule="evenodd"/></svg>
          </a>
        </div>
      </header>

      <main className="root-main">
        <Switch>
          <Route path='/components' component={Components}></Route>
          <Route path='/cdk' component={CDK}></Route>
          <Route path='/guide' component={Guide}></Route>
          <Redirect path="/" to="/home" exact ></Redirect>
          <Route path='/home' component={Home}></Route>
          <Route path='/*' component={NotFound}></Route>
        </Switch>
      </main>

      <footer className="root-footer ml-primary-style">
        <a className="root-footer-anchor" href="https://material-lite.web.app/react" target="_blank" rel="noopener noreferrer">React Ver.</a>
        <a className="root-footer-anchor" href="https://material-lite.web.app/vue3" target="_blank" rel="noopener noreferrer">Vue3 Ver.</a>
        <a className="root-footer-anchor" href="https://material.angular.io/" target="_blank" rel="noopener noreferrer">Angular Material</a>
      </footer>
    </Router>
  );
}

export default App;
