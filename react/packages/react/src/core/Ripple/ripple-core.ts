import {
  CoreConfig,
  Falsy,
  FalsyObject,
  isFakeMousedownFromScreenReader,
  isFakeTouchstartFromScreenReader,
  listen,
  setCoreConfig,
} from '@material-lite/react-cdk';

export type MlRippleOverdrive = {
  width: number;
  height: number;
} | true | Falsy;

export interface MlRippleAnimation {
  enter?: number;
  leave?: number;
}

export type MlRippleEntrance = 'center' | 'resonance' | 'default' | Falsy;

export type MlRippleCoreConfig =
  FalsyObject<{
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
const createElement = (() => {
  const docs = document;
  return docs.createElement.bind(docs);
})();

export class MlRippleCore {
  private _isEnabled: boolean;
  readonly hasBeenSetup: boolean;

  private _eventHandlers: (EventHandler | IncompleteEventHandler)[] = [];

  readonly activeRippleSize: number = 0;

  private _hasFiredTouchstart: boolean;

  private _outletElementRect: DOMRect | null;

  private _createElement: Document['createElement'] = createElement;

  private _config: MlRippleCoreConfig;

  constructor(
    config: CoreConfig<MlRippleCoreConfig>,
    isDynamicConfig: boolean,
    private _outletElement: HTMLElement,
  ) {
    setCoreConfig(this, config, isDynamicConfig);
  }

  setup(): void {
    if (this._isEnabled) { return; }
    // @ts-expect-error: Assign the readonly variable
    this._isEnabled = this.hasBeenSetup = true;

    const handlers = this._eventHandlers;
    const handlerLen = handlers.length;

    if (handlerLen) {
      for (let i = 0; i < handlerLen; i++) {
        const handler = handlers[i];
        const trigger = handler.trigger;

        if (!handler.removePointerdownListener) {
          handlers[i] = this._createHandler(trigger);

        } else {
          trigger.addEventListener('touchstart', handler.onTouchstart, { passive: true });
          trigger.addEventListener('mousedown', handler.onMousedown);
        }
      }
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
    const onTouchstart = (e: any) => this._onTouchstart(e, trigger);
    const onMousedown = (e: any) => this._onMousedown(e, trigger);

    trigger.addEventListener('touchstart', onTouchstart, { passive: true });
    trigger.addEventListener('mousedown', onMousedown);

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

    let overdrive: MlRippleOverdrive | false = conf.overdrive;

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
   * ?????????Ripple?????????????????????
   *
   * @returns ???????????????Ripple?????????????????????????????????DOM????????????
   * `Ripple`??????????????????????????????????????????????????????????????????`Ripple`??????????????????????????????????????????????????????????????????
   */
  fadeInRipple(x: number, y: number): MlRippleElement {
    // @ts-ignore
    const rippleEl: MlRippleElement = this._createElement('div');
    const rippleClassList = rippleEl.classList;

    rippleClassList.add('ml-ripple-element');

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
      rippleClassList.add(`ml-${conf.theme}-background`);

    } else if (conf.color) {
      rippleStyle += `;background-color:${conf.color}`;
    }

    rippleEl.setAttribute('style', rippleStyle);
    outletEl.appendChild(rippleEl);

    // ?????????setTimeout????????????scale(1)?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    getComputedStyle(rippleEl).getPropertyValue('opacity');
    rippleEl.style.transform = 'scale(1)';
    // this._runOutsideNgZone(() => setTimeout(() => rippleEl.style.transform = 'scale(1)'));
  
    // @ts-expect-error: Assign to readonly variable
    this.activeRippleSize++;

    return rippleEl;
  }


  /**
   * ??????????????????`Ripple`?????????????????????
   *
   * @returns ???????????????Ripple????????????????????????????????????(DOM)????????????
   */
  fadeInOverdrive(): MlRippleElement {
    // @ts-ignore
    const rippleEl = this._createElement('div') as MlRippleElement;
    const rippleClassList = rippleEl.classList;

    rippleClassList.add('ml-overdrive-element');

    const conf = this._config;

    const enterDur = ((conf.animation || {}).enter || 400) * 0.4;
    let rippleStyle = `transition-duration:${enterDur}ms`;

    if (conf.theme) {
      rippleClassList.add(`ml-${conf.theme}-background`);

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
   * Ripple??????????????????
   *
   * @param rippleElement `fadeInRipple`???`fadeInOverdrive`???????????????
   */
  fadeOutRipple(rippleElement: MlRippleElement): void {
    const conf = this._config;

    const leaveTiming = (conf.animation || {}).leave || 400;

    rippleElement.style.transitionDuration = leaveTiming + 'ms';
    rippleElement.style.opacity = '0';

    setTimeout(() => {
      this._outletElement.removeChild(rippleElement);

      // @ts-expect-error: Assign to readonly variable
      const count = (this.activeRippleSize -= 1);
      if (count === 0) {
        this._hasFiredTouchstart = false;
        this._outletElementRect = null;
      }
    }, leaveTiming);
  }

  /**
   * Ripple?????????????????????????????????????????????????????????
   *
   * @param rippleElement `fadeInRipple`???`fadeInOverdrive`???????????????
   * @param eventTarget ?????????
   */
  autoFadeOutRipple(rippleElement: MlRippleElement, target?: EventTarget): void {
    let listenerHasRemoved: boolean | undefined;
    let rippleHasEntered: boolean | undefined;

    const enterDur = rippleElement.mlRippleEnterDuration;
    if (enterDur) {
      setTimeout(() => {
        (listenerHasRemoved)
          ? this.fadeOutRipple(rippleElement)
          : rippleHasEntered = true;
      }, enterDur);

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

      for (let i = 0; i < nameLen; i++) {
        const name = eventNames[i];
        removeListenerEvents.push(listen(_target, name, finalize));
      }

    } else {
      rippleHasEntered
        ? this.fadeOutRipple(rippleElement)
        : listenerHasRemoved = true;
    }
  }
};
