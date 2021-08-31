import React from 'react';
import { useHistory } from 'react-router-dom';

import MlCard from '../../../../material-lite/react/Card';

const Categories = () => {
  const history = useHistory();

  const navRoute = (name: string) => {
    history.push('/react/components/' + name);
  }

  return (
    <div className="app-categories">
      <h1>Components</h1>

      <MlCard variant="stroked" onClick={() => navRoute('button')}>
        <div className="app-categories-title">Button</div>
      </MlCard>

      <MlCard variant="stroked" onClick={() => navRoute('card')}>
        <div className="app-categories-title">Card</div>
      </MlCard>
{/* 
      <MlCard variant="stroked" onClick={() => navRoute('ripple')}>
        <div className="app-categories-title">Ripple</div>
      </MlCard> */}

      <div className="ml-card"></div>
      <div className="ml-card"></div>
    </div>
  );
}

export default Categories;