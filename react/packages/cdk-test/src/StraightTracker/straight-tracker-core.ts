import { noop, CoreConfig, setCoreConfig, Falsy, FalsyObject } from '@material-lite/react-cdk/utils';
import { Component } from 'react';

interface WH {
  width: number;
  height: number;
}

interface TL {
  top: number;
  left: number;
}

export type MlStraightTrackerPosition = 'before' | 'after';
export type MlStraightTrackerOrientation = 'horizontal' | 'vertical';
export interface MlStraightTrackerTransitionClasses {
  initializing?: boolean;
  starting?: boolean;
  finalizing?: boolean;
}
export type MlStraightTrackerCoreConfig = FalsyObject<{
  position: MlStraightTrackerPosition;
  orientation: MlStraightTrackerOrientation;
  // transitionClasses: MlStraightTrackerTransitionClasses;
}>;

export type MlStraightTrackerSizingMode = 'loose' | 'strict' | 'strict-origin' | 'strict-target-point';

const ZERO_ORIGIN = {
  left: 0,
  top: 0
};

export type MlStraightTrackerTrackerState = {
  className: string,
  style: {
    top: string,
    height: string,
    left?: undefined,
    width?: undefined
  } | {
    top?: undefined,
    height?: undefined,
    left: string,
    width: string,
  } | null;
}

export class MlStraightTrackerCore {
  private _isEnabled: boolean;

  private _hasUpdatedBrothers: boolean;
  private _onFirstUpdateBrothers: (() => void) | null;

  // 他の比較にに影響するため null を代入しておく
  readonly targetElement: HTMLElement | null = null;
  readonly targetIndex: number | null;

  private _targetElementBeforeTeardown: HTMLElement | null;

  private _resizeObserver?: ResizeObserver | null;

  readonly hasObservedContainer: boolean = false;
  readonly hasObservedTarget: boolean = true;
  private _unobserveTargetObserver: () => void = noop;

  private _originFactory: () => TL;
  private _targetPointFactory: () => TL;

  private _calledSetTrackerStyle: boolean;

  private _config: MlStraightTrackerCoreConfig;

  get brothersCollection(): HTMLCollection {
    return this._hostElement.parentElement!.children;
  }

  constructor(
    config: CoreConfig<MlStraightTrackerCoreConfig>,
    isDynamicConfig: boolean,
    private _hostElement: HTMLElement,
    private _setTrackerState: Component<any, MlStraightTrackerTrackerState>['setState']
  ) {
    setCoreConfig(this, config, isDynamicConfig);

    // _setTrackerClassList((state: string[]) => [...state, 'ml-bottom-tracker']);
    // _trackerElement.classList.add('ml-bottom-tracker');
    this.setSizingMode('strict');
  }

  /**
   * - `ResizeObserver`が存在する場合は、インスタンスを作成。
   * - 'initializing'の`Transition classes`を付与。
   */
  setup(): void {
    if (this._isEnabled) { return; }
    this._isEnabled = true;

    const ResizeObsClass = window.ResizeObserver;

    if (ResizeObsClass) {
      const resizeObs = this._resizeObserver =
        new ResizeObsClass(this._onResize.bind(this));

      if (this.hasObservedContainer) {
        resizeObs.observe(this._hostElement, { box: 'border-box' });
      }
    }

    if (this._hasUpdatedBrothers) {
      const onFirstUpdateBrothers = this._onFirstUpdateBrothers;

      if (onFirstUpdateBrothers) {
        onFirstUpdateBrothers();
        this._onFirstUpdateBrothers = null;
      }
    }

    const targetEl = this._targetElementBeforeTeardown;
    if (targetEl) {
      this.trackTargetByElement(targetEl);
      this._targetElementBeforeTeardown = null;
    }

    // const tsClasses = this._config.transitionClasses;
    // if (tsClasses && tsClasses.initializing) {
    //   this._oneFrameTransitionClasses('initializing');
    // }
  }

  teardown(): void {
    if (!this._isEnabled) { return; }
    this._isEnabled = false;

    const resizeObs = this._resizeObserver;
    if (resizeObs) {
      resizeObs.disconnect();
      this._resizeObserver = null;
    }

    this._targetElementBeforeTeardown = this.targetElement;
    this._completeTracking();
  }

  /**
   * `resizeObserver`が変更を感知したときに呼び出される関数。
   * 引数に渡される値から、`target`のサイズの情報だけをくり抜き、`setTrackerStyle`関数を呼び出す。
   */
  private _onResize(entries: ResizeObserverEntry[]): void {
    const targetEl = this.targetElement;
    if (!targetEl) { return; }

    const entry0 = entries[0];
    const entry1 = entries[1];

    let targetSize: WH | undefined;

    if (entry0.target === targetEl) {
      // @ts-ignore
      const base: ResizeObserverSize =
        entry0.borderBoxSize[0] || entry0.borderBoxSize;

      targetSize = {
        width: base.inlineSize,
        height: base.blockSize
      };

    } else if (entry1 && entry1.target === targetEl) {
      // @ts-ignore
      const base: ResizeObserverSize =
        entry0.borderBoxSize[0] || entry0.borderBoxSize;

      targetSize = {
        width: base.inlineSize,
        height: base.blockSize
      };
    }

    this.setTrackerStyle(
      this._originFactory(),
      this._targetPointFactory(),
      targetSize
    );
  }

  /**
   * 引数に代入された数から`target`を見つけ、追跡する。
   */
  trackTargetByIndex(index: number | Falsy): void {
     // brothers要素が取得できないときは、情報だけをスタックしておく
    if (!this._hasUpdatedBrothers) {
      if (index || index === 0) {
        this._onFirstUpdateBrothers =
          () => this.trackTargetByIndex(index);
      }

      return;

    } else if (!this._isEnabled) {
      return;

    } else if (!index && index !== 0) {
      this._completeTracking();
      return;
    }

    const brothers = this._hostElement.parentElement!.children;

    const hostElement = this._hostElement;

    let targetIndex = index;
    for (let i = 0; i <= index; i++) {
      if (brothers.item(i) === hostElement) {
        targetIndex++;
        break;
      }
    }

    const targetEl = brothers[targetIndex] as HTMLElement;

    if (!targetEl || this.targetElement === targetEl) {
      return; // 抽出されたターゲットが既に選択されている場合
    }

    this._trackTarget(targetEl, targetIndex);
  }


  /**
   * 引数に代入された要素が兄弟に存在しているかを確認し、存在した場合、追跡する。
   */
  trackTargetByElement(target: HTMLElement | Falsy): void {
    if (!this._hasUpdatedBrothers) {
      if (target) {
        this._onFirstUpdateBrothers =
          () => this.trackTargetByElement(target);
      }

      return;

    } else if (!this._isEnabled || this.targetElement === target) {
      return;

    } else if (!target) {
      this._completeTracking();
      return;
    }

    const brothers = this._hostElement.parentElement!.children;
    const broLen = brothers.length;

    let targetIndex = -1;
    for (let i = 0; i < broLen; i++) {
      if (brothers.item(i) === target) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex === -1) {
      return; // targetがbrothersに存在しない場合
    }

    this._trackTarget(target, targetIndex);
  }

  /**
   * `trackTargetByIndex`と`trackTargetByElement`の共通処理。
   *
   * - メンバ変数を更新
   * - `追跡される要素(`target`)に対して、`ResizeObserver`で監視できる場合は`observer`を追加し、
   *    できない場合は`target`のサイズを取得してトラッカーを動かす。
   * - 'starting'の`Transition classes`を付与。
   */
  private _trackTarget(targetEl: HTMLElement, targetIndex: number): void {
    this._calledSetTrackerStyle = false;

    // @ts-expect-error: Assign to readonly variable
    this.targetElement = targetEl; // @ts-expect-error
    this.targetIndex = targetIndex;

    const resizeObs = this._resizeObserver;
    if (resizeObs && this.hasObservedTarget) {
      this._unobserveTargetObserver();
      this._unobserveTargetObserver = () => resizeObs.unobserve(targetEl);

      resizeObs.observe(targetEl, { box: 'border-box' });

      setTimeout(() => {
        // ResizeObsは、obsしたときに '_onResize' メソッドが呼び出されない場合があるため、呼び出されたかどうかを確認し、
        // 呼び出されていいない場合は、選択されているトラッカーをもとにスタイリングする
        if (!this._calledSetTrackerStyle) {
          this.updateTrackerStyle();
        }
      });

    } else {
      this.updateTrackerStyle();
    }

    // const tsClasses = this._config.transitionClasses;
    // if (tsClasses && tsClasses.starting) {
    //   this._oneFrameTransitionClasses('starting');
    // }
  }

  private _completeTracking(): void {
    this._setTrackerState(({ className }) => ({ className, style: null }));

    // @ts-expect-error: Assign to readonly variable
    this.targetElement = null; this.targetIndex = null;
  }

  /**
   * 引数で代入された座標をもとに、trackerのstyleを変更する。
   *
   * - `orientation="vertical"`のとき => `height`, `top` のスタイルが付与。
   * - `orientation="horizontal"`のとき => `width`, `left` のスタイルが付与。
   */
  setTrackerStyle(origin: TL, targetPoint: TL, targetSize?: WH | undefined): void {
    this._calledSetTrackerStyle = true;

    const conf = this._config;

    if (conf.orientation === 'vertical') {
      this._setTrackerState(state => ({
        className: state.className,
        style: {
          top: `${targetPoint.top - origin.top}px`,
          height: targetSize ? `${targetSize.height}px` : state.style?.height!
        }
      }))

    } else {
      this._setTrackerState(state => ({
        className: state.className,
        style: {
          left: `${targetPoint.left - origin.left}px`,
          width: targetSize ? `${targetSize.width}px` : state.style?.width!
        }
      }))
    }
  }

  updateTrackerStyle(): void {
    const targetEl = this.targetElement;
    if (targetEl) {
      const origin = this._hostElement.getBoundingClientRect();
      const targetPoint = targetEl.getBoundingClientRect();

      this.setTrackerStyle(
        origin, targetPoint, targetPoint
      );
    }
  }

  /**
   * 設定してある変数をもとに、`top: 0`, `right: 0`, `left: 0`, `bottom: 0`が付与される`class`を切り替える。
   *
   * - `.ml-top-0`, `.ml-left-0` `.ml-right-0`, `.ml-bottom-0`
   */
  updateTrackerPosition(shouldUpdateStyle?: boolean): void {
    const conf = this._config;

    if (conf.orientation === 'vertical') {
      const className = (conf.position === 'before')
        ? 'ml-left-tracker'
        : 'ml-right-tracker';

      if (shouldUpdateStyle) {
        const targetEl = this.targetElement;
        if (targetEl) {
          const origin = this._hostElement.getBoundingClientRect();
          const targetPoint = targetEl.getBoundingClientRect();

          this._setTrackerState({
            className,
            style: {
              top: (targetPoint.y - origin.y) + 'px',
              height: (targetPoint.height) + 'px'
            }
          })
        }

      } else {
        this._setTrackerState(state => ({ ...state, className }));
      }


    } else {
      const className = (conf.position === 'before')
        ? 'ml-top-tracker'
        : 'ml-bottom-tracker';

      if (shouldUpdateStyle) {
        const targetEl = this.targetElement;
        if (targetEl) {
          const origin = this._hostElement.getBoundingClientRect();
          const targetPoint = targetEl.getBoundingClientRect();

          this._setTrackerState({
            className,
            style: {
              left: (targetPoint.x - origin.x) + 'px',
              width: (targetPoint.width) + 'px'
            }
          })
        }

      } else {
        this._setTrackerState(state => ({ ...state, className }))
      }
    }
  }

  onFirstUpdateBrothers(): void {
    this._hasUpdatedBrothers = true;

    if (this._isEnabled) {
      const onFirstUpdate = this._onFirstUpdateBrothers;

      if (onFirstUpdate) {
        onFirstUpdate();
        this._onFirstUpdateBrothers = null;
      }
    }
  }

  /**
   * 追跡される要素(`target`)を監視するか否かを切り替える
   */
  switchTargetObserverState(isEnabled: boolean): void {
    if (this.hasObservedTarget === isEnabled) { return; }

    // @ts-expect-error: Assign to readonly variable
    this.hasObservedTarget = isEnabled;

    const resizeObs = this._resizeObserver;
    if (resizeObs) {
      const targetEl = this.targetElement;

      if (isEnabled && targetEl) {
        this._unobserveTargetObserver();
        this._unobserveTargetObserver = () => resizeObs.unobserve(targetEl);

        resizeObs.observe(targetEl, { box: 'border-box' });

      } else {
        this._unobserveTargetObserver();
        this._unobserveTargetObserver = noop;
      }
    }
  }

  /**
   * コンテナを監視するか否かを切り替える
   */
  switchContainerObserverState(isEnabled: boolean): void {
    if (this.hasObservedContainer === isEnabled) { return; }

    // @ts-expect-error: Assign to readonly variable
    this.hasObservedContainer = isEnabled;

    const resizeObs = this._resizeObserver;
    if (resizeObs) {
      const containerEl = this._hostElement;

      isEnabled
        ? resizeObs.observe(containerEl, { box: 'border-box' })
        : resizeObs.unobserve(containerEl);
    }
  }


  /**
   * `setTrackerStyle`のサイズを取得する方法を変え、その関数を呼び出す`trackTarget`関数等に影響を及ぼす。
   * デフォルトで`loose`になっている。
   *
   * - `"loose" mode`
   *  `getBoundingRect()`関数を呼び出さないため処理は軽くなるが、"追跡される要素の座標"の詳しい値を求めることができない。
   *
   * - `"strict" mode`
   *  "原点の座標"と"追跡される要素の座標"を`getBoundingRect()`関数を使用して詳しい値を求める。"原点の座標"と"追跡される要素の座標"どちらも不確定の場合に選択する。
   *
   * - `"strict-origin" mode`
   *  "原点の座標"のみ、`getBoundingRect()`関数を使用して正確な値を求める。"原点の座標"が不確定だが、"追跡される要素の座標"が整数とわかっているときに選択するのがおすすめ。
   *
   * - `"strict-target-point" mode`
   *  "追跡される要素の座標"のみ、`getBoundingRect()`関数を使用して正確な値を求める。"追跡される要素の座標"が不確定だが、"原点の座標"が整数とわかっているときに選択するのがおすすめ。、
   */
  setSizingMode(mode: MlStraightTrackerSizingMode): void {
    switch (mode) {
      case 'loose':
        this._originFactory = () => ZERO_ORIGIN;
        this._targetPointFactory = () => createLoosePoint(this.targetElement!);
        break;

      case 'strict':
        this._originFactory = () => this._hostElement.getBoundingClientRect();
        this._targetPointFactory = () => this.targetElement!.getBoundingClientRect();
        break;

      case 'strict-origin':
        this._originFactory = () => this._hostElement.getBoundingClientRect();
        this._targetPointFactory = () => createLoosePoint(this.targetElement!);
        break;

      case 'strict-target-point':
        this._originFactory = () => createLoosePoint(this._hostElement);
        this._targetPointFactory = () => this.targetElement!.getBoundingClientRect();
    }
  }

  // private _oneFrameTransitionClasses(state: string): void {
  //   const name = 'ml-tracker-' + state;
  //   const trackerClassList = this._trackerElement.classList;
  //   trackerClassList.add(name);
  //   setTimeout(() => trackerClassList.remove(name), 16)
  // }
}

function createLoosePoint(element: HTMLElement): TL {
  return {
    left: element.offsetLeft,
    top: element.offsetTop,
  };
}
