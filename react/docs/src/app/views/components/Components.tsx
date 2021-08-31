import React, { lazy, Suspense } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import MlButton from '../../../material-lite/react/Button';
import DocsSidenav from 'components/DocsSidenav';

const Categories = lazy(() => import('./Categories'));
const Button = lazy(() => import('./Button'));
const Card = lazy(() => import('./Card'));

const Components = () => (
  <div className="app-view">
    <DocsSidenav>
      <MlButton><Link to="/react/components/button">Button</Link></MlButton>
      <MlButton><Link to="/react/components/card">Card</Link></MlButton>
      {/* <MlButton><Link to="/react/components/ripple">Ripple</Link></MlButton> */}
    </DocsSidenav>

    <Suspense fallback>
      <Switch>
        <Route path="/react/components/categories" component={Categories}></Route>
        <Route path="/react/components/button" component={Button}></Route>  
        <Route path="/react/components/card" component={Card}></Route>
        {/* <Route path="/components/ripple" component={Ripple}></Route> */}
      </Switch>
    </Suspense>
  </div>
);

export default Components;
