import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import MlButton from '../../../material-lite/components/Button';

const Home = () => {
  const ref = useRef<any>(null);

  const [className, setClassName] = useState('1');

  useEffect(() => console.log(ref));

  const changeClass = () => {
    if (className === '1') {
      setClassName('2');
    } else {
      setClassName('1');
    }
  }

  return(
    <div>
      <MlButton className={className} elementRef={ref} onClick={changeClass}>Button</MlButton>
      <MlButton className={className} elementRef={ref}>Button</MlButton>
    </div>
  )
};

export default Home;