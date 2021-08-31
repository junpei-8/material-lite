import React from 'react';
import { useHistory } from 'react-router-dom';

import MlCard from '../../../../material-lite/react/Card';

const Categories = () => {
  const history = useHistory();

  const navRoute = (name: string) => {
    history.push('/react/cdk/' + name);
  }

  return (
    <div className="app-categories">
      <h1>Categories</h1>

      <MlCard variant="stroked" onClick={() => navRoute('straight-tracker')}>
        <div className="app-categories-title">Straight-tracker</div>
      </MlCard>

      <div className="ml-card"></div>
      <div className="ml-card"></div>
      <div className="ml-card"></div>
    </div>
  );
}

export default Categories;
