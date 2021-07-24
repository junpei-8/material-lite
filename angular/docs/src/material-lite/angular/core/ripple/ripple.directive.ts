import { Directive, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Falsy, MlDocument, noop, RunOutsideNgZone, RUN_OUTSIDE_NG_ZONE } from 'src/material-lite/angular-cdk/utils';
import { MlRippleAnimation, MlRippleCore, MlRippleEntrance, MlRippleOverdrive } from './ripple-core';


@Directive({
  selector: '[mlRipple]',
  exportAs: 'mlRipple'
})
export class MlRipple implements OnInit {
  core: MlRippleCore;

  @Input('mlRippleDisabled') set setDisabled(isDisabled: true | Falsy) {
    // @ts-expect-error: Assign to readonly variable
    const result = this.disabled =
      isDisabled || isDisabled === '';

    result
      ? this.core.teardown()
      : this.core.setup();
  }
  readonly disabled: boolean;

  @Input('mlRippleOverdrive') overdrive: MlRippleOverdrive | Falsy;

  @Input('mlRippleColor') color: string | Falsy;

  @Input('mlRippleTheme') theme: string | Falsy;

  @Input('mlRippleOpacity') opacity: number | Falsy;

  @Input('mlRippleRadius') radius: number | Falsy;

  @Input('mlRippleAnimation') animation: MlRippleAnimation | Falsy;

  @Input('mlRippleEntrance') entrance: MlRippleEntrance | Falsy;

  @Input('mlRippleFadeOutEvents') fadeOutEvents: string[] | Falsy;

  @Input('mlRippleTrigger') set setTrigger(trigger: EventTarget | 'outlet' | Falsy) {
    this._removeTriggerListener();

    if (trigger) {
      // @ts-expect-error: Assign the readonly variable
      const entryTrigger = this.trigger =
        trigger === 'outlet'
          ? this._elementRef.nativeElement
          : trigger;

      this._removeTriggerListener =
        this.core.addTrigger(entryTrigger);

    } else {
      // @ts-expect-error: Assign the readonly variable
      this.trigger = null;
      this._removeTriggerListener = noop;
    }
  }
  readonly trigger: EventTarget | null;
  private _removeTriggerListener: () => void = noop;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) _document: MlDocument,
    @Inject(RUN_OUTSIDE_NG_ZONE) runOutsideNgZone: RunOutsideNgZone,
  ) {
    this.core =
      new MlRippleCore(
        this, _elementRef.nativeElement, runOutsideNgZone,
        _document.createElement.bind(_document)
      );
  }

  ngOnInit(): void {
    if (this.disabled === void 0) {
      this.setDisabled = false;
    }

    if (this.trigger === void 0) {
      this.setTrigger = 'outlet';
    }
  }
}
