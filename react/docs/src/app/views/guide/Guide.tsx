import React, { lazy, Suspense } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import MlButton from '../../../material-lite/react/Button';
import DocsSidenav from 'components/DocsSidenav';

const Categories = lazy(() => import('./Categories'));

const Guide = () => (
  <div className="app-view">
    <DocsSidenav>
      <MlButton><Link to="/react/guide/getting-started">Getting started</Link></MlButton>
      <MlButton><Link to="/react/guide/theming">Theming</Link></MlButton>
      <MlButton><Link to="/react/guide/elevation-styles">Elevation styles</Link></MlButton>
      <MlButton><Link to="/react/guide/duplicate-styles">Duplicate styles</Link></MlButton>
    </DocsSidenav>

    <Suspense fallback>
      <Switch>
        <Route path='/guide/categories' component={Categories}></Route>
      </Switch>
    </Suspense>
  </div>
);

export default Guide;