import React, { Component } from 'react';
import './Card.scss';

import { classNamePipe, MlComponentProps } from '@material-lite/react-cdk/utils';

export interface MlRippleProps extends MlComponentProps {
}

class MlRipple extends Component<MlRippleProps> {
  componentDidMount() {
    // const elRef = this.props.elementRef;
    // elRef!.current!.classList.add('ml-button');
  }

  onSetRippleOutlet(ref: HTMLDivElement) {
    console.log(ref, 'outlet');
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default MlRipple;
