import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import DocsNavbar from 'components/DocsNavbar';
import { Examples, Overview, Reference } from './pages';

export const Button = () => {
  const match = useRouteMatch();

  return (
    <div className="docs-view">
      <DocsNavbar></DocsNavbar>

      <h1>Button<code>- Directive</code></h1>

      <Switch>
        <Redirect path={match.url} to={`${match.url}/overview`} exact></Redirect>
        <Route path={`${match.url}/overview`} component={Overview}></Route>
        <Route path={`${match.url}/reference`} component={Reference}></Route>
        <Route path={`${match.url}/examples`} component={Examples}></Route>
      </Switch>
    </div>
  );
}

export default Button;
