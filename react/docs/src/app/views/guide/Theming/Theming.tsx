import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import DocsNavbar from 'components/DocsNavbar';
import { Overview, YourOwnThemes } from './pages';

export const Theming = () => {
  const match = useRouteMatch();

  return (
    <div className="docs-view">
      <DocsNavbar routes={['overview', 'your-own-themes']} routeNames={['Overview', 'Your own themes']}></DocsNavbar>

      <h1>Theming</h1>

      <Switch>
        <Redirect path={match.url} to={`${match.url}/overview`} exact></Redirect>
        <Route path={`${match.url}/overview`} component={Overview}></Route>
        <Route path={`${match.url}/your-own-themes`} component={YourOwnThemes}></Route>
      </Switch>
    </div>
  );
}

export default Theming;
