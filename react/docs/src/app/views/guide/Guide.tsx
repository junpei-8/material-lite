import React, { lazy, Suspense } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import MlButton from '../../../material-lite/react/Button';
import DocsSidenav from 'components/DocsSidenav';

const Categories = lazy(() => import('./Categories'));
const GettingStarted = lazy(() => import('./GettingStarted'));
const Theming = lazy(() => import('./Theming'));
const ElevationStyles = lazy(() => import('./ElevationStyles'));

const Guide = () => (
  <div className="app-view">
    <DocsSidenav>
      <MlButton><Link to="/react/guide/getting-started">Getting started</Link></MlButton>
      <MlButton><Link to="/react/guide/theming">Theming</Link></MlButton>
      <MlButton><Link to="/react/guide/elevation-styles">Elevation styles</Link></MlButton>
    </DocsSidenav>

    <Suspense fallback>
      <Switch>
        <Route path="/react/guide/categories" component={Categories}></Route>
        <Route path="/react/guide/getting-started" component={GettingStarted}></Route>
        <Route path="/react/guide/theming" component={Theming}></Route>
        <Route path="/react/guide/elevation-styles" component={ElevationStyles}></Route>
        {/* <Route path="/react/guide/duplicate-styles" component={DuplicateStyles}></Route> */}
      </Switch>
    </Suspense>
  </div>
);

export default Guide;
