import { DOCUMENT } from '@angular/common';
import {
  Attribute,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef,
  Inject, Input, OnInit, Output, ViewChild, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Falsy, MlDocument, noop, RunOutsideNgZone, RUN_OUTSIDE_NG_ZONE } from 'src/material-lite/angular-cdk/utils';
import { mixinBundleFactory, mixinDisableRipple, mixinRippleDynamicConfig, mixinTabIndex, mixinTheme, MlRippleCore } from 'src/material-lite/angular/core';

export const ML_SLIDE_TOGGLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MlSlideToggle),
  multi: true
};

export class MlSlideToggleChange {
  constructor(
    public source: MlSlideToggle,
    public checked: boolean
  ) {}
}

const SlideToggleMixin = mixinBundleFactory(mixinDisableRipple, mixinRippleDynamicConfig, mixinTabIndex, mixinTheme);

let uniqueId: number = 0;

@Component({
  selector: 'ml-slide-toggle',
  exportAs: 'mlSlideToggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  providers: [ML_SLIDE_TOGGLE_VALUE_ACCESSOR],
  host: {
    class: 'ml-slide-toggle',
    tabindex: '-1',
    '[id]': 'id',
    '[attr.aria-label]': 'null',
    '[attr.aria-labelledby]': 'null',
    '[class.ml-checked]': 'checked',
    '[class.ml-slide-toggle-label-before]': 'labelPosition == "before"',
  },
  inputs: ['theme', 'tabIndex', 'disableRipple', 'rippleConfig'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MlSlideToggle extends SlideToggleMixin implements OnInit, ControlValueAccessor {
  private _onChange: (_: any) => any = noop;
  private _onTouched = this._onChange;

  @ViewChild('input') private _inputElement: ElementRef<HTMLInputElement>;

  @Input('disabled') set setDisabled(isDisabled: true | Falsy) {
    // @ts-expect-error: Assign to readonly variable
    const result = this.disabled =
      isDisabled || isDisabled === '';

    const el = this._elementRef.nativeElement;
    if (result) {
      el.classList.add('ml-disabled');
      el.removeAttribute('tabindex');
      this.disableRipple = true;

    } else {
      el.classList.remove('ml-disabled');
      el.tabIndex = -1;
      this.disableRipple = false;
    }
  }
  readonly disabled: boolean = false;

  private _uniqueId: string = `ml-slide-toggle-${++uniqueId}`;
  @Input('id') set setId(id: string | Falsy) {
    const result = id || this._uniqueId;

    // @ts-expect-error: Assign the readonly variable
    this.id = result; // @ts-expect-error
    this.inputId = result + '-input';
  }
  readonly id: string = this._uniqueId;
  readonly inputId: string;

  @Input('name') name: string;

  @Input('checked') set setChecked(isEnabled: true | Falsy) {
    // @ts-expect-error: Assign the readonly variable
    const result = this.checked =
      isEnabled || isEnabled === '';

    // @ts-ignore
    this.stringChecked = result + '';
  }
  readonly checked: boolean;
  readonly stringChecked: 'false' | 'true' = 'false';

  @Input('required') set setRequired(isEnabled: true | Falsy) {
    // @ts-ignore
    this.required = isEnabled || isEnabled === '';
  }
  readonly required: boolean = false;

  @Input() labelPosition: 'before' | 'after' = 'after';

  @Input('aria-label') ariaLabel: string | null = null;

  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  @Output('change') get changeEmitter(): EventEmitter<MlSlideToggleChange> {
    return this._changeEventEmitter || (this._changeEventEmitter = new EventEmitter());
  }
  private _changeEventEmitter?: EventEmitter<MlSlideToggleChange>;

  @Output('toggleChange') get toggleChangeEmitter(): EventEmitter<void> {
    return this._toggleChangeEmitter || (this._toggleChangeEmitter = new EventEmitter());
  }
  private _toggleChangeEmitter?: EventEmitter<void>;

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
    @Attribute('tabindex') tabIndex: string,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) _document: MlDocument,
    @Inject(RUN_OUTSIDE_NG_ZONE) runOutsideNgZone: RunOutsideNgZone
  ) {
    super();

    this.tabIndex = parseInt(tabIndex, void 0) || 0;

    const rippleConf = this._rippleDynamicConfig;

    rippleConf._dynamic = {
      entrance: 'center',
      radius: 20,
      animation: {
        enter: 160,
      }
    };

    this._rippleCoreFactory = (outletEl) =>
      new MlRippleCore(
        rippleConf, outletEl, runOutsideNgZone,
        _document.createElement.bind(_document), true
      );
  }

  ngOnInit(): void {
    if (this.rippleIsDisabled === void 0) {
      this.rippleCore.setup();
    }
  }

  _onChangeEvent(event: Event): void {
    event.stopPropagation();

    const toggleChangeEmitter = this._toggleChangeEmitter;
    if (toggleChangeEmitter) {
      toggleChangeEmitter.emit();
    }

    this.setChecked = this._inputElement.nativeElement.checked;

    this._emitChangeEvent();
  }

  _onInputClick(event: Event): void {
    event.stopPropagation();
  }

  toggle(): void {
    const currChecked = !this.checked;
    this.setChecked = currChecked;
    this._onChange(currChecked);
  }

  private _emitChangeEvent(): void {
    this._onChange(this.checked);

    const changeEmitter = this.changeEmitter;
    if (changeEmitter) {
      changeEmitter.emit(new MlSlideToggleChange(this, this.checked));
    }
  }

  /** Implemented as part of ControlValueAccessor. */
  writeValue(value: any): void {
    this.setChecked = !!value;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    // @ts-expect-error: Assign to readonly variable
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }

}
