import React from 'react';
import logo from './logo.svg';
import './App.css';

import { MlButton } from '@material-lite/react';
import { MlStraightTracker } from '@material-lite/react-cdk';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <MlButton>
          <div>test</div>
        </MlButton>
      </header>

    </div>
  );
}

export default App;
