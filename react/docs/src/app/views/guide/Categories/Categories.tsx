import React from 'react';
import { useHistory } from 'react-router-dom';

import MlCard from '../../../../material-lite/react/Card';

const Categories = () => {
  const history = useHistory();

  const navRoute = (name: string) => {
    history.push('/react/guide/' + name);
  }

  return (
    <div className="app-categories">
      <h1>Guide</h1>

      <MlCard variant="stroked" onClick={() => navRoute('getting-started')}>
        <div className="app-categories-title">Getting started</div>
      </MlCard>

      <MlCard variant="stroked" onClick={() => navRoute('theming')}>
        <div className="app-categories-title">Theming</div>
      </MlCard>

      <MlCard variant="stroked" onClick={() => navRoute('elevation-styles')}>
        <div className="app-categories-title">Elevation styles</div>
      </MlCard>

      <MlCard variant="stroked" onClick={() => navRoute('duplicate-styles')}>
        <div className="app-categories-title">Duplicate styles</div>
      </MlCard>

      <div className="ml-card"></div>
      <div className="ml-card"></div>
    </div>
  );
}

export default Categories;