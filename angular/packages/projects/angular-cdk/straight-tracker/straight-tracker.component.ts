import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit, ChangeDetectionStrategy, Component, ElementRef,
  Inject, Input, OnChanges, OnInit, SimpleChange, ViewChild, ViewEncapsulation
} from '@angular/core';
import { Falsy, MlDocument, RunOutsideNgZone, RUN_OUTSIDE_NG_ZONE } from '@material-lite/angular-cdk/utils';
import {
  MlStraightTrackerCore, MlStraightTrackerOrientation, MlStraightTrackerPosition, MlStraightTrackerSizingMode,
  MlStraightTrackerTransitionClasses
} from './straight-tracker-core';

export interface MlStraightTrackerTransition {
  property?: string;
  duration?: string;
  timingFunction?: string;
  delay?: string;
}

type Changes = {
  position: SimpleChange;
  orientation: SimpleChange;
};

@Component({
  selector: 'ml-straight-tracker',
  exportAs: 'mlStraightTracker',
  template: '<div #trackerElement class="ml-tracker" [style.transition]="transition"><ng-content></ng-content></div>',
  styles: ['ml-straight-tracker{width:100%;height:100%;position:absolute;top:0;left:0;pointer-events:none}.ml-tracker{position:absolute;transition-timing-function:cubic-bezier(0.35, 0, 0.25, 1);pointer-events:auto;z-index:1;}.ml-top-tracker{top:0}.ml-right-tracker{right:0}.ml-bottom-tracker{bottom:0}.ml-left-tracker{left:0}'],
  host: {
    class: 'ml-straight-tracker'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MlStraightTracker implements OnInit, OnChanges, AfterContentInit {
  core: MlStraightTrackerCore;
  private _coreFactory: ((trackerEl: HTMLElement) => MlStraightTrackerCore) | null;

  private _initialized: boolean = false;

  private _trackerElementRef: ElementRef<HTMLElement>;
  @ViewChild('trackerElement', { static: true })
  private set _setCore(elementRef: ElementRef<HTMLElement>) {
    this._trackerElementRef = elementRef;

    this.core = this._coreFactory!(elementRef.nativeElement);
    this._coreFactory = null;
  }

  @Input('disabled') set setDisabled(isDisabled: true | Falsy) {
    // @ts-expect-error: Assign to readonly variable
    const result = this.disabled =
      isDisabled || isDisabled === '';

    result
      ? this.core.teardown()
      : this.core.setup();
  }
  readonly disabled: boolean;

  @Input('target') set setTarget(target: HTMLElement | Falsy) {
    this.core.trackTargetByElement(target);
  }

  @Input('targetIndex') set setTargetIndex(targetIndex: number | Falsy) {
    this.core.trackTargetByIndex(targetIndex);
  }

  @Input() position: MlStraightTrackerPosition | Falsy;
  @Input() orientation: MlStraightTrackerOrientation | Falsy;
  @Input() transitionClasses: MlStraightTrackerTransitionClasses | Falsy;

  private _transitionsStack: string | MlStraightTrackerTransition | Falsy;
  @Input('transition') set setTransition(style: string | MlStraightTrackerTransition | Falsy) {
    const el = this._trackerElementRef?.nativeElement;

    if (el) {
      const styleRef = el.style;
      const _style = style || ({} as MlStraightTrackerTransition);

      if (typeof _style === 'string') {
        styleRef.transition = _style;

        if (typeof this.transition === 'object') {
          styleRef.transitionProperty = null!;
          styleRef.transitionDuration = null!;
          styleRef.transitionTimingFunction = null!;
          styleRef.transitionDelay = null!;
        }
      } else {
        styleRef.transitionProperty = _style.property || null!;
        styleRef.transitionDuration = _style.duration || null!;
        styleRef.transitionTimingFunction = _style.timingFunction || null!;
        styleRef.transitionDelay = _style.delay || null!;

        if (typeof this.transition === 'string') {
          styleRef.transition = null!;
        }
      }

      // @ts-expect-error: Assign the readonly variable
      this.transition = style;

    } else {
      this._transitionsStack = style;
    }
  }
  readonly transition: string | MlStraightTrackerTransition;

  @Input('sizingMode')
  set setSizingMode(mode: MlStraightTrackerSizingMode) {
    this.core.setSizingMode(mode);

    // @ts-expect-error: Assign the readonly variable
    this.sizingMode = mode;
  }
  readonly sizingMode: MlStraightTrackerCore;

  @Input('unobserveTarget')
  set setTargetToUnobserved(isEnabled: true | Falsy) {
    const result = isEnabled || isEnabled === '';

    this.core.switchTargetObserverState(!result);
  }

  /**
   * コンテナ(親)要素に`ResizeObserver`を追加するかどうか。
   */
  @Input('observeContainer')
  set setContainerToObserved(isEnabled: true | Falsy) {
    const result = isEnabled || isEnabled === '';

    this.core.switchContainerObserverState(result);
  }

  constructor(
    _elementRef: ElementRef<HTMLElement>,
    @Inject(RUN_OUTSIDE_NG_ZONE) _runOutsideNgZone: RunOutsideNgZone,
    @Inject(DOCUMENT) _document: MlDocument
  ) {
    this._coreFactory = (trackerEl) =>
      new MlStraightTrackerCore(
        this, _elementRef.nativeElement, trackerEl,
        _runOutsideNgZone, _document.createElement.bind(_document)
      );
  }

  ngOnInit(): void {
    if (this.disabled === void 0) {
      this.setDisabled = false;
    }

    const stack = this._transitionsStack;
    if (stack) {
      this.setTransition = stack;
      this._transitionsStack = null;
    }

    this._initialized = true;
  }

  ngOnChanges(changes: Changes): void {
    const orientationChanges = !!changes.orientation;

    if (orientationChanges || changes.position) {
      this.core.updateTrackerPosition(this._initialized && orientationChanges);
    }
  }

  ngAfterContentInit(): void {
    this.core.onFirstUpdateBrothers();
  }
}

