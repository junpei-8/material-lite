import { CoreConfig, Falsy, FalsyObject, isFakeMousedownFromScreenReader, isFakeTouchstartFromScreenReader, listen, RunOutsideNgZone, setCoreConfig, styling } from '@material-lite/angular-cdk/utils';

styling.insert('.ml-ripple-outlet{position:relative;overflow:hidden}.ml-ripple-outlet:not(:empty){transform:translateZ(0)}.ml-ripple{transform:scale(0);transition-property:opacity,transform;transition-timing-function:cubic-bezier(0,0,.2,1);position:absolute;border-radius:50%;pointer-events:none;background:currentColor}.ml-overdrive{will-change:opacity;opacity:0;transition-property:opacity;transition-timing-function:cubic-bezier(0,0,.2,1);position:absolute;top:0;left:0;width:100%;height:100%;border-radius:0;pointer-events:none;background:currentColor}');

export type MlRippleOverdrive = {
  width: number;
  height: number;
} | true | Falsy;

export interface MlRippleAnimation {
  enter?: number;
  leave?: number;
}

export type MlRippleEntrance = 'center' | 'resonance' | 'default' | Falsy;

export type MlRippleCoreConfig = FalsyObject<{
  overdrive: MlRippleOverdrive;

  color: string;
  theme: string;

  radius: number;
  opacity: number;

  entrance: MlRippleEntrance;

  animation: MlRippleAnimation;

  fadeOutEvents: string[];
}>

export interface MlRippleElement extends HTMLElement {
  mlRippleEnterDuration: number;
}

interface IncompleteEventHandler {
  trigger: EventTarget;
  removePointerdownListener?: undefined;
  onMousedown?: undefined;
  onTouchstart?: undefined;
}

interface EventHandler {
  trigger: EventTarget;
  removePointerdownListener: () => void;
  onMousedown: (e: any) => void;
  onTouchstart: (e: any) => void;
}

const DEFAULT_FADEOUT_EVENTS = ['mouseup', 'touchend', 'pointerout'];

export class MlRippleCore {
  private _isEnabled: boolean;

  private _eventHandlers: (EventHandler | IncompleteEventHandler)[] = [];

  readonly activeRippleSize: number = 0;

  private _hasFiredTouchstart: boolean;

  private _outletElementRect: DOMRect | null;

  private _config: MlRippleCoreConfig;

  constructor(
    config: CoreConfig<MlRippleCoreConfig>,
    private _outletElement: HTMLElement,
    private _runOutsideNgZone: RunOutsideNgZone,
    private _createElement: Document['createElement'],
  ) {
    setCoreConfig(this, config);

    _outletElement.classList.add('ml-ripple-outlet');
  }

  setup(): void {
    if (this._isEnabled) { return; }
    this._isEnabled = true;

    const handlers = this._eventHandlers;
    const handlerLen = handlers.length;

    if (handlerLen) {
      this._runOutsideNgZone(() => {
        for (let i = 0; i < handlerLen; i++) {
          const handler = handlers[i];
          const trigger = handler.trigger;

          if (!handler.removePointerdownListener) {
            handlers[i] = this._createHandler(trigger);

          } else {
            trigger.addEventListener('mousedown', handler.onMousedown);
            trigger.addEventListener('touchstart', handler.onTouchstart);
          }
        }
      });
    }
  }

  teardown(): void {
    if (!this._isEnabled) { return; }
    this._isEnabled = false;

    const handlers = this._eventHandlers;
    const handlerLen = handlers.length;

    for (let i = 0; i < handlerLen; i++) {
      const removeListener = handlers[i].removePointerdownListener;
      if (removeListener !== void 0) {
        removeListener();
      }
    }
  }

  addTrigger(trigger: EventTarget): () => void {
    if (this._isEnabled) {
      const handlers = this._eventHandlers;
      const handler = this._createHandler(trigger);

      handlers.push(handler);

      return () => {
        handler.removePointerdownListener!();
        handlers.splice(handlers.indexOf(handler), 1);
      };

    } else {
      this.presetTrigger(trigger);

      return () => {
        const removeListener = this.getRemoveTriggerEvent(trigger);
        if (removeListener !== void 0) { removeListener(); }
      };
    }
  }

  presetTrigger(trigger: EventTarget): void {
    this._eventHandlers.push({ trigger });
  }

  getRemoveTriggerEvent(trigger: EventTarget): (() => void) | void {
    const handlers = this._eventHandlers;
    const handlerLen = handlers.length;

    for (let i = 0; i < handlerLen; i++) {
      const handler = handlers[i];

      if (handler.trigger === trigger) {
        const removeListener = handler.removePointerdownListener;
        return () => {
          if (removeListener !== void 0) { removeListener(); }
          handlers.splice(handlers.indexOf(handler), 1);
        };
      }
    }

    return;
  }

  removeAllTrigger(): void {
    this.teardown();
    this._eventHandlers = [];
  }

  private _createHandler(trigger: EventTarget): EventHandler {
    const onMousedown = (e: any) => this._onMousedown(e, trigger);
    const onTouchstart = (e: any) => this._onTouchstart(e, trigger);

    this._runOutsideNgZone(() => {
      trigger.addEventListener('touchstart', onTouchstart);
      trigger.addEventListener('mousedown', onMousedown);
    });

    const removePointerdownListener = () => {
      trigger.removeEventListener('touchstart', onTouchstart);
      trigger.removeEventListener('mousedown', onMousedown);
    };

    return { trigger, removePointerdownListener, onMousedown, onTouchstart };
  }

  private _onMousedown(event: MouseEvent, trigger: EventTarget): void {
    if (!this._hasFiredTouchstart && !isFakeMousedownFromScreenReader(event)) {
      this._onPointerEvent(event, trigger);
    }
  }

  private _onTouchstart(event: TouchEvent, trigger: EventTarget): void {
    if (!isFakeTouchstartFromScreenReader(event)) {
      this._hasFiredTouchstart = true;

      const touches = event.changedTouches;
      const len = touches.length;

      for (let i = 0; i < len; i++) {
        this._onPointerEvent(touches[i], trigger);
      }
    }
  }

  private _onPointerEvent(event: { clientX: number, clientY: number }, trigger: EventTarget): void {
    const conf = this._config;

    let overdrive = conf.overdrive === '' || conf.overdrive;

    if (overdrive && overdrive !== true) {
      const rect = this._outletElementRect || (this._outletElementRect = this._outletElement.getBoundingClientRect());

      const height = overdrive.height;
      const width = overdrive.width;
      overdrive = ((height && height <= rect.height) || (width && width <= rect.width)) as boolean;
    }

    const rippleEl = (overdrive)
      ? this.fadeInOverdrive()
      : this.fadeInRipple(event.clientX, event.clientY);

    this.autoFadeOutRipple(rippleEl, trigger);
  }

  /**
   * 通常のRippleを出現させる。
   *
   * @returns 出現させたRippleを削除するための専用のDOMを返す。
   * `Ripple`を削除させる方法は複数あるため、関数ではなく`Ripple`の要素を返し、柔軟に対応できるようしている。
   */
  fadeInRipple(x: number, y: number): MlRippleElement {
    // @ts-ignore
    const rippleEl: MlRippleElement = this._createElement('div');
    const rippleClassList = rippleEl.classList;

    rippleClassList.add('ml-ripple-element', 'ml-ripple');

    const outletEl = this._outletElement;
    const outletRect = this._outletElementRect || (this._outletElementRect = outletEl.getBoundingClientRect());

    const conf = this._config;

    if (conf.entrance === 'center') {
        x = outletRect.left + outletRect.width * 0.5;
        y = outletRect.top + outletRect.height * 0.5;

    } else if (conf.entrance === 'resonance') {
      const left = outletRect.left;
      const right = outletRect.right;
      x =
        (x < left)
          ? left
          : (x > right)
            ? right
            : x;

      const top = outletRect.top;
      const bottom = outletRect.bottom;
      y =
        (y < top)
          ? top
          : (y > bottom)
            ? bottom
            : y;
    }

    let radius: number;

    if (conf.radius) {
      radius = conf.radius;

    } else {
      const distX = Math.max(Math.abs(x - outletRect.left), Math.abs(x - outletRect.right));
      const distY = Math.max(Math.abs(y - outletRect.top), Math.abs(y - outletRect.bottom));
      radius = Math.sqrt(distX * distX + distY * distY);
      // radius = Math.sqrt(distX * distX + distY * distY) * (conf.radiusMagnification || 1);
    }

    // const enterDur = conf.animation?.enter || 448;
    const enterDur = (conf.animation || {}).enter || 448;

    rippleEl.mlRippleEnterDuration = enterDur;

    const size = radius * 2;
    let rippleStyle: string = `top:${y - outletRect.top - radius}px;left:${x - outletRect.left - radius}px;width:${size}px;height:${size}px;transition-duration:${enterDur}ms;opacity:${conf.opacity || 0.12}`;

    if (conf.theme) {
      rippleClassList.add(`ml-${conf.theme}-bg`);

    } else if (conf.color) {
      rippleStyle += `;background-color:${conf.color}`;
    }

    rippleEl.setAttribute('style', rippleStyle);
    outletEl.appendChild(rippleEl);

    // 以前はsetTimeoutを用いてscale(1)を反映指せていたが、スタイルの再計算・再取得を行うことでレンダリングしている。
    getComputedStyle(rippleEl).getPropertyValue('opacity');
    rippleEl.style.transform = 'scale(1)';
    // this._runOutsideNgZone(() => setTimeout(() => rippleEl.style.transform = 'scale(1)'));
  
    // @ts-expect-error: Assign to readonly variable
    this.activeRippleSize++;

    return rippleEl;
  }


  /**
   * 一瞬で広がる`Ripple`を出現させる。
   *
   * @returns 出現させたRippleを削除するためのトークン(DOM)を返す。
   */
  fadeInOverdrive(): MlRippleElement {
    // @ts-ignore
    const rippleEl = this._createElement('div') as MlRippleElement;
    const rippleClassList = rippleEl.classList;

    rippleClassList.add('ml-ripple-element', 'ml-overdrive');

    const conf = this._config;

    const enterDur = ((conf.animation || {}).enter || 400) * 0.4;
    let rippleStyle = `transition-duration:${enterDur}ms`;

    if (conf.theme) {
      rippleClassList.add(`ml-${conf.theme}-bg`);

    } else if (conf.color) {
      rippleStyle += `background-color: ${conf.color};`;
    }

    rippleEl.setAttribute('style', rippleStyle);
    this._outletElement.appendChild(rippleEl);

    // @ts-expect-error: Assign the readonly variable
    this.activeRippleSize++;

    getComputedStyle(rippleEl).getPropertyValue('opacity');
    rippleEl.style.opacity = (conf.opacity || 0.12) + '';
    // this._runOutsideNgZone(() => setTimeout(() => rippleEl.style.opacity = (conf.opacity || 0.12) + ''));

    rippleEl.mlRippleEnterDuration = enterDur;
    return rippleEl;
  }

  /**
   * Rippleを削除する。
   *
   * @param rippleElement `fadeInRipple`と`fadeInOverdrive`の戻り値。
   */
  fadeOutRipple(rippleElement: MlRippleElement): void {
    const conf = this._config;

    const leaveTiming = (conf.animation || {}).leave || 400;

    rippleElement.style.transitionDuration = leaveTiming + 'ms';
    rippleElement.style.opacity = '0';

    this._runOutsideNgZone(() => {
      setTimeout(() => {
        this._outletElement.removeChild(rippleElement);
        this._hasFiredTouchstart = false;

        // @ts-expect-error: Assign to readonly variable
        const count = (this.activeRippleSize -= 1);
        if (count === 0) {
          this._outletElementRect = null;
        }
      }, leaveTiming);
    });
  }

  /**
   * Rippleを自動で削除するアクションを追加する。
   *
   * @param rippleElement `fadeInRipple`と`fadeInOverdrive`の戻り値。
   * @param eventTarget 自動で
   */
  autoFadeOutRipple(rippleElement: MlRippleElement, target?: EventTarget): void {
    let listenerHasRemoved: boolean | undefined;
    let rippleHasEntered: boolean | undefined;

    const enterDur = rippleElement.mlRippleEnterDuration;
    if (enterDur) {
      this._runOutsideNgZone(() => {
        setTimeout(() => {
          (listenerHasRemoved)
            ? this.fadeOutRipple(rippleElement)
            : rippleHasEntered = true;
        }, enterDur);
      });

    } else {
      rippleHasEntered = true;
    }

    const conf = this._config;
    const eventNames = conf.fadeOutEvents || DEFAULT_FADEOUT_EVENTS;

    const nameLen = eventNames.length;
    if (nameLen) {
      const removeListenerEvents: (() => void)[] = [];

      const finalize = () => {
        const eventLen = removeListenerEvents.length;
        for (let i = 0; i < eventLen; i++) {
          removeListenerEvents[i]();
        }

        rippleHasEntered
          ? this.fadeOutRipple(rippleElement)
          : listenerHasRemoved = true;
      };

      const _target = target || this._outletElement;

      this._runOutsideNgZone(() => {
        for (let i = 0; i < nameLen; i++) {
          const name = eventNames[i];
          removeListenerEvents.push(listen(_target, name, finalize));
        }
      });

    } else {
      rippleHasEntered
        ? this.fadeOutRipple(rippleElement)
        : listenerHasRemoved = true;
    }
  }
}
