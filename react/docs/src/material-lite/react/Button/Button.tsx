import React, { Component, cloneElement } from 'react';
import './Button.scss';

import { Falsy, FalsyObject, DirectiveProps, classNamePipe } from '@material-lite/react-cdk/utils';
import { getRippleConfig, updateRippleConfig, MlRippleCore, RippleConfig } from '../core';
import { disableRipple, updateTheme, DisableRipple, Theme, ComponentBehavior } from '../core/common-behaviors';


export type MlButtonVariant = 'basic' | 'raised' | 'stroked' | 'flat' | 'fab' | 'icon';
export type MlButtonHoverAction = 'enabled' | 'disabled' | 'auto';


export type MlButtonProps =
  DirectiveProps &
  FalsyObject<{
    disabled: boolean;
    variant: MlButtonVariant;
    hoverAction: MlButtonHoverAction;
    wrappedAnchor: boolean;
  }> & DisableRipple.Props & Theme.Props & RippleConfig.Props;

type Behaviors = DisableRipple.Member & Theme.Member & RippleConfig.Member;
type PrivateBehaviors = Theme.PrivateNames | RippleConfig.PrivateNames;

const MlButtonComponent = Component as ComponentBehavior<MlButtonProps, DisableRipple.Method & Theme.Method & RippleConfig.Method>;

class MlButton extends MlButtonComponent implements Behaviors {
  readonly isButtonElement: boolean;

  _classList: Behaviors['_classList'];
  _themeClassIndex = 6;

  readonly rippleCore: MlRippleCore;
  private _rippleCoreFactory: ((outletEl: HTMLElement) => MlRippleCore) | null;

  _defaultRippleConfig: Behaviors['_defaultRippleConfig'] = {
    animation: {
      enter: 280,
      leave: 240
    }
  }

  _rippleConfig: Behaviors['_rippleConfig'] = {
    _dynamic: this._defaultRippleConfig!
  }

  private _overlayElement = (
    <span className="ml-button-overlay" key="ml-button-overlay" ref={this.onLoadRippleOutlet.bind(this)}>
      <span className="ml-button-hover"></span>
      <span className="ml-button-focus"></span>
    </span>
  );

  constructor(props: MlButtonProps) {
    super(props);

    const isButtonEl = this.isButtonElement = props.children.type === 'button';
    if (!isButtonEl) {
      this._haltDisabledEvents = this._haltDisabledEvents.bind(this);
    }

    this._rippleCoreFactory = (outletEl) =>
      new MlRippleCore(this._rippleConfig, true, outletEl);

    this.shouldComponentUpdate(null!);
  }

  onLoadRippleOutlet(ref: HTMLDivElement) {
    if (this._rippleCoreFactory) {
      const props = this.props;

      // @ts-expect-error: Assign to readonly variable
      const core = this.rippleCore = this._rippleCoreFactory(ref);
      this._rippleCoreFactory = null;

      core.presetTrigger(ref.parentElement!);

      if (!(props.disableRipple || props.disabled)) {
        core.setup();
      }
    }
  }

  shouldComponentUpdate(nextProps: MlButtonProps) {
    let needUpdateComponent = false;

    let prevProps: MlButtonProps;

    if (nextProps) {
      prevProps = this.props;

    } else {
      nextProps = this.props
      prevProps = { variant: '' } as any;
    }

    const { variant, hoverAction, disabled, wrappedAnchor } = nextProps;
    if (!(variant === prevProps.variant && hoverAction === prevProps.hoverAction)) {
      if (!variant || variant === 'basic') {
        this._classList = [
          'ml-button',
          'ml-basic-button',
          'ml-simple-button',
          this._enableHoverAction(hoverAction),
          disabled ? 'ml-disabled' : null,
          wrappedAnchor ? 'ml-anchor-button' : null,
        ];
        this._rippleConfig._dynamic.entrance = null;

      } else if (variant === 'raised') {
        this._classList = [
          'ml-button',
          'ml-raised-button',
          'ml-filled-button',
          this._disableHoverAction(hoverAction),
          disabled ? 'ml-disabled' : null,
          wrappedAnchor ? 'ml-anchor-button' : null,
        ];
        this._rippleConfig._dynamic.entrance = null;

      } else if (variant === 'icon') {
        this._classList = [
          'ml-button',
          'ml-icon-button',
          'ml-simple-button',
          this._disableHoverAction(hoverAction),
          disabled ? 'ml-disabled' : null,
          wrappedAnchor ? 'ml-anchor-button' : null,
        ];
        this._rippleConfig._dynamic.entrance = 'center';

      } else if (variant === 'fab') {
        this._classList = [
          'ml-button',
          'ml-fab',
          'ml-filled-button',
          this._disableHoverAction(hoverAction),
          disabled ? 'ml-disabled' : null,
          wrappedAnchor ? 'ml-anchor-button' : null,
        ];
        this._rippleConfig._dynamic.entrance = null;

      } else if (variant === 'flat') {
        this._classList = [
          'ml-button',
          'ml-flat-button',
          'ml-filled-button',
          this._disableHoverAction(hoverAction),
          disabled ? 'ml-disabled' : null,
          wrappedAnchor ? 'ml-anchor-button' : null,
        ];
        this._rippleConfig._dynamic.entrance = null;

      } else if (variant === 'stroked') {
        this._classList = [
          'ml-button',
          'ml-stroked-button',
          'ml-simple-button',
          this._enableHoverAction(hoverAction),
          disabled ? 'ml-disabled' : null,
          wrappedAnchor ? 'ml-anchor-button' : null,
        ];
        this._rippleConfig._dynamic.entrance = null;

      } else {
        this._classList = [
          'ml-button',
          'ml-basic-button',
          'ml-simple-button',
          this._enableHoverAction(hoverAction),
          disabled ? 'ml-disabled' : null,
          wrappedAnchor ? 'ml-anchor-button' : null,
        ];
        this._rippleConfig._dynamic.entrance = null;
      }
      needUpdateComponent = true;

    } else {
      const classList = this._classList;
      if (disabled !== prevProps.disabled) {
        classList[4] = disabled ? 'ml-disabled' : null;
        needUpdateComponent = true;
      }

      if (wrappedAnchor !== prevProps.wrappedAnchor) {
        classList[5] = wrappedAnchor ? 'ml-anchor-button' : null;
        needUpdateComponent = true;
      }
    }

    this.updateRippleConfig(nextProps.rippleConfig, prevProps.rippleConfig);

    if (this.updateTheme(nextProps.theme, prevProps.theme)) needUpdateComponent = true;

    if (this.disableRipple(disabled, prevProps.disabled) === void 0) {
      this.disableRipple(nextProps.disableRipple, prevProps.disableRipple);
    }

    return needUpdateComponent;
  }

  private _enableHoverAction(type: MlButtonHoverAction | Falsy): string | null {
    return type !== 'disabled'
      ? 'ml-hoverable-button'
      : null;
  }

  private _disableHoverAction(type: MlButtonHoverAction | Falsy): string | null {
    return type === 'enabled'
      ? 'ml-hoverable-button'
      : null;
  }

  private _haltDisabledEvents(event: Event): void {
    if (this.props.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  render() {
    const props = this.props;

    const child = props.children;

    let childProps = child.props;

    let grandchildren = childProps?.children;
    grandchildren = grandchildren
      ? [ ...Array.isArray(grandchildren) ? grandchildren : [grandchildren], this._overlayElement ]
      : this._overlayElement

    childProps = childProps
      ? { ...childProps, className: classNamePipe(this._classList, childProps.className) }
      : { className: classNamePipe(this._classList) }

    if (this.isButtonElement) {
      childProps.disabled = props.disabled;

    } else {
      const onClickEvent = childProps.onClick;
      childProps.onClick = onClickEvent
        ? (e: Event) => {
            onClickEvent(e);
            this._haltDisabledEvents(e);
          }
        : this._haltDisabledEvents;
    }

    return cloneElement(child, childProps, grandchildren);
  }
}

(() => {
  const proto = MlButton.prototype;
  proto.disableRipple = disableRipple;
  proto.updateTheme = updateTheme;
  proto.updateRippleConfig = updateRippleConfig;
  proto.getRippleConfig = getRippleConfig;
})();

export default MlButton as new (props: MlButtonProps) => (Omit<MlButton, PrivateBehaviors>);
