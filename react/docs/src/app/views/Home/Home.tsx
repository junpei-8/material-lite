import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import MlButton from '../../../material-lite/react/Button';

const Home = () => {
  const ref = useRef<any>(null);

  const [className, setClassName] = useState('1');

  const changeClass = () => {
    if (className === '1') {
      setClassName('2');
    } else {
      setClassName('1');
    }
  }

  return(
    <div>
      <MlButton element={
        <button className={className} onClick={changeClass}>
          <span>SPAN</span>
        </button>
      }/>
    </div>
  )
};

export default Home;