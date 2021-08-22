import {
  Directive, ElementRef, EventEmitter, Input, OnChanges,
  OnDestroy, Output, SimpleChange, ViewContainerRef
} from '@angular/core';
import { Falsy } from '@material-lite/angular-cdk/utils';
import { MlPortalAttachedRef } from './portal-attached-ref';
import { MlPortal, MlPortalConfig, MlPortalContent, MlPortalData } from './portal.service';


export type MlPortalPrivateAttachedRef = Omit<MlPortalAttachedRef, 'detach'>;

type Changes = {
  content: SimpleChange;
  key: SimpleChange;
};
@Directive({
  selector: 'ng-template[mlPortal]',
  exportAs: 'mlPortal'
})
export class MlPortalOutlet implements OnChanges, OnDestroy {
  @Input('mlPortal') content: MlPortalContent | Falsy;

  @Input('mlPortalConfig') config: MlPortalConfig | Falsy;

  @Input('mlPortalKey') key: string | Falsy = null;
  get isPrivate(): boolean {
    return !this.key;
  }

  @Input('mlPortalDestroyingDuration')
  set setOutletDestroyingDuration(duration: number | Falsy) {
    this.portalData.destroyingOutletDuration = duration;
  }
  get destroyingDuration(): number {
    return this.portalData.destroyingOutletDuration || 0;
  }

  private _attachEmitter: EventEmitter<MlPortalPrivateAttachedRef>;
  @Output('mlPortalAttach') get attachEmitter(): EventEmitter<MlPortalPrivateAttachedRef> {
    return this._attachEmitter || (this._attachEmitter = new EventEmitter());
  }
  readonly attachedRef: MlPortalAttachedRef | null;

  readonly portalData: MlPortalData;

  private _hasInitialized: boolean;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    viewContainerRef: ViewContainerRef,
    private _portal: MlPortal
  ) {
    this.portalData = {
      outletElement: elementRef.nativeElement.parentElement!,
      viewContainerRef,
      detachEvents: []
    };
  }

  private _initialize(): void {
    const key = this.key;
    if (key) {
      if (this._portal.hasPortalData(key)) {
        throw new Error(`
          "mlPortalOutletKey"変数に代入した値はすでに使用されています。重複していない"key"を代入してください。

          1. "[mlPortalOutlet](directive) > [mlPortalOutletKey](@Input)"に値が代入されたとき
        `);

      } else {
        this._portal.setPortalData(key, this.portalData);
      }
    }

    this._hasInitialized = true;
  }

  ngOnChanges(changes: Changes): void {
    let change: SimpleChange;

    /** @changes key */
    change = changes.key;
    if (change) {
      if (this._hasInitialized) {
        this.ngOnDestroy();
      }

      this._initialize();
    }

    /** @changes content */
    change = changes.content;
    if (change) {
      this.attachedRef?.detach();

      const content: MlPortalContent = change.currentValue;
      if (content) {
        if (!this._hasInitialized) {
          this._initialize();
        }

        // @ts-expect-error: Assign to readonly variable
        const attachedRef = this.attachedRef =
          this._portal.attach(content, this.key || this.portalData, this.config || {});

        if (this._attachEmitter) {
          this._attachEmitter.emit(attachedRef);
        }
      }
    }
  }

  ngOnDestroy(): void {
    const key = this.key;
    if (key) {
      // @ts-ignore
      const storage = this._portal._portalDataStorage;
      const detachEvents = storage.get(key)!.detachEvents;


      const len = detachEvents.length;
      for (let i = len - 1; 0 <= i; i--) {
        detachEvents[i](true);
      }

      storage.delete(key);

    } else {
      this.portalData.detachEvents[0]?.(true);
    }

    this._hasInitialized = false;
  }
}
