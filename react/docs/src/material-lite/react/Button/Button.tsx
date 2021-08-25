import React, { Component } from 'react';
import './Button.scss';

import { createDirectiveProps, Falsy, FalsyObject, MlDirectiveProps } from '@material-lite/react-cdk/utils';


export type MlButtonVariant = 'basic' | 'raised' | 'stroked' | 'flat' | 'fab' | 'icon';
export type MlButtonHoverAction = 'enabled' | 'disabled' | 'auto';

export type MlButtonProps = MlDirectiveProps & FalsyObject<{
  disabled: boolean;
  variant: MlButtonVariant;
  hoverAction: MlButtonHoverAction;
  wrappedAnchor: boolean;
}>

class MlButton extends Component<MlButtonProps> {
  readonly isButtonElement: boolean;

  set setDisabled(isDisabled: true | Falsy) {
    // if (result) {
    //   this._classList.push('ml-disabled');
    //   // this.disableRipple = true;

    //   if (this.isButtonElement) {
    //     el.disabled = true;
    //   }

    // } else {
    //   this._classList.push('ml-disabled');
    //   // this.disableRipple = false;

    //   if (this.isButtonElement) {
    //     el.disabled = false;
    //   }
    // }
  }
  readonly disabled: boolean = false;

  private _classList: string[];

  private _overlayElement = (
    <span className="ml-button-overlay" key="ml-button-overlay" ref={this.onSetRippleOutlet}>
      <span className="ml-button-hover"></span>
      <span className="ml-button-focus"></span>
    </span>
  );

  constructor(props: MlButtonProps) {
    super(props);

    const element = props.element;
    console.log(element);

    // const isButtonEl = this.isButtonElement = el instanceof HTMLButtonElement;
    // if (!isButtonEl) {
    //   // const onClick = ;
    //   // if (el.props.onClick) {

    //   // }
    //   el.addEventListener('click', this._haltDisabledEvents.bind(this));
    // }
    
    this.shouldComponentUpdate(props);
  }

  onSetRippleOutlet(ref: HTMLDivElement) {
    console.log(ref, 'outlet');
  }

  componentDidMount() {
  }

  shouldComponentUpdate(nextProps: MlButtonProps) {
    const prevProps = this.props;

    let needSetVariant;

    if (needSetVariant) {
      const v = nextProps.variant;
      this._classList = [];

      if (!v || v === 'basic') {
        this._classList = [
          'ml-button',
          'ml-basic-button',
          'ml-simple-button',
        ];
        // this._rippleDynamicConfig._dynamic.entrance = null;
        this._enableHoverAction();

      } else if (v === 'raised') {
        this._classList = [
          'ml-button',
          'ml-raised-button',
          'ml-filled-button'
        ];
        // this._rippleDynamicConfig._dynamic.entrance = null;
        this._disableHoverAction();

      } else if (v === 'icon') {
        this._classList = [
          'ml-button',
          'ml-icon-button',
          'ml-simple-button'
        ];
        // this._rippleDynamicConfig._dynamic.entrance = 'center';
        this._disableHoverAction();

      } else if (v === 'fab') {
        this._classList = [
          'ml-fab',
          'ml-filled-button'
        ];
        // this._rippleDynamicConfig._dynamic.entrance = null;
        this._disableHoverAction();

      } else if (v === 'flat') {
        this._classList = [
          'ml-button',
          'ml-flat-button',
          'ml-filled-button'
        ];
        // this._rippleDynamicConfig._dynamic.entrance = null;
        this._disableHoverAction();

      } else if (v === 'stroked') {
        this._classList = [
          'ml-button',
          'ml-stroked-button',
          'ml-simple-button',
        ];
        // this._rippleDynamicConfig._dynamic.entrance = null;
        this._enableHoverAction();

      } else {
        this._classList = [
          'ml-button',
          'ml-basic-button',
          'ml-simple-button',
        ];
        // this._rippleDynamicConfig._dynamic.entrance = null;
        this._enableHoverAction();
      }
    }

    if (prevProps.disabled === nextProps.disabled) {
      
      
      needSetVariant = true;
    }

    return true;
  }

  private _enableHoverAction(): void {
    if (this.props.hoverAction !== 'disabled') {
      this._classList.push('ml-hoverable-button');
    }
  }

  private _disableHoverAction(): void {
    if (this.props.hoverAction === 'enabled') {
      this._classList.push('ml-hoverable-button');
    }
  }

  render() {
    const { element } = this.props;

    const [elProps, elChildren] = createDirectiveProps(element.props, this._classList);

    return React.cloneElement(
      element,
      elProps,
      [
        ...(elChildren || []),
        this._overlayElement
      ]
    )
  }
}

export default MlButton;
