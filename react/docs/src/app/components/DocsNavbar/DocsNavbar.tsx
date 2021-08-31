import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import StraightTracker from '../../../material-lite/react-cdk/StraightTracker';
import MlButton from '../../../material-lite/react/Button';

interface Props {
  routes?: string[];
  routeNames?: string[];
}

const DEFAULT_ROUTES = ['overview', 'reference', 'examples'];
const DEFAULT_ROUTE_NAMES = ['Overview', 'Reference', 'Examples'];

const DocsNavbar = (props: Props) => {
  const [activatedRoute, setActivatedRoute] = useState<string>();
  const [activatedRouteIndex, setActivatedRouteIndex] = useState<number>();

  const history = useHistory();

  const onChangeRoute = () => {
    const urls: string[] = history.location.pathname.split('/');
    const pathname = urls[urls.length - 1];

    setActivatedRoute(pathname);
    setActivatedRouteIndex((props.routes || DEFAULT_ROUTES).indexOf(pathname));
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(onChangeRoute, []);
  useEffect(onChangeRoute, [history.location])
  /* eslint-enable react-hooks/exhaustive-deps */

  const goToLink = (route: string) => {
    window.scrollTo({top:0});

    const urlArr: string[] = history.location.pathname.split('/');
    urlArr[urlArr.length - 1] = route;

    history.push(urlArr.join('/'));
  }

  return (
    <div className="docs-navbar">
      <StraightTracker targetIndex={activatedRouteIndex}>
        <span className="docs-navbar-tracker ml-primary-background"></span>
      </StraightTracker>

      {
        (props.routes || DEFAULT_ROUTES).map((route, i) => (
          <MlButton theme={route === activatedRoute ? 'primary' : ''} key={i}>
            <button onClick={() => goToLink(route)} className="docs-navbar-button">
              { (props.routeNames || DEFAULT_ROUTE_NAMES)[i] }
            </button>
          </MlButton>
        ))
      }
    </div>
  )
}

export default DocsNavbar;