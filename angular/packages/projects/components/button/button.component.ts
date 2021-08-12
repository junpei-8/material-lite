import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, ElementRef, Inject,
  Input, OnChanges, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import { RunOutsideNgZone, RUN_OUTSIDE_NG_ZONE, Falsy, MlDocument } from '@material-lite/angular-cdk/utils';
import { mixinBundleFactory, mixinDisableRipple, mixinRippleDynamicConfig, mixinTheme, MlRippleCore, theming } from '@material-lite/angular/core';

export type MlButtonVariant = 'basic' | 'raised' | 'stroked' | 'flat' | 'fab' | 'icon';
export type MlButtonHoverAction = 'enabled' | 'disabled' | 'auto';

theming.set({
  theme: (theme) => `.ml-button.ml-disabled{color:${theme.disabledText} !important}.ml-filled-button{background-color:${theme.secondaryContainer}}.ml-filled-button.ml-disabled{background-color:${theme.disabledContainer} !important}.ml-stroked-button{border-color:${theme.divider} !important}`,
  palette: (name, color, contrast) => `.ml-simple-button.ml-${name}{color:${color}}.ml-filled-button.ml-${name}{background-color:${color};color:${contrast}}`
});

/*
<theme>
.ml-button.ml-disabled {
  color: ${theme.disabledText} !important;
}
.ml-filled-button {
  background-color: ${theme.secondaryContainer};
}
.ml-filled-button.ml-disabled {
  background-color: ${theme.disabledContainer} !important;
}
.ml-stroked-button {
  border-color: ${theme.divider} !important;
}

<palette>
.ml-simple-button.ml-${name} {
  color: ${color};
}
.ml-filled-button.ml-${name} {
  background-color: ${color};
  color: ${contrast};
}
*/

const ButtonMixin = mixinBundleFactory(mixinDisableRipple, mixinRippleDynamicConfig, mixinTheme);

@Component({
  selector: '[mlButton]',
  exportAs: 'mlButton',
  templateUrl: './button.component.html',
  inputs: ['theme', 'disableRipple', 'rippleConfig'],
  host: {class: 'ml-button'},
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MlButton extends ButtonMixin implements OnInit, OnChanges {
  readonly isButtonElement: boolean;

  private _needSetVariant: boolean = true;

  private _currentClassList: string[] = [];

  @Input('disabled') set setDisabled(isDisabled: true | Falsy) {
    // @ts-expect-error Assign to readonly variable
    const result = this.disabled =
      isDisabled || isDisabled === '';

    const el = this._elementRef.nativeElement as HTMLButtonElement;

    if (result) {
      el.classList.add('ml-disabled');
      this.disableRipple = true;

      if (this.isButtonElement) {
        el.disabled = true;
      }

    } else {
      el.classList.remove('ml-disabled');
      this.disableRipple = false;

      if (this.isButtonElement) {
        el.disabled = false;
      }
    }
  }
  readonly disabled: boolean = false;

  @Input('variant') set setVariant(variant: MlButtonVariant) {
    // @ts-expect-error Assign to readonly variable
    this.variant = variant;
    this._needSetVariant = true;
  }
  readonly variant: MlButtonVariant;

  @Input('hoverAction') set setHoverAction(type: MlButtonHoverAction) {
    // @ts-expect-error Assign to readonly variable
    this.hoverAction = type;
    this._needSetVariant = true;
  }
  readonly hoverAction: MlButtonHoverAction;

  @Input('wrappedAnchor') set setAnchorToWrapped(isEnabled: true | Falsy) {
    // @ts-expect-error Assign to readonly variable
    const result = this.hasWrappedAnchor =
      isEnabled || isEnabled === '';

    const classList = this._elementRef.nativeElement.classList;

    result
      ? classList.add('ml-anchor-button')
      : classList.remove('ml-anchor-button');
  }
  readonly hasWrappedAnchor: boolean;

  readonly rippleCore: MlRippleCore;
  private _rippleCoreFactory: ((outletEl: HTMLElement) => MlRippleCore) | null;

  @ViewChild('mlRippleOutlet', { static: true })
  private set _setRippleCore(outletElementRef: ElementRef<HTMLElement>) {
    // @ts-expect-error: Assign to readonly variable
    const core = this.rippleCore = this._rippleCoreFactory(outletElementRef.nativeElement);
    this._rippleCoreFactory = null;

    core.presetTrigger(this._elementRef.nativeElement);
  }

  constructor(
    protected _elementRef: ElementRef<HTMLElement>,
    @Inject(RUN_OUTSIDE_NG_ZONE) runOutsideNgZone: RunOutsideNgZone,
    @Inject(DOCUMENT) _document: MlDocument,
  ) {
    super();

    const el = this._elementRef.nativeElement;

    const isButtonEl = this.isButtonElement = el instanceof HTMLButtonElement;
    if (!isButtonEl) {
      el.addEventListener('click', this._haltDisabledEvents.bind(this));
    }

    const dynamicConfig = this._rippleDynamicConfig;
    dynamicConfig._dynamic.animation = {
      enter: 280,
      leave: 240
    }

    this._rippleCoreFactory = (outletEl) =>
      new MlRippleCore(
        dynamicConfig, outletEl, runOutsideNgZone,
        _document.createElement.bind(_document)
      );
  }

  ngOnInit(): void {
    // Rippleが設定されていないとき
    if (this.rippleIsDisabled === void 0) {
      this.rippleCore.setup();
    }

    this.ngOnChanges();
  }

  ngOnChanges(): void {
    if (this._needSetVariant) {
      this._needSetVariant = false;

      const hostClassList = this._elementRef.nativeElement.classList;
      const v = this.variant;
      hostClassList.remove(...this._currentClassList);

      if (!v || v === 'basic') {
        this._currentClassList = [
          'ml-basic-button',
          'ml-simple-button',
        ];
        this._rippleDynamicConfig._dynamic.entrance = null;
        this._enableHoverAction();

      } else if (v === 'raised') {
        this._currentClassList = [
          'ml-raised-button',
          'ml-filled-button'
        ];
        this._rippleDynamicConfig._dynamic.entrance = null;
        this._disableHoverAction();

      } else if (v === 'icon') {
        this._currentClassList = [
          'ml-icon-button',
          'ml-simple-button'
        ];
        this._rippleDynamicConfig._dynamic.entrance = 'center';
        this._disableHoverAction();

      } else if (v === 'fab') {
        this._currentClassList = [
          'ml-fab',
          'ml-filled-button'
        ];
        this._rippleDynamicConfig._dynamic.entrance = null;
        this._disableHoverAction();

      } else if (v === 'flat') {
        this._currentClassList = [
          'ml-flat-button',
          'ml-filled-button'
        ];
        this._rippleDynamicConfig._dynamic.entrance = null;
        this._disableHoverAction();

      } else if (v === 'stroked') {
        this._currentClassList = [
          'ml-stroked-button',
          'ml-simple-button',
        ];
        this._rippleDynamicConfig._dynamic.entrance = null;
        this._enableHoverAction();

      } else {
        this._currentClassList = [
          'ml-basic-button',
          'ml-simple-button',
        ];
        this._rippleDynamicConfig._dynamic.entrance = null;
        this._enableHoverAction();
      }

      hostClassList.add(...this._currentClassList);
    }
  }

  private _enableHoverAction(): void {
    if (this.hoverAction !== 'disabled') {
      this._currentClassList.push('ml-hoverable-button');
    }
  }

  private _disableHoverAction(): void {
    if (this.hoverAction === 'enabled') {
      this._currentClassList.push('ml-hoverable-button');
    }
  }

  private _haltDisabledEvents(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
