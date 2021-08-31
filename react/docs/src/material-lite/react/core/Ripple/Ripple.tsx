import React, { Component } from 'react';

import { classNamePipe, DirectiveProps } from '@material-lite/react-cdk/utils';

export interface MlRippleProps {
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
