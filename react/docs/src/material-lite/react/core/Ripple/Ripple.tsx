import React, { Component } from 'react';

import { DirectiveProps, FalsyObject, noop } from '@material-lite/react-cdk/utils';
import { MlRippleCore, MlRippleCoreConfig } from './ripple-core';
import { cloneElement } from 'react';
import { TargetElement } from '@testing-library/user-event';

export type MlRippleTrigger = EventTarget | 'outlet';

export type MlRippleProps = 
  DirectiveProps &
  MlRippleCoreConfig &
  FalsyObject<{
    trigger: MlRippleTrigger
  }>

class MlRipple extends Component<MlRippleProps> {
  core: MlRippleCore;

  private _removeTriggerListener: () => void = noop;

  private _rootElement: TargetElement;
  onLoadRootElement(element: HTMLElement): void {
    if (element !== this._rootElement) {
      this.core = new MlRippleCore(this.props, false, element);
    }
  }

  constructor(props: MlRippleProps) {
    super(props);
    this.onLoadRootElement = this.onLoadRootElement.bind(this);
  }

  componentDidMount() {
    // const elRef = this.props.elementRef;
    // elRef!.current!.classList.add('ml-button');
  }

  shouldComponentUpdate(nextProps: MlRippleProps) {
    const prevProps = this.props;

    let needUpdateComponent = nextProps.children !== prevProps.children;

    const trigger = nextProps.trigger;
    if (trigger !== prevProps.trigger) {
      this._removeTriggerListener();

      if (trigger) {
        const entryTrigger = trigger === 'outlet'
          ? this._rootElement
          : trigger;
  
        this._removeTriggerListener =
          this.core.addTrigger(entryTrigger);
  
      } else {
        this._removeTriggerListener = noop;
      }

      needUpdateComponent = true;
    }

    return needUpdateComponent;
  }


  render() {
    const child = this.props.children;

    let childProps = child.props;
    if (childProps) {
      const propsRef = childProps.ref;
      const ref = propsRef // @ts-ignore
        ? (ref: any) => { propsRef.current = ref; this.onLoadRootElement(ref) }
        : this.onLoadRootElement;

      const propsClassName = childProps.className;
      childProps = {
        ...childProps, ref,
        className: 'ml-ripple' + (propsClassName ? ' ' + propsClassName : ''),
      }

    } else {
      childProps = { className: 'ml-ripple', ref: this.onLoadRootElement }
    }

    return cloneElement(child, child.props);
  }
}

export default MlRipple;
