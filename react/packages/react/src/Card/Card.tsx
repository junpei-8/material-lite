import React, { Component } from 'react';
import './Card.scss';

import { classNamePipe, ComponentProps, FalsyObject } from '@material-lite/react-cdk';

export type MlCardVariant = 'raised' | 'stroked';

export type MlCardProps =
  ComponentProps &
  FalsyObject<{
    variant: MlCardVariant;
  }> & JSX.IntrinsicElements['div'];

class MlCard extends Component<MlCardProps> {
  private _classList: string[];

  constructor(props: MlCardProps) {
    super(props);

    this.shouldComponentUpdate(null!);
  }

  shouldComponentUpdate(nextProps: MlCardProps) {
    let prevProps: MlCardProps;

    if (nextProps) {
      prevProps = this.props;

    } else {
      nextProps = this.props;
      prevProps = { variant: '' } as any ;
    }

    const variant = nextProps.variant;
    if (variant !== prevProps.variant) {
      this._classList = [
        'ml-card',
        'ml-' + (variant || 'raised') + '-card'
      ];
      return true;
    }

    return false;
  }

  render() {
    const { elementRef, children, className, ...rest } = this.props;

    return (
      <div {...rest} className={classNamePipe(this._classList, className)} ref={elementRef}>
        { children }
      </div>
    );
  }
}

export default MlCard;
