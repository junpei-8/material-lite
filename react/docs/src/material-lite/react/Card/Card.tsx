import React, { Component } from 'react';
import './Card.scss';

import { classNamePipe, MlComponentProps } from '@material-lite/react-cdk/utils';

export interface MlCardProps extends MlComponentProps, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

class MlCard extends Component<MlCardProps> {
  private _classList = ['ml-card'];

  componentDidMount() {
    console.log(this.props.className);
    // const elRef = this.props.elementRef;
    // elRef!.current!.classList.add('ml-button');
  }

  onSetRippleOutlet(ref: HTMLDivElement) {
    console.log(ref, 'outlet');
  }

  render() {
    const { elementRef, children, className, ...rest } = this.props;

    return (
      <div {...rest} className={classNamePipe(this._classList)} ref={elementRef}>
        { children }
      </div>
    );
  }
}

export default MlCard;
