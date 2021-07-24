import {
  createLifecycleControllersFactory, LifecycleSubjectNexter, LifecycleObservableGetter,
  RunOutsideNgZone, TransitionClasses, TransitionType
} from 'src/material-lite/angular-cdk/utils';
import { MlPortalConfig, MlPortalContentRef, MlPortalContentType, MlPortalData } from './portal.service';

type lifecycleSubjectType = 'afterAttach' | 'beforeDetach' | 'afterDetach';
const useLifecycle = createLifecycleControllersFactory('afterAttach', 'beforeDetach', 'afterDetach');

export class MlPortalAttachedRef {
  readonly hasClosed: boolean = false;

  readonly data: Readonly<{
    outletKey: string | null;
    attachedOrder: number;
    contentType: MlPortalContentType;
    outletElement: HTMLElement;
    rootContentElement: Element;
    isFirstAttached: boolean;
  }>;

  private _animateRef: TransitionClasses['animate'];
  readonly animationConfig: NonNullable<MlPortalConfig['animation']>;

  private _lifecycleNexter: LifecycleSubjectNexter<lifecycleSubjectType>;
  lifecycle: LifecycleObservableGetter<lifecycleSubjectType>;

  private _boundedDetachEvent: () => void;

  constructor(
    contentType: MlPortalContentType,
    outletKey: string | null,
    attachedOrder: number,
    animationConfig: MlPortalConfig['animation'],
    private _contentRef: MlPortalContentRef,
    private _portalData: MlPortalData,
    private _runOutsideNgZone: RunOutsideNgZone,
  ) {
    this.data = {
      contentType,
      outletKey,
      attachedOrder,
      outletElement: _portalData.outletElement,
      get rootContentElement(): Element {
        return _contentRef.rootElement;
      },
      isFirstAttached: true
    };

    [this._lifecycleNexter, this.lifecycle] = useLifecycle();
    this.animationConfig = animationConfig || {};

    const detachEvent = this._boundedDetachEvent = this._detach.bind(this);
    this._portalData.detachEvents.push(detachEvent);
  }

  /**
   * `_contentRef`の中身を使用する必要がある処理はここで行う。
   * （`component`を`attach`するとき、`_contentRef`の中身が`new()`した段階では存在しないため。）
   */
  private _initialize(): this {
    this._animateRef = new TransitionClasses(this._contentRef.rootElement.classList).animateRef;

    this.animationConfig.cancelOnAttach
      ? this._lifecycleNexter.afterAttach()
      : this._animate('enter', () => this._lifecycleNexter.afterAttach());

    return this;
  }

  detach(): void {
    this._detach();
  }

  private _detach(hasDestroyedOutlet?: boolean): void {
    if (this.hasClosed) { return; }

    this._lifecycleNexter.beforeDetach();

    if (hasDestroyedOutlet) {
      const dur = this._portalData.destroyingOutletDuration;
      dur
        ? this._runOutsideNgZone(() =>
            setTimeout(() => this._animate('leave', () => this._afterDetach()), dur)
          )
        : this._afterDetach();

    } else {
      if (this.animationConfig.cancelOnDetach) {
        this._contentRef.destroy();
        this._afterDetach();

      } else {
        this._animate('leave', () => {
          this._contentRef.destroy();
          this._afterDetach();
        });
      }
    }

    const boundedDetachEvent = this._boundedDetachEvent;
    const detachEvents = this._portalData.detachEvents;
    let index = this.data.attachedOrder;

    while (0 <= index) {
      if (detachEvents[index] === boundedDetachEvent) {
        detachEvents.splice(index, 1);
        break;
      }

      index--;
    }

    // @ts-expect-error: Assign to readonly variable
    this.hasClosed = true;
  }

  private _afterDetach(): void {
    this._lifecycleNexter.afterDetach();

    const data = this.data;
    if (data.contentType === 'DOM') { // @ts-ignore
      data.rootContentElement.mlPortalAttachedRef = void 0;
    }
  }

  private _animate(type: TransitionType, onFinalize: () => void): void {
    const amtConf = this.animationConfig;
    const duration = amtConf[type];

    if (!duration) {
      onFinalize();
      return;
    }

    const className = amtConf.className;

    if (className) {
      this._runOutsideNgZone(() => {
        this._animateRef(type, className, duration)
          .then(() => onFinalize());
      });

    } else {
      this._runOutsideNgZone(() => setTimeout(onFinalize, duration));
    }
  }
}
