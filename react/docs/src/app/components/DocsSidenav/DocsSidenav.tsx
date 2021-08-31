import React, { ReactNode } from 'react';
import { useState } from 'react';
import MlButton from '../../../material-lite/react/Button';

const DocsSidenav = (props: { children: ReactNode }) => {

  const [hasOpenedDrawer, setHasOpenedDrawer] = useState(false);

  const toggleDrawer = () => setHasOpenedDrawer(!hasOpenedDrawer);

  const closeDrawer = () => setHasOpenedDrawer(false);

  return (
    <div className={'docs-sidenav' + (hasOpenedDrawer ? ' opened' : '')}>
      <div className="docs-sidenav-overlay" onClick={closeDrawer}></div>

      <MlButton variant="flat" theme="primary">
        <button className="docs-sidenav-drawer-button" onClick={toggleDrawer}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        </button>
      </MlButton>

      <div className="docs-sidenav-content">
        <div className="docs-sidenav-content-wrapper" onClick={closeDrawer}>
          { props.children }
        </div>
      </div>
    </div>
  )
}

export default DocsSidenav;
