import React, { cloneElement, Component, ReactElement } from 'react';
import './StraightTracker.scss';

import { ComponentProps, FalsyObject } from '../utils';
import { MlStraightTrackerCore, MlStraightTrackerCoreConfig, MlStraightTrackerSizingMode, MlStraightTrackerTrackerState } from './straight-tracker-core';


export type MlStraightTrackerProps =
  ComponentProps &
  FalsyObject<{
    disabled: boolean,
    target: HTMLElement,
    targetIndex: number,
    sizingMode: MlStraightTrackerSizingMode,
    unobserveTarget: boolean,
    observeContainer: boolean
  }> & MlStraightTrackerCoreConfig &
  { children: ReactElement<any, any>, className?: string };


export type MlStraightTrackerState = MlStraightTrackerTrackerState;

export default class MlStraightTracker extends Component<MlStraightTrackerProps, MlStraightTrackerState> {
  core: MlStraightTrackerCore;
  private _coreFactory: (outletEl: HTMLElement) => MlStraightTrackerCore;

  private _initialized: boolean;
  
  constructor(props: MlStraightTrackerProps) {
    super(props);

    this.state = {
      className: 'ml-bottom-tracker',
      style: null
    }

    this.onLoadHostElement = this.onLoadHostElement.bind(this);

    this._coreFactory = (hostEl) =>
      new MlStraightTrackerCore(this.props, false, hostEl, this.setState.bind(this));
  }

  shouldComponentUpdate(nextProps: MlStraightTrackerProps, nextState: MlStraightTrackerState) {
    let prevProps: MlStraightTrackerProps;

    if (nextProps) {
      prevProps = this.props;

    } else {
      nextProps = this.props
      prevProps = { disabled: '' } as any;
    }

    let changes = nextProps.disabled;
    if (changes !== prevProps.disabled) {
      changes
        ? this.core.teardown()
        : this.core.setup();
    }

    const target = nextProps.target;
    const targetIndex = nextProps.targetIndex;
    if (target !== prevProps.target) {
      this.core.trackTargetByElement(target);

    } else if (targetIndex !== prevProps.targetIndex) {
      this.core.trackTargetByIndex(targetIndex);
    }

    changes = nextProps.unobserveTarget;
    if (changes !== prevProps.unobserveTarget) {
      this.core.switchTargetObserverState(!changes);
    }

    changes = nextProps.observeContainer;
    if (changes !== prevProps.observeContainer) {
      this.core.switchContainerObserverState(!!changes);
    }

    const hasChangedOrientation = prevProps.orientation !== nextProps.orientation;
    if (hasChangedOrientation || (prevProps.position !== nextProps.position)) {
      this.core.updateTrackerPosition(this._initialized && hasChangedOrientation);
    }

    return (this.state !== nextState);
  }

  componentDidMount() {
    this._initialized = true;
    this.core.onFirstUpdateBrothers();
  }

  onLoadHostElement(ref: HTMLDivElement) {
    const elementRef = this.props.elementRef;
    if (elementRef) { // @ts-ignore
      elementRef.current = ref;
    }

    if (this._coreFactory) {
      this.core = this._coreFactory(ref);
      this._coreFactory = null!;

      this.shouldComponentUpdate(null!, this.state);
    }
  }

  render() {
    const { children, className } = this.props;
    
    const trackerClassName = this.state.className;
    let childClassName = children.props.className as string;
    childClassName = childClassName
      ? `ml-tracker ${trackerClassName} ${childClassName}`
      : `ml-tracker ${trackerClassName}`;

    return (
      <div className={`ml-straight-tracker${className ? ' ' + className : ''}`} ref={this.onLoadHostElement}>
        { cloneElement(children, { ...children.props, className: childClassName, style: this.state.style }) }
      </div>
    )
  }
}
