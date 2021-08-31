import React, { lazy, Suspense } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import MlButton from '../../../material-lite/react/Button';
import DocsSidenav from 'components/DocsSidenav';

const Categories = lazy(() => import('./Categories'));

const CDK = () => (
  <div className="app-view">
    <DocsSidenav>
      <MlButton><Link to="/react/cdk/straight-tracker">Straight tracker</Link></MlButton>
    </DocsSidenav>

    <Suspense fallback>
      <Switch>
        <Route path='/cdk/categories' component={Categories}></Route>
      </Switch>
    </Suspense>
  </div>
);

export default CDK;
