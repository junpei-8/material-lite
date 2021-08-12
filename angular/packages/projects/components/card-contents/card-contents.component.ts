import { ChangeDetectionStrategy, Component, Directive, ElementRef, Input, ViewEncapsulation } from "@angular/core";
import { Falsy } from '@material-lite/angular-cdk/utils';


@Directive({
  selector: 'ml-card-content, [mlCardContent]',
  host: {'class': 'ml-card-content'}
})
export class MlCardContent {}


@Directive({
  selector: `ml-card-title, [mlCardTitle]`,
  host: {'class': 'ml-card-title'}
})
export class MlCardTitle {}


@Directive({
  selector: `ml-card-subtitle, [mlCardSubtitle]`,
  host: {'class': 'ml-card-subtitle'}
})
export class MlCardSubtitle {}


export type MlCardActionsAlign = 'start' | 'end' | Falsy;
@Directive({
  selector: 'ml-card-actions, [mlCardActions]',
  exportAs: 'mlCardActions',
  host: {
    'class': 'ml-card-actions',
    '[class]': '_alignClass'
  }
})
export class MlCardActions {
  @Input('align') set setAlign(align: MlCardActionsAlign) {
    // @ts-ignore: Assign the readonly variable
    this.align = align;
    this._alignClass = 'ml-card-actions-align-' + align;
  }
  readonly align: 'start' | 'end' = 'start';
  private _alignClass: string = 'ml-card-actions-align-start';
}


@Directive({
  selector: 'ml-card-footer, [mlCardFooter]',
  host: {'class': 'ml-card-footer'}
})
export class MlCardFooter {}


export type MlCardImageSize = 'sm' | 'md' | 'lg' | 'xl' | 'fw' | Falsy;
@Directive({
  selector: '[mlCardImage]',
  exportAs: 'mlCardImage',
  host: {
    'class': 'ml-card-image',
    '[class]': '_sizeClass',
  }
})
export class MlCardImage {
  @Input('mlCardImageSize') set setSize(size: MlCardImageSize) {
    // @ts-ignore: Assign the readonly variable
    this.size = size;

    this._sizeClass = size
      ? 'ml-card-' + size + '-image'
      : 'ml-card-fw-image';
  }
  readonly size: MlCardImageSize;
  private _sizeClass = 'ml-card-fw-image';

  @Input('src') set setSrc(src: string | Falsy) {
    // @ts-ignore: Assign the readonly variable
    this.src = src;

    const el = this._elementRef.nativeElement;
    this.isImageElement
      ? el.src = src || null!
      : el.style.backgroundImage = (src ? `url(${src})` : null!);
  }
  readonly src: string;
  readonly isImageElement: boolean;

  constructor(
    private _elementRef: ElementRef<HTMLImageElement>
  ) {
    const el = _elementRef.nativeElement;
    if (el instanceof HTMLImageElement) {
      this.isImageElement = true;

    } else {
      this.isImageElement = false;
      (el as HTMLElement).classList.add('ml-background-image');
    }
  }
}


@Directive({
  selector: '[mlCardAvatar]',
  host: {'class': 'ml-card-avatar'}
})
export class MlCardAvatar {}


@Component({
  selector: 'ml-card-header, [mlCardHeader]',
  templateUrl: 'card-header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'ml-card-header'}
})
export class MlCardHeader {}

